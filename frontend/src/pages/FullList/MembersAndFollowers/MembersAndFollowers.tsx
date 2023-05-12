import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";

import MembersAndFollowersModal from "../FullListTweets/MembersAndFollowersModal/MembersAndFollowersModal";
import {
    selectListItemFollowersSize,
    selectListItemId,
    selectListItemMembersSize,
    selectListItemOwnerId
} from "../../../store/ducks/list/selectors";
import FullListUserCount from "./FullListUserCount/FullListUserCount";
import { useListModal } from "../../../hook/useListModal";

const MembersAndFollowers = memo((): ReactElement => {
    const listId = useSelector(selectListItemId);
    const listOwnerId = useSelector(selectListItemOwnerId);
    const membersSize = useSelector(selectListItemMembersSize);
    const followersSize = useSelector(selectListItemFollowersSize);
    const { visibleMembersAndFollowersModal, modalWindowTitle, onOpenModalWindow, onCloseModalWindow } = useListModal();

    return (
        <div>
            <FullListUserCount
                id={"listMembers"}
                userCount={membersSize}
                title={"members"}
                onOpenModalWindow={onOpenModalWindow}
            />
            <FullListUserCount
                id={"listFollowers"}
                userCount={followersSize}
                title={"followers"}
                onOpenModalWindow={onOpenModalWindow}
            />
            <MembersAndFollowersModal
                listId={listId!}
                listOwnerId={listOwnerId!}
                visible={visibleMembersAndFollowersModal}
                title={modalWindowTitle}
                onClose={onCloseModalWindow}
            />
        </div>
    );
});

export default MembersAndFollowers;
