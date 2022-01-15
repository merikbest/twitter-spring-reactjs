import React, {FC, ReactElement} from 'react';
import {Divider, Typography} from "@material-ui/core";

import {useChangeAgeStyles} from "./ChangeAgeStyles";

const ChangeAge: FC = (): ReactElement => {
    const classes = useChangeAgeStyles();

    return (
        <div className={classes.textFieldWrapper}>
            <Typography variant={"body1"} component={"div"}>
                If you haven’t provided a date of birth, we’ve provided an age range based on your Twitter
                profile and activity. Age information is used to personalize your experience. <a
                href={"https://help.twitter.com/safety-and-security/birthday-visibility-settings"}
                target="_blank"
                className={classes.link}>Learn more</a>
            </Typography>
            <Divider/>
            <Typography variant={"body1"} component={"div"}>
                13-64
            </Typography>
            <Divider/>
            <Typography variant={"body1"} component={"div"}>
                Not right? You can add your date of birth to your profile without sharing it publicly.
            </Typography>
        </div>
    );
};

export default ChangeAge;
