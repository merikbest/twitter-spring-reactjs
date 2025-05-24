import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    fetchListById,
    resetListState
} from "../../store/ducks/list/actionCreators";
import {
    selectIsListLoaded,
    selectIsListLoading,
    selectListItemId,
    selectListItemIsFollower,
    selectListItemName,
    selectListItemOwnerId,
    selectListItemOwnerUsername
} from "../../store/ducks/list/selectors";
import { selectUserDataId } from "../../store/ducks/user/selectors";

export const useFullList = () => {
    const dispatch = useDispatch();
    const params = useParams<{ listId: string }>();
    const myProfileId = useSelector(selectUserDataId);
    const listId = useSelector(selectListItemId);
    const listName = useSelector(selectListItemName);
    const listIsFollower = useSelector(selectListItemIsFollower);
    const listOwnerId = useSelector(selectListItemOwnerId);
    const listOwnerUsername = useSelector(selectListItemOwnerUsername);
    const isListLoading = useSelector(selectIsListLoading);
    const isListLoaded = useSelector(selectIsListLoaded);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchListById(parseInt(params.listId)));

        return () => {
            dispatch(resetListState());
        };
    }, [params.listId]);

    useEffect(() => {
        if (isListLoaded) {
            document.title = `@${listOwnerUsername}/${listName} / Twitter`;
        }
    }, [isListLoaded]);

    return {
        myProfileId,
        listId,
        listName,
        listIsFollower,
        listOwnerId,
        isListLoading
    };
};
