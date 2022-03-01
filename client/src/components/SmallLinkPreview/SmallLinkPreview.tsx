import React, {FC, ReactElement} from 'react';
import {Typography} from "@material-ui/core";

import {useSmallLinkPreviewStyles} from "./SmallLinkPreviewStyles";
import {LinkIcon, PlayVideoIcon} from "../../icons";
import {TweetResponse} from "../../store/types/tweet";

interface SmallLinkPreviewProps {
    tweet: TweetResponse;
    onOpenYouTubeVideo?: () => void;
    isFullTweet?: boolean;
}

const SmallLinkPreview: FC<SmallLinkPreviewProps> = ({tweet, onOpenYouTubeVideo, isFullTweet}): ReactElement => {
    const classes = useSmallLinkPreviewStyles({linkCover: tweet.linkCover, isFullTweet: isFullTweet});
    const matches = tweet.link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    const domain = matches && matches[1];

    const LinkPreview = (): JSX.Element => {
        if (onOpenYouTubeVideo) {
            return (
                <div className={classes.container} onClick={onOpenYouTubeVideo}>
                    <div className={classes.linkPreviewImage}>
                        <div className={classes.videoIcon}>
                            {PlayVideoIcon}
                        </div>
                    </div>
                    <LinkPreviewInfo/>
                </div>
            );
        } else {
            return (
                <a className={classes.siteLink} target="_blank" href={tweet.link}>
                    <div className={classes.container}>
                        <div className={classes.linkPreviewImage}/>
                        <LinkPreviewInfo/>
                    </div>
                </a>
            );
        }
    };

    const LinkPreviewInfo = (): JSX.Element => {
        return (
            <div className={classes.linkPreviewTitle}>
                <Typography variant={"body1"} component={"div"}>
                    {tweet.linkTitle}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    {tweet.linkDescription}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    {LinkIcon}{domain}
                </Typography>
            </div>
        );
    };

    return (<LinkPreview/>);
};

export default SmallLinkPreview;
