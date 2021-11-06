import React, {FC, ReactElement} from 'react';

import {useMutedNotificationsStyles} from "./MutedNotificationsStyles";
import {Checkbox, Typography} from "@material-ui/core";

const MutedNotifications: FC = (): ReactElement => {
    const classes = useMutedNotificationsStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Mute notifications from people:
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>You don’t follow</span>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Who don’t follow you</span>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>With a new account</span>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Who have a default profile photo</span>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Who haven’t confirmed their email</span>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Who haven’t confirmed their phone number</span>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
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
