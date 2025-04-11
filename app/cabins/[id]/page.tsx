import { TextExpander } from "@/components";
import { getCabin, getCabins } from "@/lib/data-service";
import Image from "next/image";
import React from "react";
import { HiEyeSlash, HiMapPin, HiUsers } from "react-icons/hi2";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return { title: ` | Cabin ${id} details` };
}

export async function generateStaticParams() {
    const cabins = await getCabins();
    return cabins.map((cabin) => ({ id: cabin.id.toString() }));
}

export default async function CabinPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const cabin = await getCabin(Number(id));
    console.log({ cabin });
    const {
        // id,
        name,
        max_capacity,
        // regular_price,
        // discount,
        image_url,
        description,
    } = cabin;

    return (
        <div className='max-w-6xl mx-auto mt-8'>
            <div className='grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-20 md:border md:border-primary-800 md:py-3 md:px-10 mb-24'>
                <div className='relative aspect-1 md:scale-[1.15] md:-translate-x-3 h-[24vh] md:h-full'>
                    <Image
                        src={image_url}
                        fill
                        className='object-cover'
                        alt={`Cabin ${name}`}
                    />
                </div>

                <div>
                    <h3 className='text-accent-100 font-black text-7xl mb-5 md:translate-x-[-254px] bg-primary-950 p-6 pb-1 md:w-[150%]'>
                        Cabin {name}
                    </h3>

                    <p className='text-lg text-primary-300 mb-10 font-secondary'>
                        <TextExpander>{description}</TextExpander>
                    </p>

                    <ul className='flex flex-col gap-4 mb-7'>
                        <li className='flex gap-3 items-center'>
                            <HiUsers className='h-5 w-5 text-primary-600' />
                            <span className='text-lg'>
                                For up to{" "}
                                <span className='font-bold'>
                                    {max_capacity}
                                </span>{" "}
                                guests
                            </span>
                        </li>
                        <li className='flex gap-3 items-center'>
                            <HiMapPin className='h-5 w-5 text-primary-600' />
                            <span className='text-lg'>
                                Located in the heart of the{" "}
                                <span className='font-bold'>Dolomites</span>{" "}
                                (Italy)
                            </span>
                        </li>
                        <li className='flex gap-3 items-center'>
                            <HiEyeSlash className='h-5 w-5 text-primary-600' />
                            <span className='text-lg'>
                                Privacy <span className='font-bold'>100%</span>{" "}
                                guaranteed
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className='text-5xl font-semibold text-center'>
                    Reserve today. Pay on arrival.
                </h2>
            </div>
        </div>
    );
}
