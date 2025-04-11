import { eachDayOfInterval } from "date-fns";
import { supabaseServer } from "./supabase/server";
import { Tables } from "@/data/supabaseTypes";
import { TCabin, TCabinPrice } from "@/data/types";
import { notFound } from "next/navigation";

/////////////
// GET

export async function getCabin(id: number) {
    const { data, error } = await supabaseServer
        .from("cabins")
        .select("*")
        .eq("id", id)
        .single();

    // For testing
    // await new Promise((res) => setTimeout(res, 1000));

    if (error) {
        console.error(error);
        notFound();
    }

    return data;
}

export async function getCabinPrice(id: number): Promise<TCabinPrice> {
    const { data, error } = await supabaseServer
        .from("cabins")
        .select("regular_price, discount")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
}

export const getNumCabins = async function (): Promise<number> {
    const { count, error } = await supabaseServer
        .from("cabins")
        .select(undefined, { count: "exact" });

    if (error) {
        console.error(error.message);
        throw error;
    }

    return count ?? 0;
};

export const getCabins = async function (): Promise<TCabin[]> {
    const { data, error } = await supabaseServer
        .from("cabins")
        .select("id, name, max_capacity, regular_price, discount, image_url")
        .order("name");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
    const { data, error } = await supabaseServer
        .from("guests")
        .select("*")
        .eq("email", email)
        .single();

    if (error) {
        console.error(error.message);
        throw new Error("Failed to load guest data");
    }
    // No error here! We handle the possibility of no guest in the sign in callback
    return data;
}

export async function getBooking(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, count } = await supabaseServer
        .from("bookings")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not get loaded");
    }

    return data;
}

export async function getBookings(guest_id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, count } = await supabaseServer
        .from("bookings")
        // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
        .select(
            "id, created_at, start_date, end_date, number_of_nights, number_of_guests, total_price, guest_id, cabin_id, cabins(name, image_url)"
        )
        .eq("guest_id", guest_id)
        .order("start_date");

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

export async function getBookedDatesByCabinId(cabin_id: number) {
    let today: Date | string = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today = today.toISOString();

    // Getting all bookings
    const { data, error } = await supabaseServer
        .from("bookings")
        .select("*")
        .eq("cabin_id", cabin_id)
        .or(`start_date.gte.${today},status.eq.checked-in`);

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    // Converting to actual dates to be displayed in the date picker
    const bookedDates = data
        .map((booking) => {
            return eachDayOfInterval({
                start: new Date(booking.start_date),
                end: new Date(booking.end_date),
            });
        })
        .flat();

    return bookedDates;
}

export async function getSettings() {
    const { data, error } = await supabaseServer
        .from("settings")
        .select("*")
        .single();

    if (error) {
        console.error(error);
        throw new Error("Settings could not be loaded");
    }

    return data;
}

export async function getCountries() {
    try {
        const res = await fetch(
            "https://restcountries.com/v2/all?fields=name,flag"
        );
        const countries = await res.json();
        return countries;
    } catch {
        throw new Error("Could not fetch countries");
    }
}

/////////////
// CREATE

export async function createGuest(newGuest: Tables<"guests">) {
    const { data, error } = await supabaseServer
        .from("guests")
        .insert([newGuest]);

    if (error) {
        console.error(error);
        throw new Error("Guest could not be created");
    }

    return data;
}

export async function createBooking(newBooking: Tables<"bookings">) {
    const { data, error } = await supabaseServer
        .from("bookings")
        .insert([newBooking])
        // So that the newly created object gets returned!
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be created");
    }

    return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(
    id: number,
    updatedFields: Partial<Tables<"guests">>
) {
    const { data, error } = await supabaseServer
        .from("guests")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Guest could not be updated");
    }
    return data;
}

export async function updateBooking(
    id: number,
    updatedFields: Partial<Tables<"bookings">>
) {
    const { data, error } = await supabaseServer
        .from("bookings")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }
    return data;
}

/////////////
// DELETE

export async function deleteBooking(id: number) {
    const { data, error } = await supabaseServer
        .from("bookings")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }
    return data;
}
