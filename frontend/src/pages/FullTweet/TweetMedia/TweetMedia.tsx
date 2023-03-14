import React, { memo, ReactElement, useState } from "react";
import { useSelector } from "react-redux";

import YouTubeVideo from "../../../components/YouTubeVideo/YouTubeVideo";
import SmallLinkPreview from "../../../components/SmallLinkPreview/SmallLinkPreview";
import { LinkCoverSize } from "../../../types/common";
import LargeLinkPreview from "../../../components/LargeLinkPreview/LargeLinkPreview";
import {
    selectLinkCover,
    selectLinkCoverSize,
    selectLinkDescription,
    selectLinkTitle,
    selectTweetLink
} from "../../../store/ducks/tweet/selectors";

const TweetMedia = memo((): ReactElement => {
    const link = useSelector(selectTweetLink);
    const linkCover = useSelector(selectLinkCover);
    const linkCoverSize = useSelector(selectLinkCoverSize);
    const linkTitle = useSelector(selectLinkTitle);
    const linkDescription = useSelector(selectLinkDescription);
    const [openYouTubeVideo, setOpenYouTubeVideo] = useState<boolean>(false);
    const isYouTubeLink = link && link.includes("youtu");

    const onOpenYouTubeVideo = (): void => {
        setOpenYouTubeVideo(true);
    };

    return (
        <>
            {link && (
                isYouTubeLink ? (
                    openYouTubeVideo ? (
                        <YouTubeVideo
                            link={link}
                            linkTitle={linkTitle!}
                            linkDescription={linkDescription!}
                        />
                    ) : (
                        <SmallLinkPreview
                            link={link}
                            linkTitle={linkTitle!}
                            linkDescription={linkDescription!}
                            linkCover={linkCover!}
                            onOpenYouTubeVideo={onOpenYouTubeVideo}
                            isFullTweet
                        />
                    )
                ) : (
                    (linkCoverSize === LinkCoverSize.LARGE) ? (
                        <LargeLinkPreview
                            link={link}
                            linkTitle={linkTitle!}
                            linkDescription={linkDescription!}
                            linkCover={linkCover!}
                            isFullTweet
                        />
                    ) : (
                        <SmallLinkPreview
                            link={link}
                            linkTitle={linkTitle!}
                            linkDescription={linkDescription!}
                            linkCover={linkCover!}
                        />
                    )
                )
            )}
        </>
    );
});

export default TweetMedia;
