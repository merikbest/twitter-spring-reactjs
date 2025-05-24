import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchListFollowers,
    fetchListMembers,
    resetListMembersState
} from "../../../../store/ducks/listMembers/actionCreators";
import { selectIsListMembersLoading, selectListMembersItems } from "../../../../store/ducks/listMembers/selectors";
import { MembersAndFollowersEnum } from "../../../../hook/useListModal";

export const useMembersAndFollowersModal = (listId: number, listOwnerId: number, visible: boolean, modalType: string) => {
    const dispatch = useDispatch();
    const users = useSelector(selectListMembersItems);
    const isLoading = useSelector(selectIsListMembersLoading);

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

    useEffect(() => {
        if (visible) {
            if (modalType === MembersAndFollowersEnum.MEMBERS) {
                dispatch(fetchListMembers({ listId, listOwnerId }));
            }
            if (modalType === MembersAndFollowersEnum.FOLLOWERS) {
                dispatch(fetchListFollowers({ listId, listOwnerId }));
            }
        }
        return () => {
            dispatch(resetListMembersState());
        };
    }, [visible, modalType, listId, listOwnerId, dispatch]);

    return { users, isLoading, handleClick };
};
