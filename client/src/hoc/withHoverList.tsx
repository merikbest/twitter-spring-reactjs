import React, {ComponentType, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";

import {fetchListDetail} from "../store/ducks/listDetail/actionCreators";

export interface HoverListProps {
    visiblePopperWindow?: boolean;
    handleHoverPopper?: (listId: number) => void;
    handleLeavePopper?: () => void;
}

export const withHoverList = <T extends HoverListProps>(Component: ComponentType<T>) => (props: T) => {
    const dispatch = useDispatch();
    const [visiblePopperWindow, setVisiblePopperWindow] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const cancelTokenSource = axios.CancelToken.source();

    const handleHoverPopper = (listId: number): void => {
        setDelayHandler(setTimeout(() => {
            dispatch(fetchListDetail({listId, cancelTokenSource}));
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
};
