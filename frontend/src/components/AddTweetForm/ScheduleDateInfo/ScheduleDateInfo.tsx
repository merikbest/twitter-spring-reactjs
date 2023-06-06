import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import { ScheduleIcon } from "../../../icons";
import { formatScheduleDate } from "../../../util/format-date-helper";
import { useScheduleDateInfoStyles } from "./ScheduleDateInfoStyles";
import { selectScheduledDate } from "../../../store/ducks/addTweetForm/selector";

const ScheduleDateInfo: FC = memo((): ReactElement => {
    const classes = useScheduleDateInfoStyles();
    const scheduledDate = useSelector(selectScheduledDate);

    return (
        <>
            {scheduledDate && (
                <div id={"tweetScheduleDate"} className={classes.infoWrapper}>
                    {ScheduleIcon}
                    <Typography variant={"subtitle2"} component={"span"}>
                        {`Will send on ${formatScheduleDate(scheduledDate)}`}
                    </Typography>
                </div>
            )}
        </>
    );
});

export default ScheduleDateInfo;
