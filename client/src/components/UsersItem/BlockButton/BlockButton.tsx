import React, {FC, ReactElement, useState} from "react";
import Button from "@material-ui/core/Button/Button";
import classNames from "classnames";
import {useDispatch} from "react-redux";

import {useBlockButtonStyles} from "./BlockButtonStyles";
import BlockUserModal from "../../BlockUserModal/BlockUserModal";
import {processUserToBlocklist} from "../../../store/ducks/user/actionCreators";
import {UserResponse} from "../../../store/types/user";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";
import {useSnackbar} from "../../../hook/useSnackbar";

interface BlockButtonProps {
    user?: UserResponse
}

const BlockButton: FC<BlockButtonProps> = ({user}): ReactElement => {
    const classes = useBlockButtonStyles();
    const dispatch = useDispatch();
    const {snackBarMessage, openSnackBar, setSnackBarMessage, setOpenSnackBar, onCloseSnackBar} = useSnackbar();
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);
    const [btnText, setBtnText] = useState<string>("Blocked");

    const onOpenBlockUserModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setVisibleBlockUserModal(true);
    };

    const onCloseBlockUserModal = (): void => {
        setVisibleBlockUserModal(false);
    };

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({userId: user?.id!}));
        setVisibleBlockUserModal(false);
        setSnackBarMessage(`@${user?.username} has been ${user?.isUserBlocked ? "unblocked" : "blocked"}.`);
        setOpenSnackBar(true);
    };

    return (
        <>
            <Button
                className={classNames(classes.containedButton, classes.blockButton)}
                onClick={onOpenBlockUserModal}
                onMouseOver={() => setBtnText("Unblock")}
                onMouseLeave={() => setBtnText("Blocked")}
                color="primary"
                variant="contained"
                size="small"
            >
                {btnText}
            </Button>
            <BlockUserModal
                username={user?.username!}
                isUserBlocked={user?.isUserBlocked!}
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
};

export default BlockButton;
