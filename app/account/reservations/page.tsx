import { auth } from "@/auth";
import { Heading } from "@/components/server";
import { ReservationList } from "@/components/client";
import { Headings } from "@/data/enums";
import { getBookings } from "@/lib/data-service";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
    title: " | Reservations",
};

const ReservationsPage = async () => {
    const session = await auth();

    if (!session || !session?.user || !session.user.id) {
        redirect("/sign-in");
    }
    const { id } = session.user;
    const bookings = await getBookings(Number(id));

    return (
        <div>
            <Heading as={Headings.H3} classNames='text-accent-400 mb-7'>
                Your reservations
            </Heading>

            {bookings.length === 0 ? (
                <p className='text-lg'>
                    You have no reservations yet. Check out our{" "}
                    <Link className='underline text-accent-500' href='/cabins'>
                        luxury cabins &rarr;
                    </Link>
                </p>
            ) : (
                <ReservationList bookings={bookings} />
            )}
        </div>
    );
};

export default ReservationsPage;
