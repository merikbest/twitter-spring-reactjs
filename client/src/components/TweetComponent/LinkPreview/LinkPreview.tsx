import React, {FC, ReactElement} from 'react';

import {useLinkPreviewStyles} from "./LinkPreviewStyles";
import {Tweet} from "../../../store/ducks/tweets/contracts/state";
import {LinkIcon, PlayVideoIcon} from "../../../icons";

interface LinkPreviewProps {
    tweet: Tweet;
}

const LinkPreview: FC<LinkPreviewProps> = ({tweet}): ReactElement => {
    const classes = useLinkPreviewStyles({linkCover: tweet.linkCover});

    return (
        <div className={classes.container}>
            <div className={classes.videoPreviewImage}>
                <div className={classes.videoIcon}>{PlayVideoIcon}</div>
            </div>
            <div className={classes.videoPreviewTitle}>
                <div className={classes.linkTitle}>{tweet.linkTitle}</div>
                <div className={classes.linkDescription}>{tweet.linkDescription}</div>
                <div className={classes.youtubeLink}>{LinkIcon}youtube.com</div>
            </div>
        </div>
    );
};

export default LinkPreview;
