'use server'
import { db } from "~/server/db";
import RoomGrid from "./_components/room-grid";

export default async function Home() {
  const data=await db.rooms.findMany();
  console.log("rooms are",data)
  return (
  <>
  <div className="flex flex-col items-center gap-10">
  <h1 className="text-3xl font-bold ">Hotel Room Reservation</h1>
  <div className="">
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="number"
          className="border rounded px-2 py-1"
          placeholder="Number of Rooms"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Book</button>
        <button className="bg-gray-300 px-4 py-2 rounded">Reset</button>
        <button className="bg-gray-300 px-4 py-2 rounded">Random</button>
      </div>
      <RoomGrid />
    </div>
  </div>
  </>
  );
}
