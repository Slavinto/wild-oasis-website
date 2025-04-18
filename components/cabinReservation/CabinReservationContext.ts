import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface ICabinReservationRange {
    from?: Date;
    to?: Date;
}

export interface ICabinReservationContext {
    range?: ICabinReservationRange;
    setRange?: Dispatch<SetStateAction<ICabinReservationRange>>;
}

export const initialReservationState = {
    from: undefined,
    to: undefined,
};

export const CabinReservationContext = createContext<ICabinReservationContext>({
    range: initialReservationState,
});

export const useCabinReservationContext = () =>
    useContext(CabinReservationContext);
