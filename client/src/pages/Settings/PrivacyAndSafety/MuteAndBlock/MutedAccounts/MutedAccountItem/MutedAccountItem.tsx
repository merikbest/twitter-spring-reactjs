import React, {ComponentType, FC, ReactElement} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {compose} from "recompose";
import {Link} from "react-router-dom";
import {Avatar, IconButton, Paper, Typography} from "@material-ui/core";

import {useMutedAccountItemStyles} from "./MutedAccountItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../../../../util/url";
import {selectUserData} from "../../../../../../store/ducks/user/selectors";
import {User} from "../../../../../../store/ducks/user/contracts/state";
import {MuteIcon, UnmuteIcon} from "../../../../../../icons";
import {addUserToMuteList} from "../../../../../../store/ducks/user/actionCreators";
import HoverAction from "../../../../../../components/HoverAction/HoverAction";
import ActionSnackbar from "../../../../../../components/ActionSnackbar/ActionSnackbar";
import {SnackbarProps, withSnackbar} from "../../../../../../hoc/withSnackbar";
import {HoverActionProps, HoverActions, withHoverAction} from "../../../../../../hoc/withHoverAction";

interface MutedAccountItemProps {
    mutedUser?: User;
}

const MutedAccountItem: FC<MutedAccountItemProps & SnackbarProps & HoverActionProps> = (
    {
        mutedUser,
        snackBarMessage,
        openSnackBar,
        setSnackBarMessage,
        setOpenSnackBar,
        onCloseSnackBar,
        visibleHoverAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement => {
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isUserMuted = myProfile?.userMutedList?.findIndex(user => user.id === mutedUser?.id) !== -1;
    const classes = useMutedAccountItemStyles({isUserMuted});

    const unmuteUser = (): void => {
        dispatch(addUserToMuteList(mutedUser?.id!));
        setSnackBarMessage!(`@${mutedUser?.username} has been ${isUserMuted ? "unmuted" : "muted"}.`);
        setOpenSnackBar!(true);
    };

    return (
        <Paper className={classes.container}>
            <Link to={`/user/${mutedUser?.id}`} className={classes.link}>
                <Avatar
                    className={classes.listAvatar}
                    src={mutedUser?.avatar?.src ? mutedUser?.avatar.src : DEFAULT_PROFILE_IMG}
                />
            </Link>
            <div style={{flex: 1}}>
                <div className={classes.userInfoWrapper}>
                    <Link to={`/user/${mutedUser?.id}`} className={classes.link}>
                        <div className={classes.userInfo}>
                            <div>
                                <Typography component={"span"} className={classes.fullName}>
                                    {mutedUser?.fullName}
                                </Typography>
                            </div>
                            <Typography component={"div"} className={classes.username}>
                                @{mutedUser?.username}
                            </Typography>
                        </div>
                    </Link>
                    <div className={classes.muteButton}>
                        <IconButton
                            onClick={unmuteUser}
                            onMouseEnter={() => handleHoverAction?.(HoverActions.OTHER)}
                            onMouseLeave={handleLeaveAction}
                            color="primary"
                        >
                            {isUserMuted ? MuteIcon : UnmuteIcon}
                            <HoverAction visible={visibleHoverAction?.visibleOtherAction} actionText={isUserMuted ? "Unmute" : "Mute"}/>
                        </IconButton>
                    </div>
                </div>
                <Typography display="block">
                    {mutedUser?.about}
                </Typography>
            </div>
            <ActionSnackbar
                snackBarMessage={snackBarMessage!}
                openSnackBar={openSnackBar!}
                onCloseSnackBar={onCloseSnackBar!}
            />
        </Paper>
    );
};

export default compose(withSnackbar, withHoverAction)(MutedAccountItem) as ComponentType<SnackbarProps & HoverActionProps & MutedAccountItemProps>;
