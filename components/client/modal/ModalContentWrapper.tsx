"use client";

import React, { FC, ReactNode } from "react";
import Heading from "../../server/Heading";
import { Headings } from "@/data/enums";
import ModalButton from "./ModalButton";

interface ModalContentWrapperProps {
    children: ReactNode;
    descriptionText: string;
    onCloseModal?: () => void;
}

const ModalContentWrapper: FC<ModalContentWrapperProps> = ({
    children,
    descriptionText,
    // wrapper gets this prop from Modal.Window after cloning
    onCloseModal,
}) => {
    return (
        <div className='flex flex-col'>
            <Heading as={Headings.H4} classNames='py-8 text-accent-300'>
                {descriptionText}
            </Heading>
            <div className='flex justify-around w-full'>
                {children}
                <ModalButton buttonText='Cancel' onClick={onCloseModal} />
            </div>
        </div>
    );
};

export default ModalContentWrapper;
