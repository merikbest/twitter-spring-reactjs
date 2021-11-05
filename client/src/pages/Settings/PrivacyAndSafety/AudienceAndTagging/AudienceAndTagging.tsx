import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Checkbox, Typography} from "@material-ui/core";

import {useAudienceAndTaggingStyles} from "./AudienceAndTaggingStyles";
import {ArrowRightIcon} from "../../../../icons";

const AudienceAndTagging: FC = (): ReactElement => {
    const classes = useAudienceAndTaggingStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage what information you allow other people on Twitter to see.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Protect your Tweets</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    When selected, your Tweets and other account information are only visible to people who follow you.
                    <a
                        href={"https://help.twitter.com/safety-and-security/public-and-protected-tweets"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <Link to={"/settings/privacy_and_safety/tagging"} className={classes.photoTaggingWrapper}>
                <div className={classes.photoTaggingLink}>
                    <div className={classes.photoTagInfo}>
                        <div>Photo tagging</div>
                        <Typography component={"div"} className={classes.text}>
                            Anyone can tag you
                        </Typography>
                    </div>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default AudienceAndTagging;
