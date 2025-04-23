import React, { FC, memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { BlockIcon, UnblockIcon } from "../../../icons";
import BlockUserModal from "../../BlockUserModal/BlockUserModal";
import { processUserToBlocklist } from "../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import { useModalWindow } from "../../../hook/useModalWindow";
import {
    selectTweetInfoUserId,
    selectTweetInfoUserIsUserBlocked,
    selectTweetInfoUserUsername
} from "../../../store/ducks/tweetAdditionalInfo/selectors";

interface BlockUserButtonProps {
    tweetId: number;
}

const BlockUserButton: FC<BlockUserButtonProps> = memo(({ tweetId }): ReactElement => {
    const dispatch = useDispatch();
    const userId = useSelector(selectTweetInfoUserId);
    const username = useSelector(selectTweetInfoUserUsername);
    const isUserBlocked = useSelector(selectTweetInfoUserIsUserBlocked);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({ userId: userId!, tweetId }));
        dispatch(setOpenSnackBar(isUserBlocked
            ? t("UNBLOCK_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been unblocked.` })
            : t("BLOCK_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been blocked.` })));
        onCloseModalWindow();
    };

    return (
        <>
            <ListItem id="onOpenBlockUserModal" onClick={onOpenModalWindow}>
                <>{isUserBlocked ? UnblockIcon : BlockIcon}</>
                <Typography variant="body1" component="span">
                    {isUserBlocked
                        ? t("UNBLOCK_USER", { username, defaultValue: `Unblock @${username}` })
                        : t("BLOCK_USER", { username, defaultValue: `Block @${username}` })}
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
