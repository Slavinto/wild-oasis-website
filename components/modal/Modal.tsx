"use client";

import { createPortal } from "react-dom";
import {
    ReactElement,
    ReactNode,
    Ref,
    cloneElement,
    useContext,
    useState,
} from "react";
import { useClickOutside } from "@/lib/hooks";
import { ModalWindows } from "@/data/enums";
import { ModalContext } from "./ModalContext";
import Overlay from "./Overlay";
import ModalContainer from "./ModalContainer";
import ModalButton from "./ModalButton";
import { HiXMark } from "react-icons/hi2";

const Modal = ({ children }: { children: ReactNode }) => {
    const [openWindowName, setOpenWindowName] = useState<ModalWindows | null>(
        null
    );

    const close = () => setOpenWindowName(null);
    const open = (windowName: ModalWindows) => setOpenWindowName(windowName);
    return (
        <ModalContext.Provider value={{ open, close, openWindowName }}>
            {children}
        </ModalContext.Provider>
    );
};

const Open = ({
    children,
    opens: openWindowName,
}: {
    children: ReactElement<{ onClick: React.MouseEventHandler }>;
    opens: ModalWindows;
}) => {
    const { open } = useContext(ModalContext);

    return cloneElement(children, {
        onClick: () => {
            open(openWindowName);
        },
    });
};

const Window = ({
    name,
    children,
}: {
    name: ModalWindows;
    children: ReactElement;
}) => {
    const { openWindowName, close } = useContext(ModalContext);
    const { ref } = useClickOutside(close, true, ".modal-content");

    if (name !== openWindowName) return null;

    // attaching close handler
    // @ts-expect-error test
    const nestedContent = cloneElement(children, { onCloseModal: close });

    return createPortal(
        <Overlay>
            <ModalContainer
                ref={ref as Ref<HTMLDivElement>}
                classNames='modal-content'
            >
                <ModalButton
                    classNames='!p-0 !absolute !top-8 !right-8'
                    icon={<HiXMark size={25} />}
                    onClick={close}
                />
                {nestedContent}
            </ModalContainer>
        </Overlay>,
        document.body
    );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
