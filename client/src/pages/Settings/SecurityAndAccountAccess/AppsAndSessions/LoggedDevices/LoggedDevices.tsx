import React, {FC, ReactElement} from 'react';
import {Paper} from "@material-ui/core";

import {useLoggedDevicesStyles} from "./LoggedDevicesStyles";

const LoggedDevices: FC = (): ReactElement => {
    const classes = useLoggedDevicesStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    LoggedDevices
                </div>
            </Paper>
        </div>
    );
};

export default LoggedDevices;
