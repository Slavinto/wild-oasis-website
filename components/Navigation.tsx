import { navLinks } from "@/data/constants";
import NavigationLink from "./NavigationLink";
import { auth } from "@/auth";

export default async function Navigation() {
    const session = await auth();

    return (
        <nav className='z-10 text-xl'>
            <ul className='flex gap-16 items-center'>
                {navLinks.map(({ path, text, icon = "" }) => (
                    <NavigationLink
                        key={path}
                        path={path}
                        text={text}
                        icon={session?.user ? icon : ""}
                    />
                ))}
            </ul>
        </nav>
    );
}
