import React, {FC, memo, ReactElement} from "react";
import {useDispatch} from "react-redux";
import {Button} from "@material-ui/core";

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

    const unblockUser = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(processUserToBlocklist({userId}));
        dispatch(setOpenSnackBar(`@${username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`));
    };

    return (
        <div className={classes.blockButton}>
            <Button onClick={unblockUser} color="primary" variant="contained" size="medium">
                {isUserBlocked ? "Blocked" : "Block"}
            </Button>
        </div>
    );
});

export default BlockAccountButton;
