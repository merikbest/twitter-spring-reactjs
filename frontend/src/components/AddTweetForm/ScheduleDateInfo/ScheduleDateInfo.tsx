import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { ScheduleIcon } from "../../../icons";
import { formatScheduleDate } from "../../../util/format-date-helper";
import { useScheduleDateInfoStyles } from "./ScheduleDateInfoStyles";
import { selectScheduledDate } from "../../../store/ducks/addTweetForm/selector";

const ScheduleDateInfo: FC = memo((): ReactElement | null => {
    const classes = useScheduleDateInfoStyles();
    const scheduledDate = useSelector(selectScheduledDate);
    const { t } = useTranslation();

    if (!scheduledDate) {
        return null;
    }

    const date = formatScheduleDate(scheduledDate);
    return (
        <div id="tweetScheduleDate" className={classes.infoWrapper}>
            {ScheduleIcon}
            <Typography variant="subtitle2" component="span">
                {t("WILL_SEND_ON", { date, defaultValue: `Will send on ${date}` })}
            </Typography>
        </div>
    );
});

export default ScheduleDateInfo;
