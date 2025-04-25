import { auth } from "@/auth";
import { GuestProfileForm, Heading, SelectCountry } from "@/components";
import { Headings } from "@/data/enums";
import { getGuest } from "@/lib/data-service";

export const metadata = {
    title: " | Profile",
};

const ProfilePage = async () => {
    const session = await auth();
    if (!session?.user || !session.user.email) {
        return null;
    }

    const guest = await getGuest(session.user.email);
    if (!guest) {
        return null;
    }

    return (
        <div>
            <Heading as={Headings.H3} classNames='text-accent-400 mb-4'>
                Update your guest profile
            </Heading>
            <GuestProfileForm guest={guest}>
                <SelectCountry
                    name='nationality'
                    id='nationality'
                    className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                    defaultCountry={guest.nationality || ""}
                />
            </GuestProfileForm>
            <p className='text-lg mb-8 text-primary-200'>
                Providing the following information will make your check-in
                process faster and smoother. See you soon!
            </p>
        </div>
    );
};

export default ProfilePage;
