import { Tables } from "./supabaseTypes";

export type TCabin = Pick<
    Tables<"cabins">,
    "id" | "name" | "max_capacity" | "regular_price" | "discount" | "image_url"
>;

export type TCabinPrice = Pick<Tables<"cabins">, "regular_price" | "discount">;

export type TBooking = Pick<
    Tables<"bookings">,
    | "id"
    | "guest_id"
    | "start_date"
    | "end_date"
    | "number_of_nights"
    | "total_price"
    | "number_of_guests"
    | "status"
    | "created_at"
>;

export type TBookingWithCabin = TBooking & {
    cabins: Pick<Tables<"cabins">, "name" | "image_url">;
};
