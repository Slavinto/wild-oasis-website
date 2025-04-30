"use client";

import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import SpinnerMini from "../../server/SpinnerMini";

interface ModalButtonProps {
    buttonText?: string;
    onClick?: React.MouseEventHandler;
    icon?: ReactNode;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    classNames?: string;
    iconClassNames?: string;
    disabled?: boolean;
}

const ModalButton: FC<ModalButtonProps> = ({
    buttonText = "",
    onClick,
    icon = null,
    type = "button",

    classNames = "",
    iconClassNames = "",
    disabled,
}) => {
    const { pending } = useFormStatus();

    return (
        <button
            type={type}
            disabled={pending || disabled}
            onClick={onClick ? onClick : () => {}}
            className={`max-w-[8rem] h-full group flex items-center justify-center gap-2 uppercase text-xs font-bold border text-accent-300 border-accent-300/95 flex-grow py-4 px-8 hover:bg-accent-600 transition-colors hover:text-primary-900 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 ${classNames}`}
        >
            {pending ? (
                <span className='mx-auto'>
                    <SpinnerMini />
                </span>
            ) : (
                <>
                    <span className={`${iconClassNames}`}>{icon}</span>
                    {buttonText && <span className='pt-1'>{buttonText}</span>}
                </>
            )}
        </button>
    );
};

export default ModalButton;
