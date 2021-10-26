import React, {FC, ReactElement} from 'react';
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";

import {useChangeAgeStyles} from "./ChangeAgeStyles";

const ChangeAge: FC = (): ReactElement => {
    const classes = useChangeAgeStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    <Typography className={classes.text}>
                        If you haven’t provided a date of birth, we’ve provided an age range based on your Twitter
                        profile and activity. Age information is used to personalize your experience. <a
                        href={"https://help.twitter.com/safety-and-security/birthday-visibility-settings"}
                        target="_blank"
                        className={classes.link}>Learn more</a>
                    </Typography>
                    <div className={classes.divider}/>
                    <Typography className={classes.text}>
                        13-64
                    </Typography>
                    <div className={classes.divider}/>
                    <Typography className={classes.text}>
                        Not right? You can add your date of birth to your profile without sharing it publicly.
                    </Typography>
                </div>
            </Paper>
        </div>
    );
};

export default ChangeAge;
