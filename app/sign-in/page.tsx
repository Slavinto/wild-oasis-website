import { auth } from "@/auth";
import { Heading, SignInButton } from "@/components";
import { Headings } from "@/data/enums";

export const metadata = {
    title: " | Sign in",
};

export default async function Page() {
    const session = await auth();
    return (
        <div className='flex flex-col gap-10 mt-10 items-center'>
            {session?.user ? (
                <Heading as={Headings.H3}>
                    Welcome, {session.user?.name}
                </Heading>
            ) : (
                <>
                    <Heading as={Headings.H3}>
                        Sign in to access your guest area
                    </Heading>
                    <SignInButton />
                </>
            )}
        </div>
    );
}
