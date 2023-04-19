import { useState } from "react";

interface UseMessagesModal {
    visibleModalWindow: boolean;
    onOpenModalWindow: () => void;
    onCloseModalWindow: () => void;
}

export const useModalWindow = (): UseMessagesModal => {
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);

    const onOpenModalWindow = (): void => {
        setVisibleModalWindow(true);
    };

    const onCloseModalWindow = (): void => {
        setVisibleModalWindow(false);
    };

    return { visibleModalWindow, onOpenModalWindow, onCloseModalWindow };
};
