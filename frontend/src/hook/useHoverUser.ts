import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

import { fetchUserDetail } from "../store/ducks/userDetail/actionCreators";

interface UseHoverUser {
    visiblePopperWindow: boolean;
    handleHoverPopper: (userId: number) => void;
    handleLeavePopper: () => void;
}

export const useHoverUser = (): UseHoverUser => {
    const dispatch = useDispatch();
    const [visiblePopperWindow, setVisiblePopperWindow] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const cancelTokenSource = axios.CancelToken.source();

    const handleHoverPopper = (userId: number): void => {
        setDelayHandler(setTimeout(() => {
            dispatch(fetchUserDetail({ userId, cancelTokenSource }));
        }, 666));

        setDelayHandler(setTimeout(() => {
            setVisiblePopperWindow(true);
        }, 1337));
    };

    const handleLeavePopper = (): void => {
        cancelTokenSource.cancel();
        clearTimeout(delayHandler);
        setVisiblePopperWindow(false);
    };

    return { visiblePopperWindow, handleHoverPopper, handleLeavePopper };
};
