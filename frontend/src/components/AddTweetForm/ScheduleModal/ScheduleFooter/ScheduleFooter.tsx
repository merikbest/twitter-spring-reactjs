import React, { FC, memo, ReactElement } from "react";
import { Button } from "@material-ui/core";

import { useScheduleModalStyles } from "../ScheduleModalStyles";

interface ScheduleFooterProps {
    onOpenUnsentTweetsModal: () => void;
}

const ScheduleFooter: FC<ScheduleFooterProps> = memo(({ onOpenUnsentTweetsModal }): ReactElement => {
    const classes = useScheduleModalStyles();

    return (
        <div className={classes.footer}>
            <Button onClick={onOpenUnsentTweetsModal} variant="text" color="primary">
                Scheduled Tweets
            </Button>
        </div>
    );
});

export default ScheduleFooter;
