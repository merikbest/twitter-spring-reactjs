import React, { FC, memo, ReactElement, ReactNode, useCallback, useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

import { usePollStyles } from "./PollStyles";
import PollInput from "./PollInput/PollInput";
import PollSelect from "./PollSelect/PollSelect";
import PollFooter from "./PollFooter/PollFooter";
import AddPollInputButton from "./AddPollInputButton/AddPollInputButton";
import { useDispatch, useSelector } from "react-redux";
import { selectPollData, selectVisiblePoll } from "../../../store/ducks/addTweetForm/selector";
import { setClosePoll, setPollValue } from "../../../store/ducks/addTweetForm/actionCreators";
import { PollInitialState } from "../../../store/ducks/addTweetForm/constants/state";

const Poll: FC = memo((): ReactElement | null => {
    const classes = usePollStyles();
    const dispatch = useDispatch();
    const visiblePoll = useSelector(selectVisiblePoll);
    const { choice1, choice2, choice3, choice4, day, hour, minute } = useSelector(selectPollData);
    const [pollInputSize, setPollInputSize] = useState<number>(0);

    const addPollInput = useCallback((): void => {
        setPollInputSize((prev) => prev + 1);
    }, []);

    const changeChoice = useCallback((data: { [key: string]: any }): void => {
        dispatch(setPollValue({ ...data }  as PollInitialState));
    }, []);

    const showOptions = useCallback((value: number): ReactNode[] => {
        const start = value === 7 ? 1 : 0;
        let options = [];

        for (let i = start; i <= value; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    }, []);

    const onClosePoll = useCallback((): void => {
        setPollInputSize(0);
        dispatch(setClosePoll());
    }, []);

    if (!visiblePoll) {
        return null;
    }

    return (
        <Paper className={classes.container} variant="outlined">
            <div className={classes.pollInputWrapper}>
                <Grid container spacing={0}>
                    <Grid md={(pollInputSize !== 2) ? (11) : (12)} item>
                        <PollInput
                            id={"choice1"}
                            label={"Choice 1"}
                            value={choice1}
                            onChange={changeChoice}
                        />
                        <PollInput
                            id={"choice2"}
                            label={"Choice 2"}
                            value={choice2}
                            onChange={changeChoice}
                        />
                        {(pollInputSize >= 1) && (
                            <PollInput
                                id={"choice3"}
                                label={"Choice 3 (optional)"}
                                value={choice3}
                                onChange={changeChoice}
                            />
                        )}
                        {(pollInputSize === 2) && (
                            <PollInput
                                id={"choice4"}
                                label={"Choice 4 (optional)"}
                                value={choice4}
                                onChange={changeChoice}
                            />
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
                <PollSelect
                    id={"day"}
                    title={"Days"}
                    value={day}
                    onChange={changeChoice}
                    showOptions={showOptions}
                    width={140}
                />
                <PollSelect
                    id={"hour"}
                    title={"Hours"}
                    value={hour}
                    onChange={changeChoice}
                    showOptions={showOptions}
                    width={149}
                />
                <PollSelect
                    id={"minute"}
                    title={"Minutes"}
                    value={minute}
                    onChange={changeChoice}
                    showOptions={showOptions}
                    width={150}
                    marginRight={0}
                />
            </Paper>
            <PollFooter onClosePoll={onClosePoll} />
        </Paper>
    );
});

export default Poll;
