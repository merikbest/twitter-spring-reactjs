import React, {FC, ReactElement} from 'react';
import {Divider, Typography} from "@material-ui/core";

import {useYourAdvertiserListStyles} from "./YourAdvertiserListStyles";

const YourAdvertiserList: FC = (): ReactElement => {
    const classes = useYourAdvertiserListStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Tailored audiences are often built from email lists or browsing behaviors. They help advertisers
                    reach prospective customers or people who have already expressed interest in their business. <a
                    href={"https://help.twitter.com/safety-and-security/privacy-controls-for-tailored-ads"}
                    target="_blank"
                    className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    You are currently a part of <b>0 audiences</b> from <b>0 advertisers</b>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    You can opt out of interest-based advertising in your personalization and data settings. This will
                    change the ads you see on Twitter, however it won’t remove you from advertisers’ audiences.
                </Typography>
            </div>
        </>
    );
};

export default YourAdvertiserList;
