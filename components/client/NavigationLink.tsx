"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const NavigationLink = ({
    path,
    text,
    icon,
}: {
    path: string;
    text: string;
    icon?: ReactNode;
}) => {
    const pathName = usePathname();

    return (
        <li className='flex items-center gap-2 hover:text-accent-400 transition-colors'>
            {icon && <div className=''>{icon}</div>}
            <Link
                href={path}
                className={`${
                    path === pathName
                        ? "text-accent-400 pointer-events-none"
                        : ""
                }`}
            >
                {text}
            </Link>
        </li>
    );
};

export default NavigationLink;
