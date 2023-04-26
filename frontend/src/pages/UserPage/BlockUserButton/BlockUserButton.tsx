import React, { memo, ReactElement, useState } from "react";
import classnames from "classnames";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

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
    const [btnText, setBtnText] = useState<string>("Blocked");
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({ userId: userProfileId! }));
        onCloseModalWindow();
        setBtnText(isUserBlocked ? "Following" : "Blocked");
        dispatch(setOpenSnackBar(`@${username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`));
    };

    return (
        <>
            <Button
                className={classnames(classes.primaryButton, classes.blockButton)}
                onClick={onOpenModalWindow}
                onMouseOver={() => setBtnText("Unblock")}
                onMouseLeave={() => setBtnText("Blocked")}
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
