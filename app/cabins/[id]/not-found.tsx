import { ProjectEntities } from "@/data/enums";
import Link from "next/link";
import React from "react";

const CabinNotFound = () => {
    const entity = ProjectEntities.Cabin;

    return (
        <main className='text-center space-y-6 mt-4'>
            <h1 className='text-3xl font-semibold'>
                This {entity} could not be found :(
            </h1>
            <Link
                href={`/${entity}s`}
                className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
            >
                Browse {entity}s
            </Link>
        </main>
    );
};

export default CabinNotFound;
