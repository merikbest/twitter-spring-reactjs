import React, { FC, memo, ReactElement } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import { useDispatch } from "react-redux";

import { usePollInputStyles } from "./PollInputField";
import { PollInputField } from "./PollInputStyles";
import { setPollValue } from "../../../../store/ducks/addTweetForm/actionCreators";
import { PollInitialState } from "../../../../store/ducks/addTweetForm/constants/state";
import { useFocus } from "../../../../hook/useFocus";

interface PollInputProps {
    id: "choice1" | "choice2" | "choice3" | "choice4";
    value: string;
    label: string;
}

const PollInput: FC<PollInputProps> = memo(({ id, value, label }): ReactElement => {
    const dispatch = useDispatch();
    const classes = usePollInputStyles();
    const { focused, onFocus, onBlur } = useFocus();

    const changeChoice = (data: { [key: string]: any }): void => {
        dispatch(setPollValue({ ...data }  as PollInitialState));
    };

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {focused && (
                    <InputLabel style={{ fontSize: 12 }}>
                        {!value?.length ? 0 : value.length} / {25}
                    </InputLabel>
                )}
            </div>
            <PollInputField
                id={id}
                label={label}
                variant="filled"
                onChange={(event) => changeChoice({ [id]: event.target.value as string })}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                inputProps={{ maxLength: 25 }}
                fullWidth
            />
        </div>
    );
});

export default PollInput;
