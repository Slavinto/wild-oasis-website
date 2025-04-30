import { SideNavigation } from "@/components/server";
import React, { ReactNode } from "react";

const AccountLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='grid grid-cols-[16rem_1fr] h-full gap-12'>
            <div className=''>
                <SideNavigation />
            </div>
            <div className=''>{children}</div>
        </div>
    );
};

export default AccountLayout;
