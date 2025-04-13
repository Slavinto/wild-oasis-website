"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavigationLink = ({ path, text }: { path: string; text: string }) => {
    const pathName = usePathname();

    return (
        <li>
            <Link
                href={path}
                className={`hover:text-accent-400 transition-colors ${
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
