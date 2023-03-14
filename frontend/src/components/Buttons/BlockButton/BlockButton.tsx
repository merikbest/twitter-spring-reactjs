import React, { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button/Button";
import classNames from "classnames";

import { useBlockButtonStyles } from "./BlockButtonStyles";
import BlockUserModal from "../../BlockUserModal/BlockUserModal";
import { processUserToBlocklist } from "../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";

interface BlockButtonProps {
    userId: number;
    username: string;
    isUserBlocked: boolean;
    size?: "medium" | "large" | "small";
    isOpenBlockModal?: boolean;
}

const BlockButton: FC<BlockButtonProps> = (
    {
        userId,
        username,
        isUserBlocked,
        size,
        isOpenBlockModal
    }
): ReactElement => {
    const classes = useBlockButtonStyles();
    const dispatch = useDispatch();
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
        dispatch(processUserToBlocklist({ userId }));
        dispatch(setOpenSnackBar(`@${username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`));
        setVisibleBlockUserModal(false);
    };

    return (
        <>
            <Button
                className={classNames(classes.containedButton, classes.blockButton)}
                onClick={isOpenBlockModal ? onOpenBlockUserModal : onBlockUser}
                onMouseOver={() => setBtnText("Unblock")}
                onMouseLeave={() => setBtnText("Blocked")}
                color="primary"
                variant="contained"
                size={size}
            >
                {btnText}
            </Button>
            <BlockUserModal
                username={username}
                isUserBlocked={isUserBlocked}
                visible={visibleBlockUserModal}
                onClose={onCloseBlockUserModal}
                onBlockUser={onBlockUser}
            />
        </>
    );
};

export default BlockButton;
