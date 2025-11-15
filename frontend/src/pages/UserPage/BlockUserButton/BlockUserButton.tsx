import React, { memo, ReactElement } from "react";
import classnames from "classnames";
import { Button } from "@material-ui/core";

import BlockUserModal from "../../../components/BlockUserModal/BlockUserModal";
import { useUserPageStyles } from "../UserPageStyles";
import { useBlockUserButton } from "./useBlockUserButton";
import { useModalWindow } from "../../../hook/useModalWindow";

const BlockUserButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const {
        btnText,
        username,
        isUserBlocked,
        onBlockUser,
        onMouseOver,
        onMouseLeave
    } = useBlockUserButton(onCloseModalWindow);

    return (
        <>
            <Button
                className={classnames(classes.primaryButton, classes.blockButton)}
                onClick={onOpenModalWindow}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
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
