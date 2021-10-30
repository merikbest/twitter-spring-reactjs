import React, {FC, ReactElement} from 'react';
import {Paper} from "@material-ui/core";

import {useAccountAccessHistoryStyles} from "./AccountAccessHistoryStyles";

const AccountAccessHistory: FC = (): ReactElement => {
    const classes = useAccountAccessHistoryStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    AccountAccessHistory
                </div>
            </Paper>
        </div>
    );
};

export default AccountAccessHistory;
