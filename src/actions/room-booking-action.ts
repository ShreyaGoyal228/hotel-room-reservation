'use server'

import { db } from "~/server/db"
type Room = {
    id: string; room_number: number; floor: number; is_available: boolean;
}

type BookingResult = {
    bookedRooms: Room[];
    totalTravelTime: number;
}

export const bookRooms = async (noOfRooms: number) => {
     // Calculate travel time between adjacent rooms in sequence
     const calculateTravelTime = (rooms: Room[]): number => {
        if (rooms.length <= 1) return 0;
        
        const firstRoom = rooms[0]!;
        const lastRoom = rooms[rooms.length - 1]!;
        
        // Vertical travel: 2 minutes per floor
        const verticalTime = Math.abs(firstRoom.floor - lastRoom.floor) * 2;
        
        // Horizontal travel: 1 minute per room
        const horizontalTime = Math.abs(
            (firstRoom.room_number % 100) - (lastRoom.room_number % 100)
        );
        
        return verticalTime + horizontalTime;
    };

  const findBestRooms = (availableRooms: Room[], noOfRooms: number): BookingResult => {
        let bestRooms: Room[] = [];
        let minTotalTime = Infinity;

        // First try to find rooms on the same floor (Priority 1)
        for (let floor = 1; floor <= 10; floor++) {
            const floorRooms = availableRooms
                .filter(room => room.floor === floor)
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

                if (bestRooms.length > 0) break; // Found rooms on same floor
            }
        }

        // If no rooms available on same floor, try across floors (Priority 2)
        if (bestRooms.length === 0) {
            // Sort rooms by floor and room number
            const sortedRooms = [...availableRooms].sort((a, b) => {
                if (a.floor !== b.floor) return a.floor - b.floor;
                return a.room_number - b.room_number;
            });

            // Try each possible combination
            for (let i = 0; i <= sortedRooms.length - noOfRooms; i++) {
                const combo = sortedRooms.slice(i, i + noOfRooms);
                const totalTime = calculateTravelTime(combo);
                
                if (totalTime < minTotalTime) {
                    minTotalTime = totalTime;
                    bestRooms = combo;
                }
            }
        }

        return {
            bookedRooms: bestRooms,
            totalTravelTime: minTotalTime
        };
    };

    try {
        let hotelRooms = await db.rooms.findMany({
          orderBy:{
            room_number:"asc"
          }
        });
        console.log("hotel rooms are", hotelRooms)
        const availableRooms = hotelRooms.filter(room => room.is_available);
        if (availableRooms.length < noOfRooms) {
            return {
                error: "Not enough rooms available"
            }
        }

        const { bookedRooms, totalTravelTime } = findBestRooms(availableRooms, noOfRooms)

        //update status form rooms
        try {
            await db.$transaction(
                bookedRooms.map(room =>
                    db.rooms.update({
                        where: {
                            id: room.id,
                            room_number: room.room_number
                        },
                        data: { is_available: false }
                    })
                )
            );

            console.log("status updated successfully");

        }
        catch (err) {
            console.log("error in updating the status for booked rooms")
        }

        return {
            success: true,
            message: `Successfully booked rooms: ${bookedRooms.map((room)=>room.room_number).join(',')}. Total travel time: ${totalTravelTime} minutes`

        }
    }
    catch (err) {
        return {
            success: false,
            message: 'Failed to book rooms.'
        };

    }
}


export const resetRooms = async () => {
try{
  const bookedRooms=await db.rooms.findMany({
    where:{
        is_available:false 
    }
  })

  await db.$transaction(
    bookedRooms.map(room => 
        db.rooms.update({
            where:{
                id:room.id,
            },
            data:{
                is_available:true,
            }
        })
    )
  )

  return {
    message:"Rooms reset successfully."
  }
}
catch(err)
{ console.log("error in resetting is",err);
  return{
    error:"Error in resetting the rooms."
  }
}

}

export const randomOccupancy = async () => {
    try {
      // all hotel rooms
      let hotelRooms = await db.rooms.findMany({
        orderBy: {
          room_number: "asc",
        },
      });
  
      // Separate already booked rooms 
      const bookedRooms = hotelRooms.filter((room) => !room.is_available);
      const availableRooms = hotelRooms.filter((room) => room.is_available);
  
      // Determine random occupancy for available rooms (40% chance to be occupied)
      const updatedRooms = availableRooms.map((room) => ({
        id: room.id,
        is_available: Math.random() > 0.4 ? true : false, // 60% available, 40% occupied
      }));
  
      const finalRooms = [...bookedRooms, ...updatedRooms];
  
      // Update only the rooms that changed
      await db.$transaction(
        finalRooms.map((room) =>
          db.rooms.update({
            where: { id: room.id },
            data: { is_available: room.is_available },
          }),
        ),
      );
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
  
  
  