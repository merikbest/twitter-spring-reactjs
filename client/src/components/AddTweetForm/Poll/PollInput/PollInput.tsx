import React, {FC, memo, ReactElement, useState} from 'react';
import InputLabel from "@material-ui/core/InputLabel";

import {usePollInputStyles} from "./PollInputField";
import {PollInputField} from "./PollInputStyles";

interface PollInputProps {
    id: "choice1" | "choice2" | "choice3" | "choice4";
    onChange: (value: { [key: string]: any }) => void;
    value: string;
    label: string;
}

const PollInput: FC<PollInputProps> = memo(({id, onChange, value, label}): ReactElement => {
    const classes = usePollInputStyles();
    const [focused, setFocused] = useState<boolean>(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {focused && (
                    <InputLabel style={{fontSize: 12}}>
                        {value?.length === undefined ? 0 : value.length} / {25}
                    </InputLabel>
                )}
            </div>
            <PollInputField
                id={id}
                label={label}
                variant="filled"
                onChange={(event) => onChange({[id]: event.target.value as string})}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                inputProps={{maxLength: 25}}
                fullWidth
            />
        </div>
    );
});

export default PollInput;
