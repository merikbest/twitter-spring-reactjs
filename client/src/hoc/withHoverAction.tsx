import React, {useState} from "react";

export interface HoverActionProps {
    visibleActionWindow?: boolean;
    handleHoverAction?: () => void;
    handleLeaveAction?: () => void;
}

export const withHoverAction = (Component: React.FC<HoverActionProps>): React.FC<HoverActionProps> => {
    return (props: HoverActionProps) => {
        const [visibleActionWindow, setVisibleActionWindow] = useState<boolean>(false);
        const [delayHandler, setDelayHandler] = useState<any>(null);

        const handleHover = (): void => {
            setDelayHandler(setTimeout(() => setVisibleActionWindow(true), 500));
        };

        const handleLeave = (): void => {
            clearTimeout(delayHandler);
            setVisibleActionWindow(false);
        };

        return (
            <Component
                visibleActionWindow={visibleActionWindow}
                handleHoverAction={handleHover}
                handleLeaveAction={handleLeave}
            />
        );
    };
};
