import React, {FC, ReactElement} from 'react';

import {useYouTubeVideoPreviewStyles} from "./YouTubeVideoPreviewStyles";
import {Tweet} from "../../../store/ducks/tweets/contracts/state";
import {LinkIcon, PlayVideoIcon} from "../../../icons";

interface YouTubeVideoPreviewProps {
    tweet: Tweet;
    onOpenYouTubeVideo: () => void;
}

const YouTubeVideoPreview: FC<YouTubeVideoPreviewProps> = ({tweet, onOpenYouTubeVideo}): ReactElement => {
    const classes = useYouTubeVideoPreviewStyles({linkCover: tweet.linkCover});

    return (
        <div className={classes.container} onClick={onOpenYouTubeVideo}>
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

export default YouTubeVideoPreview;
