import { Heading } from "@/components/server";
import ModalButton from "@/components/client/modal/ModalButton";
import { Headings } from "@/data/enums";
import { updateReservation } from "@/lib/actions";
import { getBookingWithCabin } from "@/lib/data-service";

export const metadata = {
    title: " | Edit reservation",
};

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const reservationId = Number(id);

    const booking = await getBookingWithCabin(reservationId);
    if (!booking) {
        return null;
    }

    const maxCapacity = booking.cabins.max_capacity || 0;

    return (
        <div className='max-w-[60rem]'>
            <Heading
                as={Headings.H3}
                classNames='font-semibold text-2xl text-accent-400 mb-7'
            >
                Edit Reservation #{reservationId}
            </Heading>

            <form
                className='bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'
                action={updateReservation}
            >
                <div className='space-y-2'>
                    <label htmlFor='numGuests'>How many guests?</label>
                    <select
                        defaultValue={Number(booking.number_of_guests)}
                        name='numGuests'
                        id='numGuests'
                        className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                        required
                    >
                        <option value='' key=''>
                            Select number of guests...
                        </option>
                        {Array.from(
                            { length: maxCapacity },
                            (_, i) => i + 1
                        ).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='space-y-2'>
                    <label htmlFor='observations'>
                        Anything we should know about your stay? (300 characters
                        max)
                    </label>
                    <textarea
                        maxLength={300}
                        defaultValue={booking.observations?.toString()}
                        name='observations'
                        className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                    />
                </div>

                <input
                    type='hidden'
                    value={booking.guest_id || ""}
                    name='guest_id'
                />
                <input
                    type='hidden'
                    value={booking.id || ""}
                    name='booking_id'
                />
                <div className='flex justify-end items-center gap-6'>
                    <ModalButton
                        type='submit'
                        buttonText='Update&nbsp;reservation'
                        classNames='bg-accent-500 !text-lg text-primary-800 font-semibold hover:bg-accent-600 px-8 max-w-[16rem]'
                    />
                </div>
            </form>
        </div>
    );
}
