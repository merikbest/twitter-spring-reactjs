import React, { FC, memo, ReactElement, ReactNode } from "react";
import { FormControl, InputLabel } from "@material-ui/core";

import { FilledSelect } from "../../../FilledSelect/FilledSelect";
import { usePollStyles } from "../PollStyles";

interface PollDaySelectProps {
    id: "day" | "hour" | "minute";
    title: string;
    value: number;
    onChange: (value: { [key: string]: any }) => void;
    showOptions: (value: number) => ReactNode[];
    width: number;
    marginRight?: number;
}

const PollSelect: FC<PollDaySelectProps> = memo((
    {
        id,
        title,
        value,
        onChange,
        showOptions,
        width,
        marginRight
    }
): ReactElement => {
    const classes = usePollStyles();

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
                onChange={(event) => onChange({ [id]: event.target.value as number })}
                style={{ width, marginRight }}
                native
            >
                {showOptions(id === "day" && 7 || id === "hour" && 24 || 60)}
            </FilledSelect>
        </FormControl>
    );
});

export default PollSelect;
