import React, {ComponentType, useState} from "react";

import {User} from "../store/ducks/user/contracts/state";

export interface HoverUserProps {
    visibleUser?: User;
    visiblePopperWindow?: boolean;
    handleHoverPopper?: () => void;
    handleHoverPopperWithUser?: (visibleUser: User) => void;
    handleLeavePopper?: () => void;
}

export const withHoverUser = <T extends HoverUserProps>(Component: ComponentType<T>) => (props: T) => {
    const [visibleUser, setVisibleUser] = useState<User | undefined>(undefined);
    const [visiblePopperWindow, setVisiblePopperWindow] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);

    const handleHoverPopperWithUser = (visibleUser: User): void => {
        setVisibleUser(visibleUser);
        handleHoverPopper();
    };

    const handleHoverPopper = (): void => {
        setDelayHandler(setTimeout(() => {
            setVisiblePopperWindow(true);
        }, 1337));
    };

    const handleLeavePopper = (): void => {
        clearTimeout(delayHandler);
        setVisiblePopperWindow(false);
        setVisibleUser(undefined);
    };

    return (
        <Component
            {...props as T}
            visibleUser={visibleUser}
            visiblePopperWindow={visiblePopperWindow}
            handleHoverPopper={handleHoverPopper}
            handleHoverPopperWithUser={handleHoverPopperWithUser}
            handleLeavePopper={handleLeavePopper}
        />
    );
}

