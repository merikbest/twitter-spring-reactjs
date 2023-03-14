import React, { memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useScheduleModalStyles } from "../ScheduleModalStyles";

const ScheduleTimeZone = memo((): ReactElement => {
    const classes = useScheduleModalStyles();

    return (
        <div className={classes.dateWrapper}>
            <Typography variant={"subtitle1"} component={"div"} className={classes.subtitle}>
                Time zone
            </Typography>
            <Typography variant={"h5"} component={"div"} className={classes.title}>
                {Intl.DateTimeFormat().resolvedOptions().timeZone + " Standard Time"}
            </Typography>
        </div>
    );
});

export default ScheduleTimeZone;
