import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { followList } from "../../../../store/ducks/lists/actionCreators";
import { selectListDetailItemId } from "../../../../store/ducks/listDetail/selectors";

export const useFollowListButton = () => {
    const dispatch = useDispatch();
    const listId = useSelector(selectListDetailItemId);

    const handleFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(followList(listId!));
    };

    return { handleFollow };
};
