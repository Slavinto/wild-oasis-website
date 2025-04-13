import { navLinks } from "@/data/constants";
import NavigationLink from "./NavigationLink";

export default function Navigation() {
    return (
        <nav className='z-10 text-xl'>
            <ul className='flex gap-16 items-center'>
                {navLinks.map(({ path, text }) => (
                    <NavigationLink key={path} path={path} text={text} />
                ))}
            </ul>
        </nav>
    );
}
