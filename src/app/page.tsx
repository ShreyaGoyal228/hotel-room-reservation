"use server";
import RoomBookingForm from "~/components/room-booking-form";
import RoomGrid from "../components/room-grid";

export default async function Home() {
  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold">Hotel Room Reservation</h1>
          <RoomBookingForm />
        </div>
        <div className="flex justify-center">
          <RoomGrid />
        </div>
      </div>
    </>
  );
}
