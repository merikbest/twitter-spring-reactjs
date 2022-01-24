import React, {FC, ReactElement} from 'react';
import {Link as MuiLink, Typography} from "@material-ui/core";

import {useConnectedAppsStyles} from "./ConnectedAppsStyles";
import {useGlobalStyles} from "../../../../../util/globalClasses";

const ConnectedApps: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useConnectedAppsStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`These are the apps which you connected to your account. You can see the information these apps 
                    have access to and revoke access. `}
                    <MuiLink
                        href="https://help.twitter.com/managing-your-account/connect-or-revoke-access-to-third-party-apps"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
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
