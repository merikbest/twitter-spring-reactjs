import React, { memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import { processUserToMuteList } from "../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import {
    selectUserProfileId,
    selectUserProfileIsUserMuted,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

const UserUnmuteMessage = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isUserMuted = useSelector(selectUserProfileIsUserMuted);

    const onMuteUser = (): void => {
        dispatch(processUserToMuteList({ userId: userProfileId! }));
        dispatch(setOpenSnackBar(`@${username} has been ${isUserMuted ? "unmuted" : "muted"}.`));
    };

    return (
        <>
            {userProfileId && (
                isUserMuted && (
                    <Typography variant={"subtitle1"} component={"div"} className={classes.description}>
                        {"You have muted Tweets from this account. "}
                        <Typography
                            id={"unmuteUser"}
                            className={classes.unfollowLink}
                            onClick={onMuteUser}
                            variant={"subtitle1"}
                            component={"span"}
                        >
                            Unmute
                        </Typography>
                    </Typography>
                )
            )}
        </>
    );
});

export default UserUnmuteMessage;
