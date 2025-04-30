"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const SidebarLink = ({
    text,
    path,
    icon,
}: {
    text: string;
    path: string;
    icon: ReactNode;
}) => {
    const pathName = usePathname();

    return (
        <li>
            <Link
                className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                    pathName === path
                        ? "bg-primary-900 pointer-events-none"
                        : ""
                }`}
                href={path}
            >
                {icon}
                <span>{text}</span>
            </Link>
        </li>
    );
};

export default SidebarLink;
