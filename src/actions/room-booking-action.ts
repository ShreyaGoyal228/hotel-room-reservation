"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
export type Room = {
  id: string;
  room_number: number;
  floor: number;
  is_available: boolean;
};

type BookingResult = {
  bookedRooms: Room[];
  totalTravelTime: number;
};

export const bookRooms = async (noOfRooms: number) => {
  const getRoomDetails = (roomNumber: number) => {
    const floor = Math.floor(roomNumber / 100);
    const roomOnFloor = roomNumber % 100;
    return { floor, roomOnFloor };
  };

  // Calculate travel time between two rooms
  const calculateTimeBetweenRooms = (room1: number, room2: number): number => {
    const r1 = getRoomDetails(room1);
    const r2 = getRoomDetails(room2);
    
    // Vertical travel: 2 minutes per floor
    const verticalTime = Math.abs(r1.floor - r2.floor) * 2;
    
    // Horizontal travel: 1 minute per room difference
    const horizontalTime = Math.abs(r1.roomOnFloor - r2.roomOnFloor);
    
    return verticalTime + horizontalTime;
  };

  // Calculate maximum travel time between any two rooms in a set
  const calculateTravelTime = (rooms: Room[]): number => {
    if (rooms.length <= 1) return 0;
    
    let maxTime = 0;
    for (let i = 0; i < rooms.length; i++) {
      for (let j = i + 1; j < rooms.length; j++) {
        const time = calculateTimeBetweenRooms(
          rooms[i]!.room_number,
          rooms[j]!.room_number
        );
        maxTime = Math.max(maxTime, time);
      }
    }
    return maxTime;
  };

  const findBestRooms = (
    availableRooms: Room[],
    noOfRooms: number,
  ): BookingResult => {
    let bestRooms: Room[] = [];
    let minTotalTime = Infinity;

    // First try to find rooms on the same floor
    for (let floor = 1; floor <= 10; floor++) {
      const floorRooms = availableRooms
        .filter((room) => Math.floor(room.room_number / 100) === floor)
        .sort((a, b) => a.room_number - b.room_number);

      if (floorRooms.length >= noOfRooms) {
        // Try each possible consecutive combination on this floor
        for (let i = 0; i <= floorRooms.length - noOfRooms; i++) {
          const combo = floorRooms.slice(i, i + noOfRooms);
          const totalTime = calculateTravelTime(combo);

          if (totalTime < minTotalTime) {
            minTotalTime = totalTime;
            bestRooms = combo;
          }
        }
      }
    }

    // If no suitable rooms found on the same floor, try combinations across floors
    if (bestRooms.length === 0) {
      // Sort rooms by floor and room number
      const sortedRooms = [...availableRooms].sort((a, b) => a.room_number - b.room_number);
      
      // Try all possible combinations of the required number of rooms
      for (let i = 0; i <= sortedRooms.length - noOfRooms; i++) {
        for (let j = i; j <= sortedRooms.length - noOfRooms; j++) {
          const combo = [];
          for (let k = 0; k < noOfRooms; k++) {
            if (j + k < sortedRooms.length) {
              combo.push(sortedRooms[j + k]!);
            }
          }
          
          if (combo.length === noOfRooms) {
            const totalTime = calculateTravelTime(combo);
            if (totalTime < minTotalTime) {
              minTotalTime = totalTime;
              bestRooms = combo;
            }
          }
        }
      }
    }

    return {
      bookedRooms: bestRooms,
      totalTravelTime: minTotalTime,
    };
  };

  try {
    let hotelRooms = await db.rooms.findMany({
      orderBy: {
        room_number: "asc",
      },
    });
    console.log("hotel rooms are", hotelRooms);
    const availableRooms = hotelRooms.filter((room) => room.is_available);
    if (availableRooms.length < noOfRooms) {
      return {
        error: "Not enough rooms available",
      };
    }

    const { bookedRooms, totalTravelTime } = findBestRooms(
      availableRooms,
      noOfRooms,
    );

    //update status form rooms
    try {
      await db.$transaction(
        bookedRooms.map((room) =>
          db.rooms.update({
            where: {
              id: room.id,
              room_number: room.room_number,
            },
            data: { is_available: false },
          }),
        ),
      );
      revalidatePath("/");
      console.log("status updated successfully");
    } catch (err) {
      console.log("error in updating the status for booked rooms");
    }

    return {
      success: true,
      message: `Successfully booked rooms: ${bookedRooms.map((room) => room.room_number).join(",")}. Total travel time: ${totalTravelTime} minutes`,
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to book rooms.",
    };
  }
  
};

export const resetRooms = async () => {
  try {
    const bookedRooms = await db.rooms.findMany({
      where: {
        is_available: false,
      },
    });

    await db.$transaction(
      bookedRooms.map((room) =>
        db.rooms.update({
          where: {
            id: room.id,
          },
          data: {
            is_available: true,
          },
        }),
      ),
    );
    revalidatePath("/");
    return {
      message: "Rooms reset successfully.",
    };
  } catch (err) {
    console.log("error in resetting is", err);
    return {
      error: "Error in resetting the rooms.",
    };
  }
};

export const randomOccupancy = async () => {
  try {
    // all hotel rooms
    let hotelRooms = await db.rooms.findMany({
      orderBy: {
        room_number: "asc",
      },
    });

    // Separate already booked rooms
    const bookedRooms = hotelRooms.filter((room) => !room.is_available) || [];
    const availableRooms = hotelRooms.filter((room) => room.is_available) || [];
    // Determine random occupancy for available rooms (40% chance to be occupied)
    const updatedRooms = availableRooms.map((room) => ({
      id: room.id,
      is_available: Math.random() > 0.4 ? true : false, // 60% available, 40% occupied
    }));

    const finalRooms = updatedRooms;
    console.log("final rooms are",finalRooms);

    // Update only the rooms that changed
    const BATCH_SIZE = 10;

    for (let i = 0; i < finalRooms.length; i += BATCH_SIZE) {
      const batch = finalRooms.slice(i, i + BATCH_SIZE);

      await db.$transaction(
        batch.map((room) =>
          db.rooms.update({
            where: { id: room.id },
            data: { is_available: room.is_available },
          }),
        ),
      );
    }
    revalidatePath("/");
    return {
      message: "Random occupancy applied while keeping booked rooms unchanged.",
    };
  } catch (err) {
    console.error("Error in applying random occupancy:", err);
    return {
      error: "Failed to apply random occupancy.",
    };
  }
};
