import { auth } from "@/auth";

export const metadata = {
    title: " | Guest area",
};

export default async function AccountPage() {
    const session = await auth();
    return session?.user ? (
        <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
            Welcome, {session.user.name}!
        </h2>
    ) : null;
}
