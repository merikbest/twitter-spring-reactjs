import React, {ComponentType, FC, ReactElement} from 'react';
import {useDispatch} from "react-redux";
import {compose} from "recompose";
import {Link} from "react-router-dom";
import {Avatar, IconButton, Paper, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useMutedAccountItemStyles} from "./MutedAccountItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../../../../util/url";
import {MuteIcon, UnmuteIcon} from "../../../../../../icons";
import {processUserToMuteList} from "../../../../../../store/ducks/user/actionCreators";
import HoverAction from "../../../../../../components/HoverAction/HoverAction";
import ActionSnackbar from "../../../../../../components/ActionSnackbar/ActionSnackbar";
import {SnackbarProps, withSnackbar} from "../../../../../../hoc/withSnackbar";
import {HoverActionProps, HoverActions, withHoverAction} from "../../../../../../hoc/withHoverAction";
import {useGlobalStyles} from "../../../../../../util/globalClasses";
import {MutedUserResponse} from "../../../../../../store/types/user";

interface MutedAccountItemProps {
    mutedUser?: MutedUserResponse;
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
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const classes = useMutedAccountItemStyles({isUserMuted: mutedUser?.isUserMuted!});

    const unmuteUser = (): void => {
        dispatch(processUserToMuteList({userId: mutedUser?.id!}));
        setSnackBarMessage!(`@${mutedUser?.username} has been ${mutedUser?.isUserMuted ? "unmuted" : "muted"}.`);
        setOpenSnackBar!(true);
    };

    return (
        <Paper className={classes.container}>
            <Link to={`/profile/${mutedUser?.id}`}>
                <Avatar
                    className={classnames(classes.listAvatar, globalClasses.avatar)}
                    src={mutedUser?.avatar?.src ? mutedUser?.avatar.src : DEFAULT_PROFILE_IMG}
                />
            </Link>
            <div style={{flex: 1}}>
                <div className={classes.userInfoWrapper}>
                    <Link to={`/profile/${mutedUser?.id}`} className={globalClasses.link}>
                        <div className={classes.userInfo}>
                            <div>
                                <Typography variant={"h6"} component={"span"}>
                                    {mutedUser?.fullName}
                                </Typography>
                            </div>
                            <Typography variant={"subtitle1"} component={"div"}>
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
                            {mutedUser?.isUserMuted ? MuteIcon : UnmuteIcon}
                            <HoverAction visible={visibleHoverAction?.visibleOtherAction} actionText={mutedUser?.isUserMuted ? "Unmute" : "Mute"}/>
                        </IconButton>
                    </div>
                </div>
                <Typography variant={"body1"} component={"div"}>
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
