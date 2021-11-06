import React, {FC, ReactElement} from 'react';

import {useOffTwitterActivityStyles} from "./OffTwitterActivityStyles";
import {Checkbox, Typography} from "@material-ui/core";

const OffTwitterActivity: FC = (): ReactElement => {
    const classes = useOffTwitterActivityStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage how Twitter uses your online activity outside of Twitter, such as the websites you visit, to
                    personalize your experience.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Allow use of where you see Twitter content across the Web</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    This setting lets Twitter keep track of your visits to other websites that integrate Twitter
                    content, such as embedded timelines. That information makes Twitter better for you, such as by
                    personalizing your experience. This web browsing history will never be stored with your name, email,
                    or phone number.
                    <a
                        href={"https://help.twitter.com/using-twitter/tailored-suggestions"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Personalize based on your inferred identity</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Twitter will always personalize your experience based on information you’ve provided, as well as the
                    devices you’ve used to log in. When this setting is enabled, Twitter may also personalize based on
                    other inferences about your identity, like devices and browsers you haven’t used to log in to
                    Twitter or email addresses and phone numbers similar to those linked to your Twitter account.
                    <a
                        href={"https://help.twitter.com/about-personalization-across-your-devices"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
        </>
    );
};

export default OffTwitterActivity;
