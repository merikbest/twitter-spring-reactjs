import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useSmallLinkPreviewStyles } from "./SmallLinkPreviewStyles";
import { LinkIcon, PlayVideoIcon } from "../../icons";

interface SmallLinkPreviewProps {
    link: string;
    linkTitle: string;
    linkDescription: string;
    linkCover: string;
    onOpenYouTubeVideo?: () => void;
    isFullTweet?: boolean;
}

const SmallLinkPreview: FC<SmallLinkPreviewProps> = (
    {
        link,
        linkTitle,
        linkDescription,
        linkCover,
        onOpenYouTubeVideo,
        isFullTweet
    }
): ReactElement => {
    const classes = useSmallLinkPreviewStyles({ linkCover: linkCover, isFullTweet: isFullTweet });
    const matches = link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    const domain = matches && matches[1];

    const LinkPreview = (): JSX.Element => {
        if (onOpenYouTubeVideo) {
            return (
                <div id={"openYouTubeVideo"} className={classes.container} onClick={onOpenYouTubeVideo}>
                    <div className={classes.linkPreviewImage}>
                        <div className={classes.videoIcon}>
                            {PlayVideoIcon}
                        </div>
                    </div>
                    <LinkPreviewInfo />
                </div>
            );
        } else {
            return (
                <a className={classes.siteLink} target="_blank" href={link}>
                    <div className={classes.container}>
                        <div className={classes.linkPreviewImage} />
                        <LinkPreviewInfo />
                    </div>
                </a>
            );
        }
    };

    const LinkPreviewInfo = (): JSX.Element => {
        return (
            <div className={classes.linkPreviewTitle}>
                <Typography variant={"body1"} component={"div"}>
                    {linkTitle}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    {linkDescription}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    {LinkIcon}{domain}
                </Typography>
            </div>
        );
    };

    return (<LinkPreview />);
};

export default SmallLinkPreview;
