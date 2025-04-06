import { HiHome, HiUser, HiCalendarDays } from "react-icons/hi2";

import SignOutButton from "./SignOutButton";

const navLinks = [
    {
        name: "Home",
        href: "/account",
        icon: <HiHome className='h-5 w-5 text-primary-600' />,
    },
    {
        name: "Reservations",
        href: "/account/reservations",
        icon: <HiCalendarDays className='h-5 w-5 text-primary-600' />,
    },
    {
        name: "Guest profile",
        href: "/account/profile",
        icon: <HiUser className='h-5 w-5 text-primary-600' />,
    },
];

function SideNavigation() {
    return (
        <nav className='border-r border-primary-900'>
            <ul className='flex flex-col gap-2 h-full text-lg'>
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <a
                            className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
                            href={link.href}
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </a>
                    </li>
                ))}

                <li className='mt-auto'>
                    <SignOutButton />
                </li>
            </ul>
        </nav>
    );
}

export default SideNavigation;
