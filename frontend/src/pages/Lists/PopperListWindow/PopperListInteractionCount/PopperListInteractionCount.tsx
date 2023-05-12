import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import {
    selectListDetailItemFollowersSize,
    selectListDetailItemId,
    selectListDetailItemMembersSize,
    selectListDetailItemOwnerId
} from "../../../../store/ducks/listDetail/selectors";
import MembersAndFollowersModal
    from "../../../FullList/FullListTweets/MembersAndFollowersModal/MembersAndFollowersModal";
import { useListModal } from "../../../../hook/useListModal";
import PopperListUserCount from "./PopperListUserCount/PopperListUserCount";

const PopperListInteractionCount = memo((): ReactElement => {
    const listId = useSelector(selectListDetailItemId);
    const listOwnerId = useSelector(selectListDetailItemOwnerId);
    const membersSize = useSelector(selectListDetailItemMembersSize);
    const followersSize = useSelector(selectListDetailItemFollowersSize);
    const { visibleMembersAndFollowersModal, modalWindowTitle, onOpenModalWindow, onCloseModalWindow } = useListModal();

    return (
        <div>
            <PopperListUserCount
                id={"openMembersModalWindow"}
                userCount={membersSize}
                title={"members"}
                onOpenModalWindow={onOpenModalWindow}
            />
            <PopperListUserCount
                id={"openFollowersModalWindow"}
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

export default PopperListInteractionCount;
