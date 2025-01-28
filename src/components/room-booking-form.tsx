"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookRooms,
  randomOccupancy,
  resetRooms,
} from "~/actions/room-booking-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  noOfRooms: z.coerce
    .number()
    .int({ message: "Rooms can be only of type integer." })
    .min(1, { message: "No of rooms is required." })
    .max(5, { message: "You can only book 5 rooms at a time." }),
});
const RoomBookingForm = () => {
  const router = useRouter();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [randomLoad, randomSetLoad] = useState<boolean>(false);
  const [resetLoad, setResetLoad] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noOfRooms: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await bookRooms(values.noOfRooms)
      .then((resp) => {
        if (resp.message) {
          toast.success(resp.message);
          router.refresh();
        }
        if (resp.error) {
          toast.error(resp.error);
          console.log("error is", resp.error);
        }
      })
      .catch((err) => {
        toast.error(err);
        console.log("error in catch is", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleReset() {
    setResetLoad(true);
    await resetRooms()
      .then((resp) => {
        if (resp.message) {
          toast.success(resp.message);
          router.refresh();
        }

        if (resp.error) toast.error(resp.error);
      })

      .catch((err) => {
        console.log("error in resetting is", err);
        toast.error(err);
      })
      .finally(() => {
        setResetLoad(false);
      });
  }

  async function handleRandomOccupancy() {
    randomSetLoad(true);
    await randomOccupancy()
      .then((resp) => {
        if (resp.message) {
          toast.success(resp.message);
          router.refresh();
        }
        if (resp.error) {
          toast.error(resp.error);
        }
      })
      .catch((err) => {
        console.log("error in catch block during random occupancy is", err);
        toast.error(err);
      })
      .finally(() => {
        randomSetLoad(false);
      });
  }
  return (
    <>
      <div className="mb-4 flex items-start space-x-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start space-x-4"
          >
            <FormField
              control={form.control}
              name="noOfRooms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="py-2"
                      placeholder="No of rooms"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="rounded bg-blue-500 text-white hover:bg-blue-600"
              disabled={loading}
            >
              Book
            </Button>
          </form>
        </Form>
        <Button variant="outline" className="rounded" onClick={handleReset} disabled={resetLoad}>
          Reset
        </Button>
        <Button
          variant="outline"
          className="rounded"
          disabled={randomLoad}
          onClick={handleRandomOccupancy}
        >
          Random
        </Button>
      </div>
    </>
  );
};

export default RoomBookingForm;
