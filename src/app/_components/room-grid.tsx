const rooms = [
    {
        id: 1,
        isAvailable: true,
        roomNumber: 101,
        floor:1,
    },
    {
        id: 2,
        isAvailable: true,
        roomNumber: 102,
        floor:2
    },
    {
        id: 3,
        isAvailable: false,
        roomNumber: 103,
        floor:2
    }
]
const RoomGrid = () => {
    const getFloorRooms = (floor:number) => {
        return rooms.filter((room) => room.floor === floor);
    }
    return (
        <>
           <div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((floor) => (
        <div key={floor} className="mb-4">
          <h2 className="text-lg font-bold">Floor {floor}</h2>
          <div className="grid grid-cols-10 gap-2">
            {getFloorRooms(floor).map((room) => (
              <div
                key={room.id}
                className={`h-10 rounded ${
                  room.isAvailable ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-200'
                }`}
              >
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
        </>
    )
}
export default RoomGrid