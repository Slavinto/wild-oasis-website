"use client";

import React, { ReactNode } from "react";

const Overlay = ({ children }: { children: ReactNode }) => {
    return (
        <div className='fixed inset-0 w-full h-screen bg-backdrop backdrop-blur-sm z-[1000] transition-all duration-500'>
            {children}
        </div>
    );
};

export default Overlay;
