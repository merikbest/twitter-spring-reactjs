import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";

import { BlockIcon, UnblockIcon } from "../../../icons";
import BlockUserModal from "../../BlockUserModal/BlockUserModal";
import { processUserToBlocklist } from "../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import { useModalWindow } from "../../../hook/useModalWindow";

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
        isUserBlocked
    }
): ReactElement => {
    const dispatch = useDispatch();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({ userId, tweetId }));
        dispatch(setOpenSnackBar(`@${username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`));
        onCloseModalWindow();
    };

    return (
        <>
            <ListItem id={"onOpenBlockUserModal"} onClick={onOpenModalWindow}>
                <>{isUserBlocked ? UnblockIcon : BlockIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    {isUserBlocked ? "Unblock" : "Block"} @{username}
                </Typography>
            </ListItem>
            <BlockUserModal
                username={username}
                isUserBlocked={isUserBlocked}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
                onBlockUser={onBlockUser}
            />
        </>
    );
});

export default BlockUserButton;
