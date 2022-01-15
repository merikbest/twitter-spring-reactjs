import React, {FC, ReactElement} from 'react';
import {Divider, Typography} from "@material-ui/core";

import {useYourAdvertiserListStyles} from "./YourAdvertiserListStyles";

const YourAdvertiserList: FC = (): ReactElement => {
    const classes = useYourAdvertiserListStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle1"} component={"div"}>
                    Tailored audiences are often built from email lists or browsing behaviors. They help advertisers
                    reach prospective customers or people who have already expressed interest in their business. <a
                    href={"https://help.twitter.com/safety-and-security/privacy-controls-for-tailored-ads"}
                    target="_blank"
                    className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"body1"} component={"div"}>
                    You are currently a part of
                    <Typography variant={"h6"} component={"span"}>
                        {" 0 audiences"}
                    </Typography>
                    {" from "}
                    <Typography variant={"h6"} component={"span"}>
                        0 advertisers
                    </Typography>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle1"} component={"div"}>
                    You can opt out of interest-based advertising in your personalization and data settings. This will
                    change the ads you see on Twitter, however it won’t remove you from advertisers’ audiences.
                </Typography>
            </div>
        </>
    );
};

export default YourAdvertiserList;
