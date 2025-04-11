import { TCabin } from "@/data/types";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineUsers } from "react-icons/hi2";

function CabinCard({ cabin }: { cabin: TCabin }) {
    const { id, name, max_capacity, image_url } = cabin;
    const regular_price = cabin.regular_price ?? 0;
    const discount = cabin.discount ?? 0;
    console.log({ cabin });
    return (
        <div className='flex border-primary-800 border'>
            <Image
                width={100}
                height={100}
                src={image_url || ""}
                alt={`Cabin ${name}`}
                className='flex-1 border-r border-primary-800 object-cover'
            />

            <div className='flex-grow'>
                <div className='pt-5 pb-4 px-7 bg-primary-950'>
                    <h3 className='text-accent-500 font-semibold text-2xl mb-3'>
                        Cabin {name}
                    </h3>

                    <div className='flex gap-3 items-center mb-2'>
                        <HiOutlineUsers className='h-5 w-5 text-primary-600' />
                        <p className='text-lg text-primary-200'>
                            For up to{" "}
                            <span className='font-bold'>{max_capacity}</span>{" "}
                            guests
                        </p>
                    </div>

                    <p className='flex gap-3 justify-end items-baseline'>
                        {discount > 0 ? (
                            <>
                                <span className='text-3xl font-[350]'>
                                    ${regular_price - discount}
                                </span>
                                <span className='line-through font-semibold text-primary-600'>
                                    ${regular_price}
                                </span>
                            </>
                        ) : (
                            <span className='text-3xl font-[350]'>
                                ${regular_price}
                            </span>
                        )}
                        <span className='text-primary-200'>/ night</span>
                    </p>
                </div>

                <div className='bg-primary-950 border-t border-t-primary-800 text-right'>
                    <Link
                        href={`/cabins/${id}`}
                        className='border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900'
                    >
                        Details & reservation &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CabinCard;
