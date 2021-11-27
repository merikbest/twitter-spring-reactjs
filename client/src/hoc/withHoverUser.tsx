import React, {ComponentType, useState} from "react";

export interface HoverUserProps {
    visiblePopperWindow?: boolean;
    handleHoverPopper?: () => void;
    handleLeavePopper?: () => void;
}

export const withHoverUser = <T extends HoverUserProps>(Component: ComponentType<T>) => (props: T) => {
    const [visiblePopperWindow, setVisiblePopperWindow] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);

    const handleHoverPopper = (): void => {
        setDelayHandler(setTimeout(() => setVisiblePopperWindow(true), 1337));
    };

    const handleLeavePopper = (): void => {
        clearTimeout(delayHandler);
        setVisiblePopperWindow(false);
    };

    return (
        <Component
            {...props as T}
            visiblePopperWindow={visiblePopperWindow}
            handleHoverPopper={handleHoverPopper}
            handleLeavePopper={handleLeavePopper}
        />
    );
}

