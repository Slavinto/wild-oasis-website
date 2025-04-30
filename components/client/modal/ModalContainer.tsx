"use client";

import React, { forwardRef, ReactNode } from "react";

const ModalContainer = forwardRef<
    HTMLDivElement,
    { classNames: string; children: ReactNode }
>(({ classNames, children }, ref) => (
    <div
        ref={ref}
        className={`bg-accent-800/85 relative max-w-[40rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-grey-0 rounded-lg shadow-lg px-16 py-12 transition-all duration-500 ${classNames}`}
    >
        {children}
    </div>
));

ModalContainer.displayName = "ModalContainer";

export default ModalContainer;
