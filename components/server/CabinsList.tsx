import { getCabins, getFilteredCabins } from "@/lib/data-service";
import CabinCard from "./CabinCard";
import { CabinsFilter } from "@/data/interfaces";

const CabinsList = async ({ filters }: { filters: CabinsFilter }) => {
    const cabins =
        Object.keys(filters).length > 0
            ? await getFilteredCabins(filters)
            : await getCabins();

    if (!cabins.length) {
        return null;
    }
    return (
        <>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
                {cabins.map((cabin) => (
                    <CabinCard cabin={cabin} key={cabin.id} />
                ))}
            </div>
        </>
    );
};

export default CabinsList;
