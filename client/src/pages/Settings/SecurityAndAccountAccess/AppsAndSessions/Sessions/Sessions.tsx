import React, {FC, ReactElement} from 'react';
import {Paper} from "@material-ui/core";

import {useSessionsStyles} from "./SessionsStyles";

const Sessions: FC = (): ReactElement => {
    const classes = useSessionsStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    Sessions
                </div>
            </Paper>
        </div>
    );
};

export default Sessions;
