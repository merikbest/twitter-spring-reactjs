import React, {FC, memo, ReactElement} from "react";
import {Typography} from "@material-ui/core";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import {ScheduleIcon} from "../../../icons";
import {formatScheduleDate} from "../../../util/formatDate";

interface ScheduleDateInfoProps {
    selectedScheduleDate: Date | null;
    classes: ClassNameMap<string>;
}

const ScheduleDateInfo: FC<ScheduleDateInfoProps> = memo(({selectedScheduleDate, classes}): ReactElement => {
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
