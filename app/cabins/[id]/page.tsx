import { FC, Suspense } from "react";

import { ReserveCabin, Spinner } from "@/components/server";
import CabinDetails from "@/components/cabinReservation/CabinDetails";
import { getCabin, getCabins } from "@/lib/data-service";

interface CabinPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CabinPageProps) {
    const { id } = await params;

    return { title: ` | Cabin ${id} details` };
}

export async function generateStaticParams() {
    const cabins = await getCabins();
    return cabins.map((cabin) => ({ id: cabin.id.toString() }));
}

const CabinPage: FC<CabinPageProps> = async ({ params }) => {
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
};

export default CabinPage;
