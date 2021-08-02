import React, {FC, ReactElement, useState} from 'react';
import InputLabel from "@material-ui/core/InputLabel";

import {useRegistrationInputStyles} from "./RegistrationInputStyles";
import {RegistrationInputField} from "./RegistrationInputField";

interface RegistrationInputProps {
    onChange: (...event: any[]) => void;
    value: string
    helperText?: string;
    error?: boolean;
    name: string;
    label: string;
    maxTextLength: number
}

const RegistrationInput: FC<RegistrationInputProps> = ({
                                                           onChange,
                                                           value,
                                                           helperText,
                                                           error,
                                                           name,
                                                           label,
                                                           maxTextLength
                                                       }): ReactElement => {
    const classes = useRegistrationInputStyles();
    const [focused, setFocused] = useState<boolean>(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {focused && (
                    <div className={classes.inputCount}>
                        <InputLabel style={{marginTop: -5, fontSize: 12}}>
                            {value?.length === undefined ? 0 : value.length} / {maxTextLength}
                        </InputLabel>
                    </div>
                )}
            </div>
            <RegistrationInputField
                label={label}
                variant="filled"
                onChange={onChange}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                helperText={helperText}
                error={error}
                inputProps={{
                    maxLength: maxTextLength,
                }}
                fullWidth
            />
        </div>
    );
};

export default RegistrationInput;
