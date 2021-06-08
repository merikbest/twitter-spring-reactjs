import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {useHomeStyles} from '../Home/HomeStyles';
import {BackButton} from "../../components/BackButton/BackButton";

export const User = () => {
    const classes = useHomeStyles();

    return (
        <Paper className={classes.tweetsWrapper} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
                <BackButton/>
                <div>
                    <Typography variant="h6">Vbhjckfd1</Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        65 твита
                    </Typography>
                </div>
            </Paper>
        </Paper>
    );
};
