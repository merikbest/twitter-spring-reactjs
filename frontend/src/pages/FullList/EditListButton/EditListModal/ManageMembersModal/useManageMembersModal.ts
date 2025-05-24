import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectListItem } from "../../../../../store/ducks/list/selectors";
import {
    selectIsListMembersLoading,
    selectListMembersItems,
    selectListSuggestedItems
} from "../../../../../store/ducks/listMembers/selectors";
import {
    fetchListMembers,
    fetchListMembersByUsername,
    resetListMembersState,
    resetListSuggested
} from "../../../../../store/ducks/listMembers/actionCreators";
import { useModalWindow } from "../../../../../hook/useModalWindow";

export const useManageMembersModal = () => {
    const dispatch = useDispatch();
    const list = useSelector(selectListItem);
    const members = useSelector(selectListMembersItems);
    const suggested = useSelector(selectListSuggestedItems);
    const isMembersLoading = useSelector(selectIsListMembersLoading);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);

        if (newValue === 0) {
            setSearchText("");
            dispatch(resetListSuggested());
            dispatch(fetchListMembers({ listId: list?.id!, listOwnerId: list?.listOwner.id! }));
        }
    };

    const onSearch = (text: string): void => {
        if (text) {
            setSearchText(text);
            dispatch(fetchListMembersByUsername({ listId: list?.id!, username: encodeURIComponent(text) }));
        } else {
            setSearchText("");
            dispatch(resetListSuggested());
        }
    };

    useEffect(() => {
        if (visibleModalWindow) {
            dispatch(fetchListMembers({ listId: list?.id!, listOwnerId: list?.listOwner.id! }));
        }

        return () => {
            dispatch(resetListMembersState());
            dispatch(resetListSuggested());
        };
    }, [visibleModalWindow]);

    return {
        list,
        members,
        suggested,
        isMembersLoading,
        activeTab,
        searchText,
        visibleModalWindow,
        onOpenModalWindow,
        onCloseModalWindow,
        handleChangeTab,
        onSearch
    };
};
