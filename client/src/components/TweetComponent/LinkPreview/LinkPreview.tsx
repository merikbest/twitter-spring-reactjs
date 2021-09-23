import React, {FC, ReactElement} from 'react';

import {useLinkPreviewStyles} from "./LinkPreviewStyles";
import {Tweet} from "../../../store/ducks/tweets/contracts/state";
import {LinkIcon} from "../../../icons";

interface LinkPreviewProps {
    tweet: Tweet;
}

const LinkPreview: FC<LinkPreviewProps> = ({tweet}): ReactElement => {
    const classes = useLinkPreviewStyles();
    const matches = tweet.link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    const domain = matches && matches[1];

    return (
        <div className={classes.container}>
            <img className={classes.linkCover} src={tweet.linkCover} alt={tweet.linkCover}/>
            <a className={classes.siteLink} target="_blank" href={tweet.link}>
                <div className={classes.siteInfoWrapper}>
                    <div className={classes.siteInfoTitle}>{tweet.linkTitle}</div>
                    <div className={classes.siteInfoDescription}>{tweet.linkDescription}</div>
                    <div className={classes.siteTitle}>{LinkIcon}{domain}</div>
                </div>
            </a>
        </div>
    );
};

export default LinkPreview;
