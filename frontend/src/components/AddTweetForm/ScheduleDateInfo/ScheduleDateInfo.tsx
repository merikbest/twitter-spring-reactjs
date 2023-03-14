import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { ScheduleIcon } from "../../../icons";
import { formatScheduleDate } from "../../../util/format-date-helper";
import { useScheduleDateInfoStyles } from "./ScheduleDateInfoStyles";

interface ScheduleDateInfoProps {
    selectedScheduleDate: Date | null;
}

const ScheduleDateInfo: FC<ScheduleDateInfoProps> = memo(({ selectedScheduleDate }): ReactElement => {
    const classes = useScheduleDateInfoStyles();

    return (
        <>
            {selectedScheduleDate && (
                <div id={"tweetScheduleDate"} className={classes.infoWrapper}>
                    {ScheduleIcon}
                    <Typography variant={"subtitle2"} component={"span"}>
                        {`Will send on ${formatScheduleDate(selectedScheduleDate)}`}
                    </Typography>
                </div>
            )}
        </>
    );
});

export default ScheduleDateInfo;
