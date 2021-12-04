import React, {ChangeEvent, FC, ReactElement, ReactNode, useState} from 'react';
import {FormControl, Grid, InputLabel, Paper} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";

import {usePollStyles} from "./PollStyles";
import PollInput from "./PollInput/PollInput";
import {FilledSelect} from "../../FilledSelect/FilledSelect";
import {HoverActionProps, HoverActions, withHoverAction} from "../../../hoc/withHoverAction";
import HoverAction from "../../HoverAction/HoverAction";

interface PollProps {
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    setChoice1: (value: string | ((prevVar: string) => string)) => void;
    setChoice2: (value: string | ((prevVar: string) => string)) => void;
    setChoice3: (value: string | ((prevVar: string) => string)) => void;
    setChoice4: (value: string | ((prevVar: string) => string)) => void;
    day: number;
    hour: number;
    minute: number;
    setDay: (value: number | ((prevVar: number) => number)) => void;
    setHour: (value: number | ((prevVar: number) => number)) => void;
    setMinute: (value: number | ((prevVar: number) => number)) => void;
    visiblePoll: boolean;
    onClose: () => void;
}

const Poll: FC<PollProps & HoverActionProps> = (
    {
        choice1,
        choice2,
        choice3,
        choice4,
        setChoice1,
        setChoice2,
        setChoice3,
        setChoice4,
        day,
        hour,
        minute,
        setDay,
        setHour,
        setMinute,
        visiblePoll,
        onClose,
        visibleHoverAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement | null => {
    const classes = usePollStyles();
    const [pollInputSize, setPollInputSize] = useState<number>(0);

    const addPollInput = (): void => {
        setPollInputSize((prev) => prev + 1);
    };

    const changeDay = (event: ChangeEvent<{ value: unknown }>): void => {
        setDay(event.target.value as number);
    };

    const changeHour = (event: ChangeEvent<{ value: unknown }>): void => {
        setHour(event.target.value as number);
    };

    const changeMinute = (event: ChangeEvent<{ value: unknown }>): void => {
        setMinute(event.target.value as number);
    };

    const showOptions = (value: number): ReactNode[] => {
        const start = value === 7 ? 1 : 0;
        let days = [];

        for (let i = start; i <= value; i++) {
            days.push(<option value={i}>{i}</option>);
        }
        return days;
    };

    const onClosePool = (): void => {
        setPollInputSize(0);
        onClose();
    };

    if (!visiblePoll) {
        return null;
    }

    return (
        <Paper className={classes.container} variant="outlined">
            <div className={classes.pollInputWrapper}>
                <Grid container spacing={0}>
                    <Grid md={(pollInputSize !== 2) ? (11) : (12)} item>
                        <PollInput label="Choice 1" value={choice1} onChange={setChoice1}/>
                        <PollInput label="Choice 2" value={choice2} onChange={setChoice2}/>
                        {(pollInputSize >= 1) && (
                            <PollInput label="Choice 3 (optional)" value={choice3} onChange={setChoice3}/>
                        )}
                        {(pollInputSize === 2) && (
                            <PollInput label="Choice 4 (optional)" value={choice4} onChange={setChoice4}/>
                        )}
                    </Grid>
                    {(pollInputSize !== 2) ? (
                        <Grid md={1} item>
                            <div
                                className={classes.addPollInputWrapper}
                                style={{minHeight: (pollInputSize === 0) ? 115 : 185}}
                            >
                                <IconButton
                                    className={classes.addPollInputButton}
                                    onClick={addPollInput}
                                    color="secondary"
                                    aria-label="close"
                                    onMouseEnter={() => handleHoverAction?.(HoverActions.OTHER)}
                                    onMouseLeave={handleLeaveAction}
                                >
                                    <AddIcon color="primary"/>
                                    <HoverAction visible={visibleHoverAction?.visibleOtherAction} actionText={"Add"}/>
                                </IconButton>
                            </div>
                        </Grid>
                    ) : null}
                </Grid>
            </div>
            <Paper className={classes.pollLength} variant="outlined">
                <div className={classes.pollLengthTitle}>
                    Poll length
                </div>
                <FormControl variant="filled">
                    <InputLabel variant="filled" htmlFor="select-days">
                        Days
                    </InputLabel>
                    <FilledSelect
                        variant="filled"
                        className={classes.pollSelect}
                        style={{width: 140}}
                        labelId="select-days"
                        id="select-days"
                        native
                        value={day}
                        onChange={changeDay}
                    >
                        {showOptions(7)}
                    </FilledSelect>
                </FormControl>
                <FormControl variant="filled">
                    <InputLabel variant="filled" htmlFor="select-hours">
                        Hours
                    </InputLabel>
                    <FilledSelect
                        variant="filled"
                        className={classes.pollSelect}
                        style={{width: 149}}
                        labelId="select-hours"
                        id="select-hours"
                        native
                        value={hour}
                        onChange={changeHour}
                    >
                        {showOptions(23)}
                    </FilledSelect>
                </FormControl>
                <FormControl variant="filled">
                    <InputLabel variant="filled" htmlFor="select-minutes">
                        Minutes
                    </InputLabel>
                    <FilledSelect
                        variant="filled"
                        className={classes.pollSelect}
                        style={{width: 150, marginRight: 0}}
                        labelId="select-minutes"
                        id="select-minutes"
                        native
                        value={minute}
                        onChange={changeMinute}
                    >
                        {showOptions(59)}
                    </FilledSelect>
                </FormControl>
            </Paper>
            <Paper onClick={onClosePool} className={classes.footer} variant="outlined">
                <div>Remove poll</div>
            </Paper>
        </Paper>
    );
};

export default withHoverAction(Poll);
