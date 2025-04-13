import { CabinsList, CabinCapacityFilter, Spinner } from "@/components";
import { cabinPageText } from "@/data/pagesTextContent";
import { SearchParams } from "@/data/types";
import { Suspense } from "react";

// export const revalidate = 3600;

export const metadata = {
    title: "The Wild Oasis | Cabins",
};

export default async function CabinPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const filters = await searchParams;
    console.log(JSON.stringify(filters));
    return (
        <div className='flex flex-col w-full'>
            <h1 className='text-4xl mb-5 text-accent-400 font-medium'>
                {cabinPageText.heading}
            </h1>
            <p className='text-primary-200 font-secondary text-lg mb-10'>
                {cabinPageText.description}
            </p>
            <CabinCapacityFilter />
            <Suspense key={JSON.stringify(filters)} fallback={<Spinner />}>
                <CabinsList filters={filters} />
            </Suspense>
        </div>
    );
}
