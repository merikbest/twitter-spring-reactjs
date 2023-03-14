import React, { memo, ReactElement, useState } from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import { useMembersAndFollowersStyles } from "./MembersAndFollowersStyles";
import MembersAndFollowersModal from "../FullListTweets/MembersAndFollowersModal/MembersAndFollowersModal";
import {
    selectListItemFollowersSize,
    selectListItemId,
    selectListItemMembersSize,
    selectListItemOwnerId
} from "../../../store/ducks/list/selectors";

const MembersAndFollowers = memo((): ReactElement => {
    const classes = useMembersAndFollowersStyles();
    const listId = useSelector(selectListItemId);
    const listOwnerId = useSelector(selectListItemOwnerId);
    const membersSize = useSelector(selectListItemMembersSize);
    const followersSize = useSelector(selectListItemFollowersSize);
    const [visibleMembersAndFollowersModal, setVisibleMembersAndFollowersModal] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");

    const onOpenMembersModalWindow = (): void => {
        setVisibleMembersAndFollowersModal(true);
        setModalWindowTitle("List members");
    };

    const onOpenFollowersModalWindow = (): void => {
        setVisibleMembersAndFollowersModal(true);
        setModalWindowTitle("List followers");
    };

    const onCloseModalWindow = (): void => {
        setVisibleMembersAndFollowersModal(false);
        setModalWindowTitle("");
    };

    return (
        <div>
            <span id={"listMembers"} onClick={onOpenMembersModalWindow} className={classes.listMembers}>
                <Typography variant={"h6"} component={"span"}>
                    {membersSize}
                </Typography>
                <Typography variant={"subtitle1"} component={"span"}>
                    {" Members"}
                </Typography>
            </span>
            <span id={"listFollowers"} onClick={onOpenFollowersModalWindow} className={classes.listMembers}>
                <Typography variant={"h6"} component={"span"}>
                    {followersSize}
                </Typography>
                <Typography variant={"subtitle1"} component={"span"}>
                    {" Followers"}
                </Typography>
           </span>
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
