import React, {FC, useState} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import {TweetInputField} from "./TweetInputField";
import "./TweeterInputStyles.scss";

interface TweeterInputProps {
    label: string;
    maxTextLength: number
}

const TweeterInput: FC<TweeterInputProps> = ({label, maxTextLength}) => {
    const [text, setText] = useState<string>("");
    const [focused, setFocused] = useState<boolean>(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const handleChangeTextarea = (event: any): void => {
        if (event.currentTarget) {
            setText(event.currentTarget.value);
        }
    };

    return (
        <div className={label === "Bio" ? "input_form_wrapper_bio" : "input_form_wrapper"}>
            <FormControl className={"input_form"} variant="outlined">
                <div className={"input_form_content"}>
                    <div className={"input_label"}>
                        <InputLabel>{label}</InputLabel>
                    </div>
                    {text && focused ?
                        <div className={"input_label count"}>
                            <InputLabel>{text.length} / {maxTextLength}</InputLabel>
                        </div> : null}
                </div>
                {label === "Bio" ?
                    <TweetInputField
                        onFocus={onFocus}
                        onBlur={onBlur}
                        multiline
                        rows={3}
                        onChange={handleChangeTextarea}
                        value={text}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                    /> :
                    <TweetInputField
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={handleChangeTextarea}
                        value={text}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                    />
                }
            </FormControl>
        </div>

    );
};

export default TweeterInput;

