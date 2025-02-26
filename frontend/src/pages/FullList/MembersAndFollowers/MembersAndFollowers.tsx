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
import { MembersAndFollowersEnum, useListModal } from "../../../hook/useListModal";

const MembersAndFollowers = memo((): ReactElement => {
    const listId = useSelector(selectListItemId);
    const listOwnerId = useSelector(selectListItemOwnerId);
    const membersSize = useSelector(selectListItemMembersSize);
    const followersSize = useSelector(selectListItemFollowersSize);
    const { visibleMembersAndFollowersModal, modalInfo, onOpenModalWindow, onCloseModalWindow } = useListModal();

    return (
        <div>
            <FullListUserCount
                id={"listMembers"}
                userCount={membersSize}
                titleKey={MembersAndFollowersEnum.MEMBERS}
                titleDefaultValue={"Members"}
                onOpenModalWindow={onOpenModalWindow}
            />
            <FullListUserCount
                id={"listFollowers"}
                userCount={followersSize}
                titleKey={MembersAndFollowersEnum.FOLLOWERS}
                titleDefaultValue={"Followers"}
                onOpenModalWindow={onOpenModalWindow}
            />
            <MembersAndFollowersModal
                listId={listId!}
                listOwnerId={listOwnerId!}
                visible={visibleMembersAndFollowersModal}
                modalInfo={modalInfo}
                onClose={onCloseModalWindow}
            />
        </div>
    );
});

export default MembersAndFollowers;
