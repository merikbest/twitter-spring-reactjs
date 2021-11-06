import React, {FC, ReactElement} from 'react';
import {Typography} from "@material-ui/core";

import {useMutedAccountsStyles} from "./MutedAccountsStyles";

const MutedAccounts: FC = (): ReactElement => {
    const classes = useMutedAccountsStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Here’s everyone you muted. You can add or remove them from this list. <a
                    href={"https://help.twitter.com/using-twitter/twitter-mute"}
                    target="_blank"
                    className={classes.link}>Learn more</a>
                </Typography>
            </div>
            <div className={classes.divider}/>
            <div className={classes.mutedAccountsInfo}>
                <Typography component={"div"} className={classes.title}>
                    You aren’t muting anyone
                </Typography>
                <Typography component={"div"} className={classes.subTitle}>
                    When you mute accounts, you won’t see their Tweets in your timeline. <a
                    href={"https://help.twitter.com/using-twitter/twitter-mute"}
                    target="_blank"
                    className={classes.link}>Learn more</a>
                </Typography>
            </div>
        </>
    );
};

export default MutedAccounts;
