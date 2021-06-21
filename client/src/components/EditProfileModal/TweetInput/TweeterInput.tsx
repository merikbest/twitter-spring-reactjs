import React, {FC, useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';

import {TweetInputField} from "./TweetInputField";
import "./TweeterInputStyles.scss";

interface TweeterInputProps {
    onChange: (...event: any[]) => void;
    value: string
    helperText?: string;
    error?: boolean;
    name: string;
    label: string;
    maxTextLength: number
}

const TweeterInput: FC<TweeterInputProps> = ({onChange, value, helperText, error, name, label, maxTextLength}) => {
    const [focused, setFocused] = useState<boolean>(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    return (
        <div className="input_form_wrapper">
            <div className="input_form_content">
                <div className="input_label">
                    <InputLabel style={{fontSize: "13px"}}>{label}</InputLabel>
                </div>
                {focused ?
                    <div className="input_label count">
                        <InputLabel style={{fontSize: "13px"}}>
                            {value?.length === undefined ? 0 : value.length} / {maxTextLength}
                        </InputLabel>
                    </div> : null
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

