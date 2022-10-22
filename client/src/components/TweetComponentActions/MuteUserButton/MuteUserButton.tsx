import React, {FC, memo, ReactElement} from "react";
import {useDispatch} from "react-redux";
import {ListItem, Typography} from "@material-ui/core";

import {MuteIcon, UnmuteIcon} from "../../../icons";
import {processUserToMuteList} from "../../../store/ducks/user/actionCreators";
import {useSnackbar} from "../../../hook/useSnackbar";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";

interface MuteUserButtonProps {
    tweetId: number;
    userId: number;
    username: string;
    isUserMuted: boolean;
}

const MuteUserButton: FC<MuteUserButtonProps> = memo((
    {
        tweetId,
        userId,
        username,
        isUserMuted,
    }
): ReactElement => {
    const dispatch = useDispatch();
    const {snackBarMessage, openSnackBar, setSnackBarMessage, setOpenSnackBar, onCloseSnackBar} = useSnackbar();

    const onMuteUser = (): void => {
        dispatch(processUserToMuteList({userId, tweetId}));
        setSnackBarMessage(`@${username} has been ${isUserMuted ? "unmuted" : "muted"}.`);
        setOpenSnackBar(true);
    };

    return (
        <>
            <ListItem id={"onMuteUser"} onClick={onMuteUser}>
                <>{isUserMuted ? UnmuteIcon : MuteIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    {isUserMuted ? "Unmute" : "Mute"} @{username}
                </Typography>
            </ListItem>
            <ActionSnackbar
                snackBarMessage={snackBarMessage}
                openSnackBar={openSnackBar}
                onCloseSnackBar={onCloseSnackBar}
            />
        </>
    );
});

export default MuteUserButton;
