"use client";

import { radialGradientAccentBackground } from "@/data/constants";
import { CabinCapacity } from "@/data/enums";
import { useSetSearchParam } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";

const CabinCapacityFilter = () => {
    const searchParams = useSearchParams();
    const capacityParam = searchParams.get("capacity");

    const { createQueryString, isPending } = useSetSearchParam();
    return (
        <div className='w-full flex mb-8'>
            {capacityParam && (
                <button
                    className='border-primary-800 hover:bg-accent-900 border px-4 py-2'
                    onClick={() => createQueryString("capacity", "")}
                >
                    Clear
                </button>
            )}
            <div className='flex gap-4 ml-auto'>
                {Object.keys(CabinCapacity).map((capacity) => {
                    const cap = capacity.toLowerCase();
                    const isButtonActive = capacityParam === cap;

                    return (
                        <button
                            key={capacity}
                            disabled={isButtonActive || isPending}
                            className={`border-primary-800 hover:bg-accent-900 border px-4 py-2 ${
                                isButtonActive
                                    ? radialGradientAccentBackground
                                    : "cursor-pointer"
                            }`}
                            onClick={() => createQueryString("capacity", cap)}
                        >
                            {capacity}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CabinCapacityFilter;
