import React, { FC, memo, ReactElement, ReactNode } from "react";
import { FormControl, InputLabel } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { FilledSelect } from "../../../FilledSelect/FilledSelect";
import { usePollStyles } from "../PollStyles";
import { setPollValue } from "../../../../store/ducks/addTweetForm/actionCreators";
import { PollInitialState } from "../../../../store/ducks/addTweetForm/constants/state";

interface PollDaySelectProps {
    id: "day" | "hour" | "minute";
    title: string;
    value: number;
    width: number;
    marginRight?: number;
}

const PollSelect: FC<PollDaySelectProps> = memo(({ id, title, value, width, marginRight }): ReactElement => {
    const dispatch = useDispatch();
    const classes = usePollStyles();

    const changeChoice = (data: { [key: string]: any }): void => {
        dispatch(setPollValue({ ...data }  as PollInitialState));
    };

    const showOptions = (value: number): ReactNode[] => {
        const start = value === 7 ? 1 : 0;
        let options = [];

        for (let i = start; i <= value; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    };

    return (
        <FormControl variant="filled">
            <InputLabel variant="filled" htmlFor={`select-${id}`}>
                {title}
            </InputLabel>
            <FilledSelect
                variant="filled"
                className={classes.pollSelect}
                labelId={`select-${id}`}
                id={`select-${id}`}
                value={value}
                onChange={(event) => changeChoice({ [id]: event.target.value as number })}
                style={{ width, marginRight }}
                native
            >
                {showOptions(id === "day" && 7 || id === "hour" && 24 || 60)}
            </FilledSelect>
        </FormControl>
    );
});

export default PollSelect;
