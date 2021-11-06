import React, {FC, ReactElement} from 'react';
import {Checkbox, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

import {useYourTweetsStyles} from "./YourTweetsStyles";
import {ArrowRightIcon} from "../../../../icons";

const YourTweets: FC = (): ReactElement => {
    const classes = useYourTweetsStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage the information associated with your Tweets.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Mark media you Tweet as having material that may be sensitive</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    When enabled, pictures and videos you Tweet will be marked as sensitive for people who don’t want to
                    see sensitive content.<a
                        href={"https://help.twitter.com/rules-and-policies/media-policy"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <Link to={"/settings/privacy_and_safety/location"} className={classes.yourTweetsWrapper}>
                <div className={classes.yourTweetsLink}>
                    <Typography component={"span"}>
                        Add location information to your Tweets
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default YourTweets;
