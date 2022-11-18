import React, {memo, ReactElement, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ListItem, Typography} from "@material-ui/core";

import {BlockIcon, UnblockIcon} from "../../../../icons";
import {
    selectUserProfileId,
    selectUserProfileIsUserBlocked,
    selectUserProfileUsername
} from "../../../../store/ducks/userProfile/selectors";
import {processUserToBlocklist} from "../../../../store/ducks/user/actionCreators";
import {setOpenSnackBar} from "../../../../store/ducks/actionSnackbar/actionCreators";
import BlockUserModal from "../../../../components/BlockUserModal/BlockUserModal";

const BlockUserButton = memo((): ReactElement => {
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const isUserBlocked = useSelector(selectUserProfileIsUserBlocked);
    const username = useSelector(selectUserProfileUsername);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);

    const onOpenBlockUserModal = (): void => {
        setVisibleBlockUserModal(true);
    };

    const onCloseBlockUserModal = (): void => {
        setVisibleBlockUserModal(false);
    };

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({userId: userProfileId!}));
        setVisibleBlockUserModal(false);
        dispatch(setOpenSnackBar(`@${username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`));
    };

    return (
        <>
            <ListItem id={"openBlockUserModal"} onClick={onOpenBlockUserModal}>
                <>{isUserBlocked ? UnblockIcon : BlockIcon}</>
                <Typography component={"span"}>
                    {isUserBlocked ? "Unblock" : "Block"} @{username}
                </Typography>
            </ListItem>
            <BlockUserModal
                username={username!}
                isUserBlocked={isUserBlocked!}
                visible={visibleBlockUserModal}
                onClose={onCloseBlockUserModal}
                onBlockUser={onBlockUser}
            />
        </>
    );
});

export default BlockUserButton;
