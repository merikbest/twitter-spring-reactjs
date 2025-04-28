import React, { FC, memo, ReactElement } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useScheduleModalStyles } from "../ScheduleModalStyles";

interface ScheduleFooterProps {
    onOpenUnsentTweetsModal: () => void;
}

const ScheduleFooter: FC<ScheduleFooterProps> = memo(({ onOpenUnsentTweetsModal }): ReactElement => {
    const classes = useScheduleModalStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.footer}>
            <Button onClick={onOpenUnsentTweetsModal} variant="text" color="primary">
                {t("SCHEDULED_TWEETS", { defaultValue: "Scheduled Tweets" })}
            </Button>
        </div>
    );
});

export default ScheduleFooter;
