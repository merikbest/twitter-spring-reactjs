import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

import {useAccountAccessHistoryStyles} from "./AccountAccessHistoryStyles";

const AccountAccessHistory: FC = (): ReactElement => {
    const classes = useAccountAccessHistoryStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    If you see any suspicious activity from an app, go to <Link
                    to={"/settings/security/connected_apps"} className={classes.link}>Connected apps</Link> to
                    revoke its access.
                    In some cases the IP location may differ from your physical location. <a
                    href={"https://help.twitter.com/managing-your-account/accessing-your-twitter-data"}
                    target="_blank"
                    className={classes.link}>Learn more</a>
                </Typography>
            </div>
        </>
    );
};

export default AccountAccessHistory;
