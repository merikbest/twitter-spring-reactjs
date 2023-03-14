import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useUnsentTweetItemStyles } from "../UnsentTweetItemStyle";
import { ScheduleIcon } from "../../../../../icons";
import { formatScheduleDate } from "../../../../../util/format-date-helper";
import { Image } from "../../../../../types/common";

interface UnsentTweetItemInfoProps {
    scheduledDate: string;
    text: string;
    images: Image[];
}

const UnsentTweetItemInfo: FC<UnsentTweetItemInfoProps> = memo(({ scheduledDate, text, images }): ReactElement => {
    const classes = useUnsentTweetItemStyles();

    return (
        <div className={classes.tweetWrapper}>
            <div className={classes.scheduledDateWrapper}>
                {ScheduleIcon}
                <Typography variant={"subtitle2"} component={"span"}>
                    {`Will send on ${formatScheduleDate(new Date(scheduledDate))}`}
                </Typography>
            </div>
            <div className={classes.tweetInfo}>
                <Typography variant={"body1"} component={"span"}>
                    {text}
                </Typography>
                {(images?.length !== 0) && (
                    <div className={classes.imageWrapper}>
                        <img src={images?.[0].src} alt={images?.[0].src} />
                    </div>
                )}
            </div>
        </div>
    );
});

export default UnsentTweetItemInfo;
