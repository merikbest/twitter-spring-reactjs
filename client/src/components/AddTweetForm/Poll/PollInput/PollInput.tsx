import React, {FC, ReactElement, useState} from 'react';
import InputLabel from "@material-ui/core/InputLabel";

import {usePollInputStyles} from "./PollInputField";
import {PollInputField} from "./PollInputStyles";

interface PollInputProps {
    onChange: (...event: any[]) => void;
    value: string;
    label: string;
}

const PollInput: FC<PollInputProps> = ({onChange, value, label}): ReactElement => {
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
                label={label}
                variant="filled"
                onChange={(event) => onChange(event.target.value)}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                inputProps={{
                    maxLength: 25,
                }}
                fullWidth
            />
        </div>
    );
};

export default PollInput;
