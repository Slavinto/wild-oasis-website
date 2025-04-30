import { ModalWindows } from "@/data/enums";
import { createContext } from "react";

// modal interface
interface IModal {
    open: (windowName: ModalWindows) => void;
    close: () => void;
    openWindowName: ModalWindows | null;
}

// modal context
export const ModalContext = createContext<IModal>({} as IModal);
