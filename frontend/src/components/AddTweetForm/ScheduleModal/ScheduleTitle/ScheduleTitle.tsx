import React, { FC, memo, ReactElement } from "react";
import { Button, DialogTitle } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import CloseButton from "../../../CloseButton/CloseButton";
import { useScheduleModalStyles } from "../ScheduleModalStyles";
import { selectScheduledDate } from "../../../../store/ducks/addTweetForm/selector";

interface ScheduleModalTitleProps {
    onClose: () => void;
    isValidSelectedDate: boolean;
    onSubmitScheduleDate: () => void;
    onSubmitClearScheduleDate: () => void;
}

const ScheduleTitle: FC<ScheduleModalTitleProps> = memo((
    {
        onClose,
        isValidSelectedDate,
        onSubmitScheduleDate,
        onSubmitClearScheduleDate
    }
): ReactElement => {
    const classes = useScheduleModalStyles();
    const scheduledDate = useSelector(selectScheduledDate);
    const { t } = useTranslation();

    return (
        <DialogTitle>
            <CloseButton onClose={onClose} />
            {t("SCHEDULE", { defaultValue: "Schedule" })}
            <div className={classes.buttonWrapper}>
                {scheduledDate && (
                    <Button
                        onClick={onSubmitClearScheduleDate}
                        type="submit"
                        variant="text"
                        color="primary"
                        size="small"
                        disabled={isValidSelectedDate}
                    >
                        {t("CLEAR", { defaultValue: "Clear" })}
                    </Button>
                )}
                <Button
                    onClick={onSubmitScheduleDate}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={isValidSelectedDate}
                >
                    {scheduledDate
                        ? t("UPDATE", { defaultValue: "Update" })
                        : t("CONFIRM", { defaultValue: "Confirm" })}
                </Button>
            </div>
        </DialogTitle>
    );
});

export default ScheduleTitle;
