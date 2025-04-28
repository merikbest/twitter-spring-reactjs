import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const date = formatScheduleDate(new Date(scheduledDate));

    return (
        <div className={classes.tweetWrapper}>
            <div className={classes.scheduledDateWrapper}>
                {ScheduleIcon}
                <Typography variant="subtitle2" component="span">
                    {t("WILL_SEND_ON", { date, defaultValue: `Will send on ${date}` })}
                </Typography>
            </div>
            <div className={classes.tweetInfo}>
                <Typography variant="body1" component="span">
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
