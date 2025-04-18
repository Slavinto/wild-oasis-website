import { Suspense } from "react";

import { CabinDetails, ReserveCabin, Spinner } from "@/components";
import { getCabin, getCabins } from "@/lib/data-service";

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

    return (
        <div className='max-w-6xl mx-auto mt-8'>
            <CabinDetails cabin={cabin} />
            <Suspense fallback={<Spinner />}>
                <ReserveCabin cabin={cabin} />
            </Suspense>
        </div>
    );
}
