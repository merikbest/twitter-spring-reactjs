import React, {ComponentType, useState} from "react";
import axios from "axios";

import {User, UserProjection} from "../store/ducks/user/contracts/state";
import {UserApi} from "../services/api/userApi";

export interface HoverUserProps {
    // userProjection?: UserProjection;
    visibleUser?: User;
    visiblePopperWindow?: boolean;
    handleHoverPopper?: () => void;
    // handleHoverPopperProjection? : (userId: number) => void;
    handleHoverPopperWithUser?: (visibleUser: User) => void;
    handleLeavePopper?: () => void;
}

export const withHoverUser = <T extends HoverUserProps>(Component: ComponentType<T>) => (props: T) => {
    const [userProjection, setUserProjection] = useState<UserProjection>();
    const [visibleUser, setVisibleUser] = useState<User | undefined>(undefined);
    const [visiblePopperWindow, setVisiblePopperWindow] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const cancelTokenSource = axios.CancelToken.source();

    const handleHoverPopperWithUser = (visibleUser: User): void => {
        setVisibleUser(visibleUser);
        handleHoverPopper();
    };

    const handleHoverPopperProjection = (userId: number): void => {
        setDelayHandler(setTimeout(() => {
            UserApi.getUserDetails(userId, cancelTokenSource)
                .then(response => {
                    setUserProjection(response);
                });
        }, 777));

        setDelayHandler(setTimeout(() => {
            setVisiblePopperWindow(true);
        }, 1337));
    };

    const handleHoverPopper = (): void => {
        setDelayHandler(setTimeout(() => {
            setVisiblePopperWindow(true);
        }, 1337));
    };

    const handleLeavePopper = (): void => {
        cancelTokenSource.cancel();
        clearTimeout(delayHandler);
        setVisiblePopperWindow(false);
        setVisibleUser(undefined);
    };

    return (
        <Component
            {...props as T}
            // userProjection={userProjection}
            // handleHoverPopperProjection={handleHoverPopperProjection}
            visibleUser={visibleUser}
            visiblePopperWindow={visiblePopperWindow}
            handleHoverPopper={handleHoverPopper}
            handleHoverPopperWithUser={handleHoverPopperWithUser}
            handleLeavePopper={handleLeavePopper}
        />
    );
}

