import React, {FC, ReactElement} from 'react';

import {useMutedNotificationsStyles} from "./MutedNotificationsStyles";
import {Checkbox, Typography} from "@material-ui/core";

const MutedNotifications: FC = (): ReactElement => {
    const classes = useMutedNotificationsStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Mute notifications from people:
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        You don’t follow
                    </Typography>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Who don’t follow you
                    </Typography>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        With a new account
                    </Typography>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Who have a default profile photo
                    </Typography>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Who haven’t confirmed their email
                    </Typography>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Who haven’t confirmed their phone number
                    </Typography>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    These filters won’t affect notifications from people you follow. <a
                    href={"https://help.twitter.com/managing-your-account/understanding-the-notifications-timeline"}
                    target="_blank"
                    className={classes.link}>Learn more</a>
                </Typography>
            </div>
        </>
    );
};

export default MutedNotifications;
