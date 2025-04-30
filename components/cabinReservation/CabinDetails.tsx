import Image from "next/image";
import { Headings, ProjectEntities, ProjectTables } from "@/data/enums";
import { Tables } from "@/data/supabaseTypes";
import Heading from "../server/Heading";
import TextExpander from "../client/TextExpander";
import { HiEyeSlash, HiMapPin, HiUsers } from "react-icons/hi2";

const CabinDetails = ({ cabin }: { cabin: Tables<ProjectTables.Cabins> }) => {
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
        <>
            <div className='grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-20 md:border md:border-primary-800 md:py-3 md:px-10 mb-24'>
                <div className='relative aspect-1 md:scale-[1.15] md:-translate-x-3 h-[24vh] md:h-full'>
                    <Image
                        src={image_url || ""}
                        fill
                        className='object-cover'
                        alt={`Cabin ${name}`}
                    />
                </div>
                <div>
                    <h3 className='text-accent-100 font-black text-7xl mb-5 md:translate-x-[-254px] bg-primary-950 p-6 pb-1 md:w-[150%]'>
                        Cabin {name}
                    </h3>
                    <div className=''>
                        <p className='text-lg text-primary-300 mb-10 font-secondary'>
                            <TextExpander text={description || ""} />
                        </p>
                    </div>

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
            <Heading as={Headings.H2} classNames='text-center text-accent-400'>
                Reserve
                <span className='text-accent-600'>
                    {` ${ProjectEntities.Cabin} ${name} `}
                </span>
                today. Pay on arrival.
            </Heading>
        </>
    );
};

export default CabinDetails;
