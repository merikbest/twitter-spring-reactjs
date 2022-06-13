import React, {FC, ReactElement} from 'react';
import {Checkbox, Typography} from "@material-ui/core";

import {ScheduleIcon} from "../../../../icons";
import {formatScheduleDate} from "../../../../util/formatDate";
import {TweetResponse} from "../../../../store/types/tweet";
import {useUnsentTweetItemStyles} from "./UnsentTweetItemStyle";

interface UnsentTweetItemProps {
    tweet: TweetResponse;
    onOpenEditTweetModal: (tweet: TweetResponse) => void;
    onToggleCheckTweet: (tweetId: number) => void;
    isTweetSelected: (tweetId: number) => boolean;
    visibleEditListFooter: boolean;
}

const UnsentTweetItem: FC<UnsentTweetItemProps> = (
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
        <div
            key={tweet.id}
            className={classes.tweetContainer}
            onClick={() => onOpenEditTweetModal(tweet)}
        >
            {visibleEditListFooter && (
                <div>
                    <Checkbox
                        value={tweet.id}
                        onClick={() => onToggleCheckTweet(tweet.id)}
                        checked={isTweetSelected(tweet.id)}
                    />
                </div>
            )}
            <div className={classes.tweetWrapper}>
                <div className={classes.scheduledDateWrapper}>
                    {ScheduleIcon}
                    <Typography variant={"subtitle2"} component={"span"}>
                        {`Will send on ${formatScheduleDate(new Date(tweet.scheduledDate!))}`}
                    </Typography>
                </div>
                <div className={classes.tweetInfo}>
                    <Typography variant={"body1"} component={"span"}>
                        {tweet.text}
                    </Typography>
                    {(tweet?.images?.length !== 0) && (
                        <div className={classes.imageWrapper}>
                            <img
                                src={tweet?.images?.[0].src}
                                alt={String(tweet?.images?.[0].id)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UnsentTweetItem;
