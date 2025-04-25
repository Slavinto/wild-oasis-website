import { Headings } from "@/data/enums";
import React, { ReactNode } from "react";

const Heading = ({
    as,
    classNames = "",
    children,
}: {
    as: Headings;
    classNames?: string;
    children: ReactNode;
}) => {
    return as === Headings.H1 ? (
        <h1 className={`text-7xl font-bold ${classNames}`}>{children}</h1>
    ) : as === Headings.H2 ? (
        <h2 className={`text-5xl font-semibold ${classNames}`}>{children}</h2>
    ) : as === Headings.H3 ? (
        <h3 className={`text-3xl font-semibold ${classNames}`}>{children}</h3>
    ) : as === Headings.H4 ? (
        <h4 className={`text-xl font-semibold ${classNames}`}>{children}</h4>
    ) : null;
};

export default Heading;
