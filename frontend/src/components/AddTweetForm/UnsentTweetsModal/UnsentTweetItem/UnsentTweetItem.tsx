import React, { FC, memo, ReactElement } from "react";
import { Checkbox } from "@material-ui/core";

import { TweetResponse } from "../../../../types/tweet";
import { useUnsentTweetItemStyles } from "./UnsentTweetItemStyle";
import UnsentTweetItemInfo from "./UnsentTweetItemInfo/UnsentTweetItemInfo";

interface UnsentTweetItemProps {
    tweet: TweetResponse;
    onOpenEditTweetModal: (tweet: TweetResponse) => void;
    onToggleCheckTweet: (tweetId: number) => void;
    isTweetSelected: boolean;
    visibleEditListFooter: boolean;
}

const UnsentTweetItem: FC<UnsentTweetItemProps> = memo((
    {
        tweet,
        onOpenEditTweetModal,
        onToggleCheckTweet,
        isTweetSelected,
        visibleEditListFooter
    }
): ReactElement => {
    const classes = useUnsentTweetItemStyles();

    return (
        <div className={classes.tweetContainer} onClick={() => onOpenEditTweetModal(tweet)}>
            {visibleEditListFooter && (
                <div>
                    <Checkbox value={tweet.id} onClick={() => onToggleCheckTweet(tweet.id)} checked={isTweetSelected} />
                </div>
            )}
            <UnsentTweetItemInfo scheduledDate={tweet.scheduledDate} text={tweet.text} images={tweet.images} />
        </div>
    );
});

export default UnsentTweetItem;
