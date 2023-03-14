import React, { FC, memo, ReactElement } from "react";
import { Button, DialogTitle } from "@material-ui/core";

import CloseButton from "../../../CloseButton/CloseButton";
import { useScheduleModalStyles } from "../ScheduleModalStyles";

interface ScheduleModalTitleProps {
    onClose: () => void;
    selectedScheduleDate: Date | null;
    isValidSelectedDate: boolean;
    onSubmitScheduleDate: () => void;
    onSubmitClearScheduleDate: () => void;
}

const ScheduleTitle: FC<ScheduleModalTitleProps> = memo((
    {
        onClose,
        selectedScheduleDate,
        isValidSelectedDate,
        onSubmitScheduleDate,
        onSubmitClearScheduleDate
    }
): ReactElement => {
    const classes = useScheduleModalStyles();

    return (
        <DialogTitle>
            <CloseButton onClose={onClose} />
            Schedule
            <div className={classes.buttonWrapper}>
                {selectedScheduleDate && (
                    <Button
                        onClick={onSubmitClearScheduleDate}
                        type="submit"
                        variant="text"
                        color="primary"
                        size="small"
                        disabled={isValidSelectedDate}
                    >
                        Clear
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
                    {selectedScheduleDate ? "Update" : "Confirm"}
                </Button>
            </div>
        </DialogTitle>
    );
});

export default ScheduleTitle;
