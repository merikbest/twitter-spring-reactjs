import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

import { HOVER_DELAY_FETCH, HOVER_DELAY_SHOW } from "../constants/common-constants";
import { FetchUserDetailActionInterface } from "../store/ducks/userDetail/contracts/actionTypes";
import { FetchListDetailActionInterface } from "../store/ducks/listDetail/contracts/actionTypes";
import { UserDetailsRequest } from "../store/ducks/userDetail/contracts/state";
import { ListDetailsRequest } from "../store/ducks/listDetail/contracts/state";

export type HoverItemDetail = {
    [key in "userId" | "listId"]: number
};

interface UseHoverItem {
    visiblePopperWindow: boolean;
    handleHoverPopper: (detail: HoverItemDetail) => void;
    handleLeavePopper: () => void;
}

export const useHoverItem = (
    fetchDetail: ((payload: UserDetailsRequest) => FetchUserDetailActionInterface)
        | ((payload: ListDetailsRequest) => FetchListDetailActionInterface)
): UseHoverItem => {
    const dispatch = useDispatch();
    const [visiblePopperWindow, setVisiblePopperWindow] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const cancelTokenSource = axios.CancelToken.source();

    const handleHoverPopper = (detail: HoverItemDetail): void => {
        setDelayHandler(setTimeout(() => {
            dispatch(fetchDetail({ ...detail, cancelTokenSource }));
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
