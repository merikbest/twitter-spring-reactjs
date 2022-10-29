import React, {FC, ReactElement, useState} from "react";

import {TweetResponse} from "../../../store/types/tweet";
import YouTubeVideo from "../../YouTubeVideo/YouTubeVideo";
import SmallLinkPreview from "../../SmallLinkPreview/SmallLinkPreview";
import {LinkCoverSize} from "../../../store/types/common";
import LargeLinkPreview from "../../LargeLinkPreview/LargeLinkPreview";

interface TweetMediaProps {
    tweet?: TweetResponse;
}

const TweetMedia: FC<TweetMediaProps> = ({tweet}): ReactElement => {
    const [openYouTubeVideo, setOpenYouTubeVideo] = useState<boolean>(false);
    const isYouTubeLink = tweet?.link && tweet?.link.includes("youtu");

    const onOpenYouTubeVideo = (): void => {
        setOpenYouTubeVideo(true)
    };

    return (
        <>
            {tweet?.link && (
                isYouTubeLink ? (
                    openYouTubeVideo ? (
                        <YouTubeVideo
                            link={tweet.link}
                            linkTitle={tweet.linkTitle}
                            linkDescription={tweet.linkDescription}
                        />
                    ) : (
                        <SmallLinkPreview
                            link={tweet.link}
                            linkTitle={tweet.linkTitle}
                            linkDescription={tweet.linkDescription}
                            linkCover={tweet.linkCover}
                            onOpenYouTubeVideo={onOpenYouTubeVideo}
                        />
                    )
                ) : (
                    (tweet?.linkCoverSize === LinkCoverSize.LARGE) ? (
                        <LargeLinkPreview
                            link={tweet.link}
                            linkTitle={tweet.linkTitle}
                            linkDescription={tweet.linkDescription}
                            linkCover={tweet.linkCover}
                        />
                    ) : (
                        <SmallLinkPreview
                            link={tweet.link}
                            linkTitle={tweet.linkTitle}
                            linkDescription={tweet.linkDescription}
                            linkCover={tweet.linkCover}
                        />
                    )
                )
            )}
        </>
    );
};

export default TweetMedia;
