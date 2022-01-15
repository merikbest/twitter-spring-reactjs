import React, {FC, ReactElement} from 'react';
import {Typography} from "@material-ui/core";

import {useConnectedAppsStyles} from "./ConnectedAppsStyles";

const ConnectedApps: FC = (): ReactElement => {
    const classes = useConnectedAppsStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    These are the apps which you connected to your account. You can see the information these
                    apps have access to and revoke access. <a
                    href={"https://help.twitter.com/managing-your-account/connect-or-revoke-access-to-third-party-apps"}
                    target="_blank"
                    className={classes.link}>Learn more</a>
                </Typography>
            </div>
            <div className={classes.connectedAppsWrapper}>
                <Typography variant={"h4"} component={"div"}>
                    You don’t have any connected apps
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    When you connect a third-party app to your Twitter account, you are granting that app access
                    to use your account.
                </Typography>
            </div>
        </>
    );
};

export default ConnectedApps;
