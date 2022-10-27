import React, {FC, ReactElement} from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Avatar, Paper, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useMutedAccountItemStyles} from "./MutedAccountItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../../../../util/url";
import {MuteIcon, UnmuteIcon} from "../../../../../../icons";
import {processUserToMuteList} from "../../../../../../store/ducks/user/actionCreators";
import {useGlobalStyles} from "../../../../../../util/globalClasses";
import {MutedUserResponse} from "../../../../../../store/types/user";
import {PROFILE} from "../../../../../../util/pathConstants";
import {setOpenSnackBar} from "../../../../../../store/ducks/actionSnackbar/actionCreators";
import ActionIconButton from "../../../../../../components/ActionIconButton/ActionIconButton";

interface MutedAccountItemProps {
    mutedUser?: MutedUserResponse;
}

const MutedAccountItem: FC<MutedAccountItemProps> = ({mutedUser}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const classes = useMutedAccountItemStyles({isUserMuted: mutedUser?.isUserMuted!});
    const avatar = mutedUser?.avatar?.src ? mutedUser?.avatar.src : DEFAULT_PROFILE_IMG;

    const unmuteUser = (): void => {
        dispatch(processUserToMuteList({userId: mutedUser?.id!}));
        dispatch(setOpenSnackBar(`@${mutedUser?.username} has been ${mutedUser?.isUserMuted ? "unmuted" : "muted"}.`))
    };

    return (
        <Paper className={classes.container}>
            <Link to={`${PROFILE}/${mutedUser?.id}`}>
                <Avatar className={classnames(classes.listAvatar, globalClasses.avatar)} src={avatar} alt={avatar}/>
            </Link>
            <div style={{flex: 1}}>
                <div className={classes.userInfoWrapper}>
                    <Link to={`${PROFILE}/${mutedUser?.id}`} className={globalClasses.link}>
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
                        <ActionIconButton
                            onClick={unmuteUser}
                            actionText={mutedUser?.isUserMuted ? "Unmute" : "Mute"}
                            icon={mutedUser?.isUserMuted ? MuteIcon : UnmuteIcon}
                        />
                    </div>
                </div>
                <Typography variant={"body1"} component={"div"}>
                    {mutedUser?.about}
                </Typography>
            </div>
        </Paper>
    );
};

export default MutedAccountItem;
