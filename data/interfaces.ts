import { ReactElement, ReactNode } from "react";
import { BookingStatus, CabinCapacity, ModalWindows } from "./enums";

export interface ICountry {
    name: string;
    defaultCountry?: string;
    flag?: string;
}

// ======================Cabins==============================
export interface CabinsFilter {
    capacity?: CabinCapacity;
}

export interface ICabin {
    id: string;
}
// ======================Cabins==============================
// ======================Bookings==============================

export interface IBooking {
    start_date: string;
    end_date: string;
    number_of_nights: number;
    number_of_guests: number;
    cabin_price: number;
    extras_price: number;
    total_price: number;
    status: BookingStatus;
    has_breakfast: boolean;
    is_paid: boolean;
    observations: string;
    cabin_id: number;
    guest_id: number;
}
// ======================Bookings==============================
// ======================Guests==============================

// interface for creating a supabase guest entry from AuthJs user
// object
export interface AuthGuest {
    name: string;
    email: string;
}

// ======================Guests==============================
// ======================Modals==============================

export interface ModalConfig {
    icon?: ReactNode;
    buttonText: string;
    descriptionText: string;
    renderWindowContent?: (arg: number) => ReactElement;
    windowName: ModalWindows;
}
// ======================Modals==============================
