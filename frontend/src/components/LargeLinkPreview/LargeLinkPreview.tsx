import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useLargeLinkPreviewStyles } from "./LargeLinkPreviewStyles";
import { LinkIcon } from "../../icons";

interface LargeLinkPreviewProps {
    link: string;
    linkTitle: string;
    linkDescription: string;
    linkCover: string;
    isFullTweet?: boolean;
}

const LargeLinkPreview: FC<LargeLinkPreviewProps> = (
    {
        link,
        linkTitle,
        linkDescription,
        linkCover,
        isFullTweet
    }
): ReactElement => {
    const classes = useLargeLinkPreviewStyles({ isFullTweet: isFullTweet });
    const matches = link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    const domain = matches && matches[1];

    return (
        <a className={classes.siteLink} target="_blank" href={link}>
            <div className={classes.container}>
                <img className={classes.linkCover} src={linkCover} alt={linkCover} />
                <div className={classes.siteInfoWrapper}>
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
            </div>
        </a>
    );
};

export default LargeLinkPreview;
