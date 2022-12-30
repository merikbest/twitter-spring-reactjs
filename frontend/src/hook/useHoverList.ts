import {useDispatch} from "react-redux";
import {useState} from "react";
import axios from "axios";

import {fetchListDetail} from "../store/ducks/listDetail/actionCreators";

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
            dispatch(fetchListDetail({listId, cancelTokenSource}));
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

    return {visiblePopperWindow, handleHoverPopper, handleLeavePopper};
};
