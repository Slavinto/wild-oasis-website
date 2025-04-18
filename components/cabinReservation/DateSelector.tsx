"use client";

import { appBooking } from "@/data/constants";
import { ProjectTables } from "@/data/enums";
import { Tables } from "@/data/supabaseTypes";
// import { isWithinInterval } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import {
    initialReservationState,
    useCabinReservationContext,
} from "./CabinReservationContext";
// import "react-day-picker/dist/style.css";

// function isAlreadyBooked(range, datesArr) {
//     return (
//         range.from &&
//         range.to &&
//         datesArr.some((date) =>
//             isWithinInterval(date, { start: range.from, end: range.to })
//         )
//     );
// }

function DateSelector({
    cabin,
    dates,
}: // settings,
{
    cabin: Tables<ProjectTables.Cabins>;
    dates: (string | Date)[];
    settings: Tables<ProjectTables.Settings>;
}) {
    const { range, setRange } = useCabinReservationContext();
    // CHANGE
    const regularPrice = cabin.regular_price ?? 0;
    const discount = cabin.discount ?? 0;
    // const selectedFrom = selectedRange?.from - selectedRange?.to;
    // console.log({ selectedFrom });
    const numNights =
        range && range.from && range.to
            ? Math.ceil(
                  // @ts-expect-error test
                  Math.abs(range.from - range.to) / (1000 * 60 * 60 * 24)
              )
            : 0;
    const cabinPrice = regularPrice - discount;
    console.log({ numNights });
    console.log({ range });

    const resetRange = () => {
        setRange?.(initialReservationState);
    };

    // const from = new Date(dates[0]);
    // const to = new Date(dates[dates.length - 1]);

    // const range = { from, to };

    // const isBooked = (selectedRange) =>
    //     dates.find((date) =>
    //         isWithinInterval(new Date(date), {
    //             start: selectedRange.from,
    //             end: selectedRange.to,
    //         })
    //     );

    if (!regularPrice) throw new Error("Invalid cabin price");

    return (
        <div className='flex flex-col justify-between'>
            <DayPicker
                required
                className='pt-4 place-self-center'
                mode='range'
                min={appBooking.minBookingLength + 1}
                max={appBooking.maxBookingLength}
                selected={range as DateRange}
                onSelect={setRange}
                // disabled={range as DateRange}
                startMonth={new Date()}
                hidden={{ before: new Date() }}
                // toDate={}
                endMonth={new Date(new Date().getFullYear(), 8)}
                captionLayout='dropdown'
                numberOfMonths={3}
            />

            <div className='flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]'>
                <div className='flex items-baseline gap-6'>
                    <p className='flex gap-2 items-baseline'>
                        {discount > 0 ? (
                            <>
                                <span className='text-2xl'>
                                    ${regularPrice - discount}
                                </span>
                                <span className='line-through font-semibold text-primary-700'>
                                    ${regularPrice}
                                </span>
                            </>
                        ) : (
                            <span className='text-2xl'>${regularPrice}</span>
                        )}
                        <span className=''>/night</span>
                    </p>
                    {numNights ? (
                        <>
                            <p className='bg-accent-600 px-3 py-2 text-2xl'>
                                <span>&times;</span> <span>{numNights}</span>
                            </p>
                            <p>
                                <span className='text-lg font-bold uppercase'>
                                    Total
                                </span>{" "}
                                <span className='text-2xl font-semibold'>
                                    ${cabinPrice}
                                </span>
                            </p>
                        </>
                    ) : null}
                </div>

                {range?.from || range?.to ? (
                    <button
                        className='border border-primary-800 py-2 px-4 text-sm font-semibold invisible'
                        onClick={resetRange}
                    >
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default DateSelector;
