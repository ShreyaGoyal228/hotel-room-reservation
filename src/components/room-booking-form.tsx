'use client'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { bookRooms, resetRooms } from "~/actions/room-booking-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

const formSchema = z.object({
    noOfRooms: z.coerce.number().int({ message: "Rooms can be only of type integer." }).min(1, { message: "No of rooms is required." }).max(5, { message: "You can only book 5 rooms at a time." })
})
const RoomBookingForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            noOfRooms: 0,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await bookRooms(values.noOfRooms)
            .then((resp) => {
                if (resp.message) {
                    toast.success(resp.message)
                    router.refresh();
                }
                if (resp.error) {
                    toast.error(resp.error)
                    console.log("error is", resp.error)
                }
            })
            .catch((err) => {
                toast.error(err);
                console.log("error in catch is", err);
            })
    }

    async function handleReset() {
        await resetRooms()
            .then((resp) => {
                if (resp.message)
                {
                    toast.success(resp.message)
                    router.refresh();
                }

                if (resp.error)
                    toast.error(resp.error)
            })

            .catch((err) => {
                console.log("error in resetting is", err);
                toast.error(err);
            })
    }
    return (
        <>
<div className="flex items-start space-x-4 mb-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start space-x-4">
                    <FormField
                        control={form.control}
                        name="noOfRooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="py-2" placeholder="No of rooms" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded">Book</Button>
                </form>
            </Form>
            <Button variant="outline" className=" rounded" onClick={handleReset}>Reset</Button>
        <Button variant="outline" className=" rounded">Random</Button>
        </div>
        </>
    )
}

export default RoomBookingForm