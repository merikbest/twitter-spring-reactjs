import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { pinList, unpinList } from "../../../store/ducks/lists/actionCreators";
import { ListResponse, ListUserResponse } from "../../../types/lists";

export const useListsItem = (list?: ListResponse | ListUserResponse) => {
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);

    const onClickPinList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (list?.isListPinned) {
            dispatch(unpinList(list!.id));
        } else {
            dispatch(pinList(list!.id));
        }
    };

    return { myProfileId, onClickPinList };
};
