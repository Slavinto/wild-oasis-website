"use client";

import React, { FC, ReactElement } from "react";
import Modal from "./Modal";
import ModalButton from "./ModalButton";
import { ModalConfig } from "@/data/interfaces";
import Heading from "../Heading";
import { Headings } from "@/data/enums";

interface ModalLayoutProps {
    config: ModalConfig;
    children: ReactElement;
}

const ModalLayout: FC<ModalLayoutProps> = ({ config, children }) => {
    const { buttonText, icon, windowName, descriptionText } = config;
    return (
        <Modal>
            <Modal.Open opens={windowName}>
                <ModalButton icon={icon} buttonText={buttonText} />
            </Modal.Open>
            <Modal.Window name={windowName}>
                <div className='flex flex-col'>
                    <Heading as={Headings.H4} classNames='py-8 text-accent-300'>
                        {descriptionText}
                    </Heading>
                    <div className='flex justify-around w-full'>{children}</div>
                </div>
            </Modal.Window>
        </Modal>
    );
};

export default ModalLayout;
