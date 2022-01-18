import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Link as MuiLink, Typography} from "@material-ui/core";

import {useAccountAccessHistoryStyles} from "./AccountAccessHistoryStyles";

const AccountAccessHistory: FC = (): ReactElement => {
    const classes = useAccountAccessHistoryStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    If you see any suspicious activity from an app, go to <Link
                    to={"/settings/security/connected_apps"} className={classes.routerLink}>Connected apps</Link> to
                    revoke its access.
                    {"In some cases the IP location may differ from your physical location. "}
                    <MuiLink
                        href="https://help.twitter.com/managing-your-account/accessing-your-twitter-data"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
        </>
    );
};

export default AccountAccessHistory;
