

import { db } from "~/server/db";
const load=async()=>{
try{
    await db.rooms.createMany({
        data: [
            {
                room_number: 101,
                floor: 1,
                is_available: true,
            },
            {
                room_number: 102,
                floor: 1,
                is_available: true,
            }, {
                room_number: 103,
                floor: 1,
                is_available: true,
            }, {
                room_number: 104,
                floor: 1,
                is_available: true,
            }, {
                room_number: 105,
                floor: 1,
                is_available: true,
            }, {
                room_number: 106,
                floor: 1,
                is_available: true,
            }, {
                room_number: 107,
                floor: 1,
                is_available: true,
            }, {
                room_number: 108,
                floor: 1,
                is_available: true,
            }, {
                room_number: 109,
                floor: 1,
                is_available: true,
            }, {
                room_number: 110,
                floor: 1,
                is_available: true,
            },
            {
                room_number: 201,
                floor: 2,
                is_available: true,
            }, {
                room_number: 202,
                floor: 2,
                is_available: true,
            }, {
                room_number: 203,
                floor: 2,
                is_available: true,
            }, {
                room_number: 204,
                floor: 2,
                is_available: true,
            }, {
                room_number: 205,
                floor: 2,
                is_available: true,
            }, {
                room_number: 206,
                floor: 2,
                is_available: true,
            }, {
                room_number: 207,
                floor: 2,
                is_available: true,
            }, {
                room_number: 208,
                floor: 2,
                is_available: true,
            }, {
                room_number: 209,
                floor: 2,
                is_available: true,
            }, {
                room_number: 210,
                floor: 2,
                is_available: true,
            }, {
                room_number: 301,
                floor: 3,
                is_available: true,
            }, {
                room_number: 302,
                floor: 3,
                is_available: true,
            }, {
                room_number: 303,
                floor: 3,
                is_available: true,
            }, {
                room_number: 304,
                floor: 3,
                is_available: true,
            }, {
                room_number: 305,
                floor: 3,
                is_available: true,
            }, {
                room_number: 306,
                floor: 3,
                is_available: true,
            }, {
                room_number: 307,
                floor: 3,
                is_available: true,
            }, {
                room_number: 308,
                floor: 3,
                is_available: true,
            }, {
                room_number: 309,
                floor: 3,
                is_available: true,
            }, {
                room_number: 310,
                floor: 3,
                is_available: true,
            }, {
                room_number: 401,
                floor: 4,
                is_available: true,
            }, {
                room_number: 402,
                floor: 4,
                is_available: true,
            },
            {
                room_number: 403,
                floor: 4,
                is_available: true,
            }, {
                room_number: 404,
                floor: 4,
                is_available: true,
            }, {
                room_number: 405,
                floor: 4,
                is_available: true,
            }, {
                room_number: 406,
                floor: 4,
                is_available: true,
            }, {
                room_number: 407,
                floor: 4,
                is_available: true,
            }, {
                room_number: 408,
                floor: 4,
                is_available: true,
            }, {
                room_number: 409,
                floor: 4,
                is_available: true,
            }, {
                room_number: 410,
                floor: 4,
                is_available: true,
            },
            {
                room_number: 501,
                floor: 5,
                is_available: true,
            },
            {
                room_number: 502,
                floor: 5,
                is_available: true,
            }, {
                room_number: 503,
                floor: 5,
                is_available: true,
            }, {
                room_number: 504,
                floor: 5,
                is_available: true,
            }, {
                room_number: 505,
                floor: 5,
                is_available: true,
            }, {
                room_number: 506,
                floor: 5,
                is_available: true,
            }, {
                room_number: 507,
                floor: 5,
                is_available: true,
            }, {
                room_number: 508,
                floor: 5,
                is_available: true,
            }, {
                room_number: 509,
                floor: 5,
                is_available: true,
            }, {
                room_number: 510,
                floor: 5,
                is_available: true,
            },
            {
                room_number: 601,
                floor: 6,
                is_available: true,
            },
            {
                room_number: 602,
                floor: 6,
                is_available: true,
            }, {
                room_number: 603,
                floor: 6,
                is_available: true,
            }, {
                room_number: 604,
                floor: 6,
                is_available: true,
            }, {
                room_number: 605,
                floor: 6,
                is_available: true,
            }, {
                room_number: 606,
                floor: 6,
                is_available: true,
            }, {
                room_number: 607,
                floor: 6,
                is_available: true,
            }, {
                room_number: 608,
                floor: 6,
                is_available: true,
            }, {
                room_number: 609,
                floor: 6,
                is_available: true,
            }, {
                room_number: 610,
                floor: 6,
                is_available: true,
            },
            {
                room_number: 701,
                floor: 7,
                is_available: true,
            },
            {
                room_number: 702,
                floor: 7,
                is_available: true,
            }, {
                room_number: 703,
                floor: 7,
                is_available: true,
            }, {
                room_number: 704,
                floor: 7,
                is_available: true,
            }, {
                room_number: 705,
                floor: 7,
                is_available: true,
            }, {
                room_number: 706,
                floor: 7,
                is_available: true,
            }, {
                room_number: 707,
                floor: 7,
                is_available: true,
            }, {
                room_number: 708,
                floor: 7,
                is_available: true,
            }, {
                room_number: 709,
                floor: 7,
                is_available: true,
            }, {
                room_number: 710,
                floor: 7,
                is_available: true,
            },
            {
                room_number: 801,
                floor: 8,
                is_available: true,
            },
            {
                room_number: 802,
                floor: 8,
                is_available: true,
            }, {
                room_number: 803,
                floor: 8,
                is_available: true,
            }, {
                room_number: 804,
                floor: 8,
                is_available: true,
            }, {
                room_number: 805,
                floor: 8,
                is_available: true,
            }, {
                room_number: 806,
                floor: 8,
                is_available: true,
            }, {
                room_number: 807,
                floor: 8,
                is_available: true,
            }, {
                room_number: 808,
                floor: 8,
                is_available: true,
            }, {
                room_number: 809,
                floor: 8,
                is_available: true,
            },
            {
                room_number: 810,
                floor: 8,
                is_available: true,
            },
            {
                room_number: 901,
                floor: 9,
                is_available: true,
            },
            {
                room_number: 902,
                floor: 9,
                is_available: true,
            }, {
                room_number: 903,
                floor: 9,
                is_available: true,
            }, {
                room_number: 904,
                floor: 9,
                is_available: true,
            }, {
                room_number: 905,
                floor: 9,
                is_available: true,
            }, {
                room_number: 906,
                floor: 9,
                is_available: true,
            }, {
                room_number: 907,
                floor: 9,
                is_available: true,
            }, {
                room_number: 908,
                floor: 9,
                is_available: true,
            }, {
                room_number: 909,
                floor: 9,
                is_available: true,
            }, {
                room_number: 910,
                floor: 9,
                is_available: true,
            },
            {
                room_number: 1001,
                floor: 10,
                is_available: true,
            },
            {
                room_number: 1002,
                floor: 10,
                is_available: true,
            }, {
                room_number: 1003,
                floor: 10,
                is_available: true,
            }, {
                room_number: 1004,
                floor: 10,
                is_available: true,
            }, {
                room_number: 1005,
                floor: 10,
                is_available: true,
            }, {
                room_number: 1006,
                floor: 10,
                is_available: true,
            }, {
                room_number: 1007,
                floor: 10,
                is_available: true,
            },
        ]
    })
    console.log("Rooms are created");
}
catch(err)
{
    console.log("error during seeding data is", err);
}
finally{
    await db.$disconnect()
}
    
}
load();

