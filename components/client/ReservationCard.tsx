"use client";

import Image from "next/image";
import { format, isPast, isToday } from "date-fns";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

import Heading from "@/components/server/Heading";
import { TBookingWithCabin } from "@/data/types";
import { Headings, ModalWindows } from "@/data/enums";
import Link from "next/link";
import ModalLayout from "./modal/ModalLayout";
import { modalConfigs } from "@/data/constants";
import { formatDistanceFromNow } from "@/lib/helpers";
import ModalButton from "./modal/ModalButton";

function ReservationCard({
    booking,
    onDelete,
}: {
    booking: TBookingWithCabin;
    onDelete: (reservationId: number) => void;
}) {
    const {
        id,
        // guest_id,
        start_date,
        end_date,
        number_of_nights,
        total_price,
        number_of_guests,
        // status,
        created_at,
        cabins: { name, image_url },
    } = booking;
    return (
        <div className='flex border border-primary-800'>
            <div className='relative h-32 aspect-square'>
                <Image
                    src={image_url || ""}
                    alt={`Cabin ${name}`}
                    fill
                    className='object-cover border-r border-primary-800'
                />
            </div>

            <div className='flex-grow px-6 py-3 flex flex-col'>
                <div className='flex items-center justify-between'>
                    <Heading as={Headings.H4}>
                        {number_of_nights} nights in Cabin {name}
                    </Heading>
                    {isPast(new Date(start_date || "")) ? (
                        <span className='bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
                            past
                        </span>
                    ) : (
                        <span className='bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
                            upcoming
                        </span>
                    )}
                </div>

                <p className='text-lg text-primary-300'>
                    {format(new Date(start_date || ""), "EEE, MMM dd yyyy")} (
                    {isToday(new Date(start_date || ""))
                        ? "Today"
                        : formatDistanceFromNow(start_date || "")}
                    ) &mdash;{" "}
                    {format(new Date(end_date || ""), "EEE, MMM dd yyyy")}
                </p>
                <div className='flex gap-5 mt-auto items-baseline'>
                    <p className='text-xl font-semibold text-accent-400'>
                        ${total_price}
                    </p>
                    <p className='text-primary-300'>&bull;</p>
                    <p className='text-lg text-primary-300'>
                        {number_of_guests} guest
                        {(number_of_guests ?? 0) > 1 && "s"}
                    </p>
                    <p className='ml-auto text-sm text-primary-400'>
                        Booked{" "}
                        {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
                    </p>
                </div>
            </div>

            <div className='flex'>
                {isPast(start_date || "") ? (
                    <></>
                ) : (
                    <div className='flex flex-col w-full h-full border-primary-800 border-l'>
                        <Link
                            href={`/account/reservations/edit/${id}`}
                            className='max-h-1/2 group flex flex-grow items-center justify-start px-8 gap-2 uppercase text-xs font-bold text-primary-300 hover:bg-accent-600 transition-colors hover:text-primary-900'
                        >
                            <HiOutlinePencilSquare className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
                            <span className='mt-1'>Edit</span>
                        </Link>
                        <div className='max-h-1/2 flex-grow flex !border-0 !border-t border-primary-800 items-center'>
                            <ModalLayout
                                config={
                                    modalConfigs[
                                        ModalWindows.DeleteReservationConfirm
                                    ]
                                }
                            >
                                <ModalButton
                                    onClick={() => onDelete(Number(id))}
                                    buttonText='Delete'
                                    icon={<HiOutlineTrash />}
                                />
                            </ModalLayout>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReservationCard;
