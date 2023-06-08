import React, { FC, ReactElement } from "react";
import InputLabel from "@material-ui/core/InputLabel";

import { TweetInputField } from "./TweetInputField";
import { useTweetInputStyles } from "./TweetInputStyles";
import { useFocus } from "../../hook/useFocus";

interface TweeterInputProps {
    onChange: (...event: any[]) => void;
    value?: string;
    helperText?: string;
    error?: boolean;
    name: string;
    label: string;
    maxTextLength: number;
    multiline?: boolean;
    rows?: number;
}

const TweetInput: FC<TweeterInputProps> = (
    {
        onChange,
        value,
        helperText,
        error,
        name,
        label,
        maxTextLength,
        multiline,
        rows
    }
): ReactElement => {
    const classes = useTweetInputStyles();
    const { focused, onFocus, onBlur } = useFocus();

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.inputLabel}>
                    <InputLabel style={{ fontSize: 13 }}>
                        {label}
                    </InputLabel>
                </div>
                {focused && (
                    <div className={classes.inputCount}>
                        <InputLabel style={{ fontSize: 13 }}>
                            {!value?.length ? 0 : value.length} / {maxTextLength}
                        </InputLabel>
                    </div>
                )}
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
                    maxLength: maxTextLength
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                fullWidth
                multiline={multiline}
                rows={rows}
            />
        </div>
    );
};

export default TweetInput;

