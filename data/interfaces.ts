import { CabinCapacity } from "./enums";

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
