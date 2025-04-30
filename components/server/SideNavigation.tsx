import { sidebarLinks } from "@/data/constants";
import SignOutButton from "./SignOutButton";
import SidebarLink from "../client/SidebarLink";

function SideNavigation() {
    return (
        <nav className='h-full border-r border-primary-900'>
            <ul className='flex flex-col gap-2 h-full text-lg'>
                {sidebarLinks.map(({ text, path, icon }) => (
                    <SidebarLink
                        key={path}
                        text={text}
                        path={path}
                        icon={icon}
                    />
                ))}

                <li className='mt-auto'>
                    <SignOutButton />
                </li>
            </ul>
        </nav>
    );
}

export default SideNavigation;
