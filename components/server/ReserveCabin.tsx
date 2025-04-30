import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import DateSelector from "../cabinReservation/DateSelector";
import ReservationForm from "../cabinReservation/ReservationForm";
import { ProjectTables } from "@/data/enums";
import { Tables } from "@/data/supabaseTypes";
import { auth } from "@/auth";
import LoginMessage from "./LoginMessage";

const ReserveCabin = async ({
    cabin,
}: {
    cabin: Tables<ProjectTables.Cabins>;
}) => {
    const { id } = cabin;
    const [dates, settings] = await Promise.all([
        getBookedDatesByCabinId(id),
        getSettings(),
    ]);
    const session = await auth();

    return session?.user ? (
        <div className='grid grid-cols-1 gap-8 px-8 pb-8 my-16 border border-primary-800 min-h-[400px] '>
            <DateSelector cabin={cabin} dates={dates} settings={settings} />
            <ReservationForm
                cabin={cabin}
                maxCapacity={cabin.max_capacity || 0}
            />
        </div>
    ) : (
        <LoginMessage />
    );
};

export default ReserveCabin;
