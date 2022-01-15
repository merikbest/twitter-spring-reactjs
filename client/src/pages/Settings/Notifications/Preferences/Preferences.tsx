import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

import {usePreferencesStyles} from "./PreferencesStyles";
import {ArrowRightIcon} from "../../../../icons";

const Preferences: FC = (): ReactElement => {
    const classes = usePreferencesStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Select your preferences by notification type.
                    <a
                        href={"https://help.twitter.com/managing-your-account/notifications-on-mobile-devices"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <Link to={"/settings/notification/push_notifications"} className={classes.preferencesWrapper}>
                <div className={classes.preferencesLink}>
                    <Typography variant={"body1"} component={"span"}>
                        Push notifications
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Link to={"/settings/notification/email_notifications"} className={classes.preferencesWrapper}>
                <div className={classes.preferencesLink}>
                    <Typography variant={"body1"} component={"span"}>
                        Email notifications
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default Preferences;
