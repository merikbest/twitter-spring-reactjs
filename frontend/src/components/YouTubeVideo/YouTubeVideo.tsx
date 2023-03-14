import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useYouTubeVideoStyles } from "./YouTubeVideoStyles";
import { LinkIcon } from "../../icons";

interface YouTubeVideoProps {
    link: string;
    linkTitle: string;
    linkDescription: string;
}

const YouTubeVideo: FC<YouTubeVideoProps> = ({ link, linkTitle, linkDescription }): ReactElement => {
    const classes = useYouTubeVideoStyles();

    const getYouTubeVideoId = (url: string): string | null => {
        const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <div className={classes.container}>
            <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(link)}`}
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            >
            </iframe>
            <a className={classes.youtubeLink} target="_blank" href={link}>
                <div className={classes.videoInfoWrapper}>
                    <Typography variant={"body1"} component={"div"}>
                        {linkTitle}
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"}>
                        {linkDescription}
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"}>
                        {LinkIcon}youtube.com
                    </Typography>
                </div>
            </a>
        </div>
    );
};

export default YouTubeVideo;
