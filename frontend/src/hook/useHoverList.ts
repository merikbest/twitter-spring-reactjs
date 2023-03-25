import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

import { fetchListDetail } from "../store/ducks/listDetail/actionCreators";
import { HOVER_DELAY_FETCH, HOVER_DELAY_SHOW } from "../constants/common-constants";

interface UseHoverList {
    visiblePopperWindow: boolean;
    handleHoverPopper: (listId: number) => void;
    handleLeavePopper: () => void;
}

export const useHoverList = (): UseHoverList => {
    const dispatch = useDispatch();
    const [visiblePopperWindow, setVisiblePopperWindow] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const cancelTokenSource = axios.CancelToken.source();

    const handleHoverPopper = (listId: number): void => {
        setDelayHandler(setTimeout(() => {
            dispatch(fetchListDetail({ listId, cancelTokenSource }));
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
