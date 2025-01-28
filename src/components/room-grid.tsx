import { db } from "~/server/db";

const RoomGrid = async() => {
  const rooms=await db.rooms.findMany({
    orderBy:{
      room_number:"asc"
    }
  });
    const getFloorRooms = (floor:number) => {
        return rooms.filter((room) => room.floor === floor);
    }
    return (
        <>
       <div className="flex md:w-[75%] lg:w-[55%] xl:w-[38%]">
       <div className="w-20 mr-4 border-2 border-gray-300">
        </div>
        <div className="w-full">
      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((floor) => (
        <div key={floor} className="mb-2">
          <div className="grid grid-cols-10 gap-2">
            {getFloorRooms(floor).map((room) => (
              <div
                key={room.id}
                className={`h-10 rounded ${
                  room.is_available ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-500'
                }`}
              >
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
      </div>

        </>
    )
}
export default RoomGrid