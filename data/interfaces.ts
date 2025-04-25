import { ReactElement, ReactNode } from "react";
import { CabinCapacity, ModalWindows } from "./enums";

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

export interface IBooking {
    id: string;
}
// ======================Cabins==============================
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
