import React, {FC, memo, ReactElement, useState} from "react";
import {useDispatch} from "react-redux";
import {ListItem, Typography} from "@material-ui/core";

import {BlockIcon, UnblockIcon} from "../../../icons";
import BlockUserModal from "../../BlockUserModal/BlockUserModal";
import {processUserToBlocklist} from "../../../store/ducks/user/actionCreators";
import {useSnackbar} from "../../../hook/useSnackbar";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";

interface BlockUserButtonProps {
    tweetId: number;
    userId: number;
    username: string;
    isUserBlocked: boolean;
}

const BlockUserButton: FC<BlockUserButtonProps> = memo((
    {
        tweetId,
        userId,
        username,
        isUserBlocked,
    }
): ReactElement => {
    const dispatch = useDispatch();
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);
    const {snackBarMessage, openSnackBar, setSnackBarMessage, setOpenSnackBar, onCloseSnackBar} = useSnackbar();

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({userId, tweetId}));
        setVisibleBlockUserModal(false);
        setSnackBarMessage(`@${username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`);
        setOpenSnackBar(true);
    };

    const onOpenBlockUserModal = (): void => {
        setVisibleBlockUserModal(true);
    };

    const onCloseBlockUserModal = (): void => {
        setVisibleBlockUserModal(false);
    };

    return (
        <>
            <ListItem id={"onOpenBlockUserModal"} onClick={onOpenBlockUserModal}>
                <>{isUserBlocked ? UnblockIcon : BlockIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    {isUserBlocked ? "Unblock" : "Block"} @{username}
                </Typography>
            </ListItem>
            <BlockUserModal
                username={username}
                isUserBlocked={isUserBlocked}
                visible={visibleBlockUserModal}
                onClose={onCloseBlockUserModal}
                onBlockUser={onBlockUser}
            />
            <ActionSnackbar
                snackBarMessage={snackBarMessage}
                openSnackBar={openSnackBar}
                onCloseSnackBar={onCloseSnackBar}
            />
        </>
    );
});

export default BlockUserButton;
