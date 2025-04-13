import { Spinner } from "@/components";
import React, { ReactNode } from "react";

const CabinsLayout = ({
    children,
    isPending,
}: {
    children: ReactNode;
    isPending: boolean;
}) => {
    return <>{isPending ? <Spinner /> : children}</>;
};

export default CabinsLayout;
