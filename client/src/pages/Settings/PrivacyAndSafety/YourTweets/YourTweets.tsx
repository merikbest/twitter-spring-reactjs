import React, {FC, ReactElement} from 'react';
import {Checkbox, Link as MuiLink, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

import {useYourTweetsStyles} from "./YourTweetsStyles";
import {ArrowRightIcon} from "../../../../icons";

const YourTweets: FC = (): ReactElement => {
    const classes = useYourTweetsStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage the information associated with your Tweets.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Mark media you Tweet as having material that may be sensitive
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`When enabled, pictures and videos you Tweet will be marked as sensitive for people who don’t want to
                        see sensitive content. `}
                    <MuiLink
                        href="https://help.twitter.com/rules-and-policies/media-policy"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Link to={"/settings/privacy_and_safety/location"} className={classes.yourTweetsWrapper}>
                <div className={classes.yourTweetsLink}>
                    <Typography variant={"body1"} component={"span"}>
                        Add location information to your Tweets
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default YourTweets;
