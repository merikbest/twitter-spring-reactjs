import React, { FC, memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";

import { MuteIcon, UnmuteIcon } from "../../../../icons";
import { processUserToMuteList } from "../../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../../store/ducks/actionSnackbar/actionCreators";
import {
    selectUserProfileId,
    selectUserProfileIsUserMuted,
    selectUserProfileUsername
} from "../../../../store/ducks/userProfile/selectors";

interface MuteUserButtonProps {
    onCloseUserPageActions: () => void;
}

const MuteUserButton: FC<MuteUserButtonProps> = memo(({ onCloseUserPageActions }): ReactElement => {
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isUserMuted = useSelector(selectUserProfileIsUserMuted);

    const handleMuteUser = (): void => {
        dispatch(processUserToMuteList({ userId: userProfileId! }));
        dispatch(setOpenSnackBar(`@${username} has been ${isUserMuted ? "unmuted" : "muted"}.`));
        onCloseUserPageActions();
    };

    return (
        <ListItem id={"handleMuteUser"} onClick={handleMuteUser}>
            <>{isUserMuted ? UnmuteIcon : MuteIcon}</>
            <Typography component={"span"}>
                {isUserMuted ? "Unmute" : "Mute"} @{username}
            </Typography>
        </ListItem>
    );
});

export default MuteUserButton;
