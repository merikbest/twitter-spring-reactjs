import React, {FC, ReactElement} from 'react';
import {Paper} from "@material-ui/core";

import {useConnectedAppsStyles} from "./ConnectedAppsStyles";

const ConnectedApps: FC = (): ReactElement => {
    const classes = useConnectedAppsStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    ConnectedApps
                </div>
            </Paper>
        </div>
    );
};

export default ConnectedApps;
