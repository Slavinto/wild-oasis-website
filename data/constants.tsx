import { HiCalendarDays, HiHome, HiUser } from "react-icons/hi2";

export const navLinks = [
    { path: "/cabins", text: "Cabins" },
    { path: "/about", text: "About" },
    { path: "/account", text: "Guest area" },
];

export const sidebarLinks = [
    {
        text: "Home",
        path: "/account",
        icon: <HiHome className='h-5 w-5 text-primary-600' />,
    },
    {
        text: "Reservations",
        path: "/account/reservations",
        icon: <HiCalendarDays className='h-5 w-5 text-primary-600' />,
    },
    {
        text: "Guest profile",
        path: "/account/profile",
        icon: <HiUser className='h-5 w-5 text-primary-600' />,
    },
];

export const supabaseCabinCapacityRanges = {
    small: "max_capacity.lte.2",
    medium: "max_capacity.gte.3, max_capacity.lte.",
    large: "",
};

export const radialGradientAccentBackground =
    "bg-[radial-gradient(circle,_rgba(44,61,79,0.1)_0%,_rgba(75,53,27,0.8)_70%)]";
