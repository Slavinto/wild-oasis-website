"use client";

import React, { ReactNode, useState } from "react";
import {
    CabinReservationContext,
    ICabinReservationRange,
    initialReservationState,
} from "./CabinReservationContext";

const CabinReservationContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [range, setRange] = useState<ICabinReservationRange>(
        initialReservationState
    );

    return (
        <CabinReservationContext.Provider value={{ range, setRange }}>
            {children}
        </CabinReservationContext.Provider>
    );
};

export default CabinReservationContextProvider;
