import React, { FC, memo, ReactElement, useCallback, useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import { usePollStyles } from "./PollStyles";
import PollInput from "./PollInput/PollInput";
import PollSelect from "./PollSelect/PollSelect";
import PollFooter from "./PollFooter/PollFooter";
import AddPollInputButton from "./AddPollInputButton/AddPollInputButton";
import { selectPollData, selectVisiblePoll } from "../../../store/ducks/addTweetForm/selector";

const Poll: FC = memo((): ReactElement | null => {
    const classes = usePollStyles();
    const visiblePoll = useSelector(selectVisiblePoll);
    const { choice1, choice2, choice3, choice4, day, hour, minute } = useSelector(selectPollData);
    const [pollInputSize, setPollInputSize] = useState<number>(0);

    useEffect(() => () => setPollInputSize(0), [visiblePoll]);

    const addPollInput = useCallback((): void => {
        setPollInputSize((prev) => prev + 1);
    }, []);

    if (!visiblePoll) {
        return null;
    }

    return (
        <Paper className={classes.container} variant="outlined">
            <div className={classes.pollInputWrapper}>
                <Grid container spacing={0}>
                    <Grid md={(pollInputSize !== 2) ? (11) : (12)} item>
                        <PollInput id={"choice1"} label={"Choice 1"} value={choice1} />
                        <PollInput id={"choice2"} label={"Choice 2"} value={choice2} />
                        {(pollInputSize >= 1) && (
                            <PollInput id={"choice3"} label={"Choice 3 (optional)"} value={choice3} />
                        )}
                        {(pollInputSize === 2) && (
                            <PollInput id={"choice4"} label={"Choice 4 (optional)"} value={choice4} />
                        )}
                    </Grid>
                    {(pollInputSize !== 2) && (
                        <AddPollInputButton pollInputSize={pollInputSize} addPollInput={addPollInput} />
                    )}
                </Grid>
            </div>
            <Paper className={classes.pollLength} variant="outlined">
                <Typography variant={"body1"} component={"div"} className={classes.pollLengthTitle}>
                    Poll length
                </Typography>
                <PollSelect id={"day"} title={"Days"} value={day} width={140} />
                <PollSelect id={"hour"} title={"Hours"} value={hour} width={149} />
                <PollSelect id={"minute"} title={"Minutes"} value={minute} width={150} marginRight={0} />
            </Paper>
            <PollFooter />
        </Paper>
    );
});

export default Poll;
