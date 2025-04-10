import React, {FC, memo, ReactElement} from "react";
import {useDispatch} from "react-redux";
import {Button} from "@material-ui/core";
import { useTranslation } from "react-i18next";

import {processUserToBlocklist} from "../../../../../../../store/ducks/user/actionCreators";
import {setOpenSnackBar} from "../../../../../../../store/ducks/actionSnackbar/actionCreators";
import {useBlockAccountButtonStyles} from "./BlockAccountButtonStyles";

interface BlockAccountButtonProps {
    userId: number;
    username: string;
    isUserBlocked: boolean;
}

const BlockAccountButton: FC<BlockAccountButtonProps> = memo(({userId, username, isUserBlocked}): ReactElement => {
    const classes = useBlockAccountButtonStyles({isUserBlocked})
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const unblockUser = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(processUserToBlocklist({userId}));
        dispatch(setOpenSnackBar(isUserBlocked
            ? t("UNBLOCK_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been unblocked` })
            : t("BLOCK_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been blocked` })));
    };

    return (
        <div className={classes.blockButton}>
            <Button onClick={unblockUser} color="primary" variant="contained" size="medium">
                {isUserBlocked
                    ? t("BLOCKED", { defaultValue: "Blocked" })
                    : t("BLOCK", { defaultValue: "Block" })}
            </Button>
        </div>
    );
});

export default BlockAccountButton;
