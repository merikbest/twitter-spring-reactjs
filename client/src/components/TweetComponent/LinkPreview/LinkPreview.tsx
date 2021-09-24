import React, {FC, ReactElement, RefObject} from 'react';

import {useLinkPreviewStyles} from "./LinkPreviewStyles";
import {Tweet} from "../../../store/ducks/tweets/contracts/state";
import {LinkIcon} from "../../../icons";

interface LinkPreviewProps {
    tweet: Tweet;
    imgElement: RefObject<HTMLImageElement>;
    calculateImageSize: () => void;
    imageSize: number;
}

const LinkPreview: FC<LinkPreviewProps> = ({tweet, imgElement, calculateImageSize, imageSize}): ReactElement => {
    const classes = useLinkPreviewStyles();
    const matches = tweet.link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    const domain = matches && matches[1];

    return (
        <a className={classes.siteLink} target="_blank" href={tweet.link}>
            <div className={classes.container}>
                <img
                    className={classes.linkCover}
                    ref={imgElement}
                    onLoad={calculateImageSize}
                    src={tweet.linkCover}
                    alt={tweet.linkCover}
                />
                <div className={classes.siteInfoWrapper}>
                    <div className={classes.siteInfoTitle}>{tweet.linkTitle}</div>
                    <div className={classes.siteInfoDescription}>{tweet.linkDescription}</div>
                    <div className={classes.siteTitle}>{LinkIcon}{domain}</div>
                </div>
            </div>
        </a>
    );
};

export default LinkPreview;
