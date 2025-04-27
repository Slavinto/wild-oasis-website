"use client";

import React, { FC, ReactNode } from "react";

interface ModalButtonProps {
    buttonText?: string;
    onClick?: React.MouseEventHandler;
    icon?: ReactNode;
    classNames?: string;
}

const ModalButton: FC<ModalButtonProps> = ({
    buttonText = "",
    onClick,
    icon = null,

    classNames = "",
}) => {
    return (
        <button
            onClick={onClick ? onClick : () => {}}
            className={`max-w-[8rem] group flex items-center justify-center gap-2 uppercase text-xs font-bold border text-accent-300 border-accent-300/95 flex-grow p-4 hover:bg-accent-600 transition-colors hover:text-primary-900 ${classNames}`}
        >
            <span className=''>{icon}</span>
            {buttonText && <span className='pt-1'>{buttonText}</span>}
        </button>
    );
};

export default ModalButton;
