import React, { memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";

import { BlockIcon, UnblockIcon } from "../../../../icons";
import {
    selectUserProfileId,
    selectUserProfileIsUserBlocked,
    selectUserProfileUsername
} from "../../../../store/ducks/userProfile/selectors";
import { processUserToBlocklist } from "../../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../../store/ducks/actionSnackbar/actionCreators";
import BlockUserModal from "../../../../components/BlockUserModal/BlockUserModal";
import { useModalWindow } from "../../../../hook/useModalWindow";

const BlockUserButton = memo((): ReactElement => {
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const isUserBlocked = useSelector(selectUserProfileIsUserBlocked);
    const username = useSelector(selectUserProfileUsername);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({ userId: userProfileId! }));
        onCloseModalWindow();
        dispatch(setOpenSnackBar(`@${username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`));
    };

    return (
        <>
            <ListItem id={"openBlockUserModal"} onClick={onOpenModalWindow}>
                <>{isUserBlocked ? UnblockIcon : BlockIcon}</>
                <Typography component={"span"}>
                    {isUserBlocked ? "Unblock" : "Block"} @{username}
                </Typography>
            </ListItem>
            <BlockUserModal
                username={username!}
                isUserBlocked={isUserBlocked!}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
                onBlockUser={onBlockUser}
            />
        </>
    );
});

export default BlockUserButton;
