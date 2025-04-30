"use client";

import React, { startTransition, useOptimistic } from "react";
import { TBookingWithCabin } from "@/data/types";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "@/lib/actions";

const ReservationList = ({ bookings }: { bookings: TBookingWithCabin[] }) => {
    // bookings prop is from supabase

    const [optimisticReservations, optimisticDeleteReservations] =
        useOptimistic(bookings, (oldReservations, deletedReservationId) => {
            return oldReservations.filter(
                (oldRes) => oldRes.id !== deletedReservationId
            );
        });

    async function handleDelete(reservationId: number) {
        startTransition(() => optimisticDeleteReservations(reservationId));
        await deleteReservation(reservationId);
    }

    return (
        <ul className='space-y-6 max-w-[60rem]'>
            {optimisticReservations.map((booking) => (
                <ReservationCard
                    onDelete={handleDelete}
                    booking={booking}
                    key={booking.id}
                />
            ))}
        </ul>
    );
};

export default ReservationList;
