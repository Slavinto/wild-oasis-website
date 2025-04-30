"use client";

import { ChangeEvent, useState } from "react";
import ModalButton from "../client/modal/ModalButton";
import {
    initialReservationState,
    useCabinReservationContext,
} from "./CabinReservationContext";
import { Tables } from "@/data/supabaseTypes";
import { ProjectTables } from "@/data/enums";
import { createReservation } from "@/lib/actions";

function ReservationForm({
    cabin,
    maxCapacity,
}: {
    cabin: Tables<ProjectTables.Cabins>;

    maxCapacity: number;
}) {
    const [numGuests, setNumGuests] = useState("");
    const { range, setRange } = useCabinReservationContext();

    const isRangeDefined = range?.from && range?.to;

    return (
        <div className='scale-[1.01]'>
            <form
                action={(formData: FormData) => {
                    createReservation(cabin, formData, range);
                    setRange?.(initialReservationState);
                }}
                className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'
            >
                <div className='space-y-2'>
                    <label htmlFor='numGuests'>How many guests?</label>
                    <select
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setNumGuests(e.target.value);
                        }}
                        value={numGuests}
                        name='numGuests'
                        id='numGuests'
                        className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                        required
                    >
                        <option value='' key=''>
                            Select number of guests...
                        </option>
                        {Array.from(
                            { length: maxCapacity },
                            (_, i) => i + 1
                        ).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='space-y-2'>
                    <label htmlFor='observations'>
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        maxLength={300}
                        name='observations'
                        id='observations'
                        className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                        placeholder='Any pets, allergies, special requirements, etc.?'
                    />
                </div>

                <div className='flex justify-end items-center gap-6'>
                    <p className='text-primary-300 text-base'>
                        Start by selecting dates
                    </p>
                    <ModalButton
                        disabled={!isRangeDefined || !numGuests}
                        buttonText='Reserve&nbsp;now'
                        type='submit'
                        classNames='bg-accent-500 text-primary-800'
                    />
                </div>
            </form>
        </div>
    );
}

export default ReservationForm;
