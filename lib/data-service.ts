import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";

import { supabaseServer } from "./supabase/server";
import { Tables } from "@/data/supabaseTypes";
import { TBookingWithCabin, TCabin, TCabinPrice } from "@/data/types";
import { AuthGuest, CabinsFilter } from "@/data/interfaces";
import { BookingStatus, CabinCapacity, ProjectTables } from "@/data/enums";
import { toSupabaseTimestamp } from "./helpers";

/////////////
// GET

export async function getCabin(
    id: number
): Promise<Tables<ProjectTables.Cabins>> {
    const { data, error } = await supabaseServer
        .from(ProjectTables.Cabins)
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        notFound();
    }

    return data;
}

export async function getCabinPrice(id: number): Promise<TCabinPrice> {
    const { data, error } = await supabaseServer
        .from(ProjectTables.Cabins)
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
        .from(ProjectTables.Cabins)
        .select(undefined, { count: "exact" });

    if (error) {
        console.error(error.message);
        throw error;
    }

    return count ?? 0;
};

export const getFilteredCabins = async function (
    filter: CabinsFilter
): Promise<TCabin[]> {
    const { capacity } = filter;
    let query = supabaseServer.from(ProjectTables.Cabins).select("*");

    query =
        capacity === CabinCapacity.Small
            ? query.lte("max_capacity", 2)
            : capacity === CabinCapacity.Medium
            ? query.gte("max_capacity", 3).lte("max_capacity", 6)
            : capacity === CabinCapacity.Large
            ? query.gte("max_capacity", 7)
            : query;

    const { data, error } = await query;

    if (error) {
        console.error(error.message);
        throw error;
    }

    return data;
};

export const getCabins = async function (): Promise<TCabin[]> {
    const { data, error } = await supabaseServer
        .from(ProjectTables.Cabins)
        .select("id, name, max_capacity, regular_price, discount, image_url")
        .order("name");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(
    email: string
): Promise<Tables<ProjectTables.Guests> | null> {
    const { data, error } = await supabaseServer
        .from(ProjectTables.Guests)
        .select("*")
        .eq("email", email)
        .single();

    if (error) {
        console.error(error.message);
        return null;
    }
    // No error here! We handle the possibility of no guest in the sign in callback
    return data;
}

export async function getBooking(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, count } = await supabaseServer
        .from(ProjectTables.Bookings)
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
        .from(ProjectTables.Bookings)
        // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
        .select(
            "id, created_at, start_date, end_date, number_of_nights, number_of_guests, status, total_price, guest_id, cabin_id, cabins(name, image_url)"
        )
        .eq("guest_id", guest_id)
        .order("start_date");

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }
    // had to do this because auto-exported supabase types expect
    // cabins to be an array but supabase itself returns an object
    // because there's only one returned cabin object here
    return data as unknown as TBookingWithCabin[];
}

export async function getBookedDatesByCabinId(cabin_id: number) {
    const today = toSupabaseTimestamp(new Date());

    // selecting all bookings for this cabin_id
    const query = supabaseServer
        .from(ProjectTables.Bookings)
        .select("*")
        .eq("cabin_id", cabin_id)
        // now selecting those bookings from future including today or with active checked-in status
        .or(`start_date.gte.${today},status.eq.${BookingStatus.CheckedIn}`);

    const { data, error } = await query;

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

export async function getSettings(): Promise<Tables<ProjectTables.Settings>> {
    const { data, error } = await supabaseServer
        .from(ProjectTables.Settings)
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

export async function createGuest(newGuest: AuthGuest) {
    const { data, error } = await supabaseServer
        .from(ProjectTables.Guests)
        .insert({ full_name: newGuest.name, email: newGuest.email })
        .select();

    if (error) {
        console.error(error);
        throw new Error("Guest could not be created");
    }

    return data;
}

export async function createBooking(
    newBooking: Tables<ProjectTables.Bookings>
) {
    const { data, error } = await supabaseServer
        .from(ProjectTables.Bookings)
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
    updatedFields: Partial<Tables<ProjectTables.Guests>>
) {
    const { data, error } = await supabaseServer
        .from(ProjectTables.Guests)
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
    updatedFields: Partial<Tables<ProjectTables.Bookings>>
) {
    const { data, error } = await supabaseServer
        .from(ProjectTables.Bookings)
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
        .from(ProjectTables.Bookings)
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }
    return data;
}
