import React, {ComponentType, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";

import {fetchUserDetail} from "../store/ducks/userDetail/actionCreators";

export interface HoverUserProps {
    visiblePopperWindow?: boolean;
    handleHoverPopper?: (userId: number) => void;
    handleLeavePopper?: () => void;
}

export const withHoverUser = <T extends HoverUserProps>(Component: ComponentType<T>) => (props: T) => {
    const dispatch = useDispatch();
    const [visiblePopperWindow, setVisiblePopperWindow] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const cancelTokenSource = axios.CancelToken.source();

    const handleHoverPopper = (userId: number): void => {
        setDelayHandler(setTimeout(() => {
            dispatch(fetchUserDetail({userId, cancelTokenSource}));
        }, 1000));

        setDelayHandler(setTimeout(() => {
            setVisiblePopperWindow(true);
        }, 1337));
    };

    const handleLeavePopper = (): void => {
        cancelTokenSource.cancel();
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

