import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

import { fetchUserDetail } from "../store/ducks/userDetail/actionCreators";
import { HOVER_DELAY_FETCH, HOVER_DELAY_SHOW } from "../constants/common-constants";

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
        }, HOVER_DELAY_FETCH));

        setDelayHandler(setTimeout(() => {
            setVisiblePopperWindow(true);
        }, HOVER_DELAY_SHOW));
    };

    const handleLeavePopper = (): void => {
        cancelTokenSource.cancel();
        clearTimeout(delayHandler);
        setVisiblePopperWindow(false);
    };

    return { visiblePopperWindow, handleHoverPopper, handleLeavePopper };
};
