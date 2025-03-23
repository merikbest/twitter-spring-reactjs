import React, { memo, ReactElement, useState } from "react";
import classnames from "classnames";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import BlockUserModal from "../../../components/BlockUserModal/BlockUserModal";
import {
    selectUserProfileId,
    selectUserProfileIsUserBlocked,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";
import { processUserToBlocklist } from "../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import { useUserPageStyles } from "../UserPageStyles";
import { useModalWindow } from "../../../hook/useModalWindow";

const BlockUserButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isUserBlocked = useSelector(selectUserProfileIsUserBlocked);
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState<string>(t("BLOCKED", { defaultValue: "Blocked" }));
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({ userId: userProfileId! }));
        onCloseModalWindow();
        setBtnText(isUserBlocked
            ? t("FOLLOWING", { defaultValue: "Following" })
            : t("BLOCKED", { defaultValue: "Blocked" }));
        dispatch(setOpenSnackBar(isUserBlocked
            ? t("UNBLOCK_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been unblocked` })
            : t("BLOCK_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been blocked` })));
    };

    return (
        <>
            <Button
                className={classnames(classes.primaryButton, classes.blockButton)}
                onClick={onOpenModalWindow}
                onMouseOver={() => setBtnText(t("UNBLOCK", { defaultValue: "Unblock" }))}
                onMouseLeave={() => setBtnText(t("BLOCKED", { defaultValue: "Blocked" }))}
                color="primary"
                variant="contained"
                size="large"
            >
                {btnText}
            </Button>
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
