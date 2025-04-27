"use client";

import React, { FC, ReactElement } from "react";
import Modal from "./Modal";
import ModalButton from "./ModalButton";
import { ModalConfig } from "@/data/interfaces";
import ModalContentWrapper from "./ModalContentWrapper";

interface ModalLayoutProps {
    config: ModalConfig;
    children: ReactElement;
}

const ModalLayout: FC<ModalLayoutProps> = ({ config, children }) => {
    const { buttonText, icon, windowName, descriptionText } = config;
    return (
        <Modal>
            <Modal.Open opens={windowName}>
                {/* this is shown in the ReservationCard */}
                <ModalButton
                    icon={icon}
                    buttonText={buttonText}
                    classNames='text-primary-300 border-0 border-primary-800'
                />
            </Modal.Open>
            <Modal.Window name={windowName}>
                <ModalContentWrapper descriptionText={descriptionText}>
                    {children}
                </ModalContentWrapper>
            </Modal.Window>
        </Modal>
    );
};

export default ModalLayout;
