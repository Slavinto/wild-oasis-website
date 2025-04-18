"use client";
import { HiXMark } from "react-icons/hi2";

import { format } from "date-fns";
import {
    initialReservationState,
    useCabinReservationContext,
} from "./CabinReservationContext";

function ReservationReminder() {
    const { range, setRange } = useCabinReservationContext();

    if (!range?.from || !range?.to) return null;

    return (
        <div className='fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center'>
            <p>
                <span>👋</span> Don&#39;t forget to reserve your dates <br />{" "}
                from {format(new Date(range.from), "MMM dd yyyy")} to{" "}
                {format(new Date(range.to), "MMM dd yyyy")}
            </p>
            <button
                onClick={() => setRange?.(initialReservationState)}
                className='rounded-full p-1 hover:bg-accent-600 transition-all'
            >
                <HiXMark className='h-5 w-5' />
            </button>
        </div>
    );
}

export default ReservationReminder;
