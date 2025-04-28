import React, { memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useScheduleModalStyles } from "../ScheduleModalStyles";

const ScheduleTimeZone = memo((): ReactElement => {
    const classes = useScheduleModalStyles();
    const { t } = useTranslation();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className={classes.dateWrapper}>
            <Typography variant="subtitle1" component="div" className={classes.subtitle}>
                {t("TIME_ZONE", { defaultValue: "Time zone" })}
            </Typography>
            <Typography variant="h5" component="div" className={classes.title}>
                {t("STANDARD_TIME", { timeZone, defaultValue: `${timeZone} Standard Time` })}
            </Typography>
        </div>
    );
});

export default ScheduleTimeZone;
