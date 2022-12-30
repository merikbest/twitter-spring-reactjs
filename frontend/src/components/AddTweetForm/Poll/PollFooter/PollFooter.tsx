import React, {FC, memo, ReactElement} from "react";
import {Paper, Typography} from "@material-ui/core";

import {usePollStyles} from "../PollStyles";

interface PollFooterProps {
    onClosePoll: () => void;
}

const PollFooter: FC<PollFooterProps> = memo(({onClosePoll}): ReactElement => {
    const classes = usePollStyles();

    return (
        <Paper id={"removePoll"} onClick={onClosePoll} className={classes.footer} variant="outlined">
            <Typography variant={"body1"} component={"div"}>
                Remove poll
            </Typography>
        </Paper>
    );
});

export default PollFooter;
