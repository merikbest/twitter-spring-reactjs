import React, { FC, memo, ReactElement, useState } from "react";

import YouTubeVideo from "../../YouTubeVideo/YouTubeVideo";
import SmallLinkPreview from "../../SmallLinkPreview/SmallLinkPreview";
import { LinkCoverSize } from "../../../types/common";
import LargeLinkPreview from "../../LargeLinkPreview/LargeLinkPreview";

interface TweetMediaProps {
    link?: string;
    linkTitle?: string;
    linkDescription?: string;
    linkCover?: string;
    linkCoverSize?: LinkCoverSize;
}

const TweetMedia: FC<TweetMediaProps> = memo((
    {
        link,
        linkTitle,
        linkDescription,
        linkCover,
        linkCoverSize
    }
): ReactElement => {
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
                            link={link!}
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
                        />
                    )
                ) : (
                    (linkCoverSize === LinkCoverSize.LARGE) ? (
                        <LargeLinkPreview
                            link={link}
                            linkTitle={linkTitle!}
                            linkDescription={linkDescription!}
                            linkCover={linkCover!}
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
