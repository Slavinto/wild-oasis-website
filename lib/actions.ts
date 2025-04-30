"use server";
import { auth, signIn, signOut } from "@/auth";
import { differenceInDays, isPast } from "date-fns";

import { isValidInput, toSupabaseTimestamp } from "./helpers";
import {
    createBooking,
    deleteBooking,
    getBooking,
    updateBooking,
    updateGuest,
} from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Tables } from "@/data/supabaseTypes";
import { BookingStatus, ProjectTables } from "@/data/enums";
import { ICabinReservationRange } from "@/components/cabinReservation/CabinReservationContext";
import { IBooking } from "@/data/interfaces";

export async function updateProfile(formData: FormData) {
    console.log({ formData });

    const session = await auth();
    const user = session?.user;
    const id = user?.id;

    if (!user || !id)
        throw new Error("You must be logged in to perform this action");

    const national_id = formData.get("nationalID")?.toString();
    const nationalityStr = (formData.get("nationality") as string).split("%");
    const [nationality, country_flag] = nationalityStr;
    if (!national_id) {
        throw new Error("Invalid nationalID value");
    }
    const formValues = [nationality, national_id, country_flag];

    if (isValidInput(formValues)) {
        await updateGuest(Number(id), {
            national_id,
            nationality,
            country_flag,
        });

        revalidatePath("/account/profile");
    } else {
        throw new Error("Invalid form input");
    }
}

export async function signInUser() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutUser() {
    await signOut({ redirectTo: "/" });
}

export async function deleteReservation(formData: FormData | number) {
    const id =
        typeof formData === "number"
            ? formData
            : Number(formData.get("bookingId"));
    const session = await auth();
    // check that reservation isn't started or haven't passed
    const booking = await getBooking(id);
    console.log(session?.user?.id, booking.guest_id);
    if (
        Number(session?.user?.id) === Number(booking.guest_id) &&
        booking.start_date &&
        !isPast(new Date(booking.start_date))
    ) {
        await deleteBooking(id);
        revalidatePath("/account/reservations");
    } else {
        throw new Error(`Failed to delete booking ${id}. Action not allowed`);
    }
}

export async function updateReservation(formData: FormData) {
    const session = await auth();

    const guestIdFromSession = Number(session?.user?.id);
    const guestIdFromBooking = Number(formData.get("guest_id"));

    const bookingId = Number(formData.get("booking_id"));
    const numGuests = Number(formData.get("numGuests"));
    let observations = formData.get("observations")?.toString() || "";
    if (observations.length > 300) {
        observations = observations.slice(0, 299);
    }

    const mainErrorString = "Failed to update reservation. ";

    console.log({ guestIdFromBooking, guestIdFromSession });

    if (!guestIdFromSession) {
        throw new Error(mainErrorString + "Invalid user");
    }
    if (guestIdFromBooking !== guestIdFromSession) {
        throw new Error(
            mainErrorString +
                "You don't have permission to update this reservation"
        );
    }
    const updatedReservation = await updateBooking(bookingId, {
        number_of_guests: numGuests,
        observations,
    });
    if (updatedReservation) {
        revalidatePath("/account/reservations");
        redirect("/account/reservations");
    } else {
        throw new Error(mainErrorString + "Check database connection");
    }
}

export async function createReservation(
    cabin: Tables<ProjectTables.Cabins>,
    formData: FormData,
    range?: ICabinReservationRange
) {
    const mainErrorString = "Failed to create reservation. ";

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error(mainErrorString + "User not logged in");
    }

    const guest_id = Number(session.user.id);

    const number_of_guests = Number(formData.get("numGuests"));
    const observations =
        formData.get("observations")?.toString().slice(0, 299) || "";

    if (!range || !range.to || !range.from) {
        throw new Error(mainErrorString + "Range not defined");
    }
    if (!number_of_guests) {
        throw new Error(mainErrorString + "Number of guests not defined");
    }

    // TODO: extras_price count && has_breakfast

    const reservationObject: IBooking = {
        start_date: toSupabaseTimestamp(range.from),
        end_date: toSupabaseTimestamp(range.to),
        number_of_nights: Math.abs(
            differenceInDays(range?.from || 0, range?.to || 0)
        ),
        number_of_guests,
        cabin_price: cabin.regular_price!,
        extras_price: cabin.regular_price!,
        total_price: cabin.regular_price!,
        status: BookingStatus.Unconfirmed,
        has_breakfast: false,
        is_paid: false,
        observations,
        cabin_id: cabin.id,
        guest_id,
    };

    await createBooking(reservationObject);
    redirect("/account/reservations");
}
