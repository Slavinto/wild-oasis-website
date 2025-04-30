import { ModalWindows, ProjectTables } from "./enums";
import { ModalConfig } from "./interfaces";
import { Tables } from "./supabaseTypes";

export type TCabin = Pick<
    Tables<ProjectTables.Cabins>,
    "id" | "name" | "max_capacity" | "regular_price" | "discount" | "image_url"
>;

export type TCabinPrice = Pick<
    Tables<ProjectTables.Cabins>,
    "regular_price" | "discount"
>;

export type TBooking = Pick<
    Tables<ProjectTables.Bookings>,
    | "id"
    | "guest_id"
    | "start_date"
    | "end_date"
    | "number_of_nights"
    | "observations"
    | "total_price"
    | "number_of_guests"
    | "status"
    | "created_at"
>;

export type TCabinBooking = Pick<
    Tables<ProjectTables.Cabins>,
    "name" | "image_url" | "max_capacity"
>;

export type TBookingWithCabin = TBooking & {
    cabins: TCabinBooking;
};

export type SearchParams = Promise<{
    [key: string]: string | string[] | undefined;
}>;

export type ModalConfigProps = Record<ModalWindows, ModalConfig>;
