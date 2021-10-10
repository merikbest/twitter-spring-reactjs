import React, {FC, ReactElement, useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';

import {TweetInputField} from "./TweetInputField";
import {useTweetInputStyles} from "./TweetInputStyles";

interface TweeterInputProps {
    onChange: (...event: any[]) => void;
    value: string
    helperText?: string;
    error?: boolean;
    name: string;
    label: string;
    maxTextLength: number
}

const TweeterInput: FC<TweeterInputProps> = (
    {
        onChange,
        value,
        helperText,
        error,
        name,
        label,
        maxTextLength
    }
): ReactElement => {
    const classes = useTweetInputStyles();
    const [focused, setFocused] = useState<boolean>(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.inputLabel}>
                    <InputLabel style={{fontSize: 13}}>
                        {label}
                    </InputLabel>
                </div>
                {focused && (
                    <div className={classes.inputCount}>
                        <InputLabel style={{fontSize: 13}}>
                            {value?.length === undefined ? 0 : value.length} / {maxTextLength}
                        </InputLabel>
                    </div>)
                }
            </div>
            <TweetInputField
                id={name}
                name={name}
                onChange={onChange}
                value={value}
                helperText={helperText}
                error={error}
                variant="outlined"
                inputProps={{
                    maxLength: maxTextLength,
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                fullWidth
                multiline={label === "Bio"}
                rows={label === "Bio" ? 3 : 1}
            />
        </div>
    );
};

export default TweeterInput;

