import React, { FC, ReactElement } from "react";

import { useProfileDescriptionInputStyles } from "./ProfileDescriptionInputStyles";
import InputLabel from "@material-ui/core/InputLabel";
import { ProfileDescriptionInputField } from "./ProfileDescriptionInputField";
import { useFocus } from "../../../../../../hook/useFocus";

interface ProfileDescriptionInputProps {
    onChange: (...event: any[]) => void;
    value: string;
    helperText?: string;
    error?: boolean;
    label: string;
    maxTextLength: number;
}

const ProfileDescriptionInput: FC<ProfileDescriptionInputProps> = (
    {
        onChange,
        value,
        helperText,
        error,
        label,
        maxTextLength
    }
): ReactElement => {
    const classes = useProfileDescriptionInputStyles();
    const { focused, onFocus, onBlur } = useFocus();

    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                {focused && (
                    <div className={classes.inputCount}>
                        <InputLabel style={{ marginTop: -5, fontSize: 12 }}>
                            {!value?.length ? 0 : value.length} / {maxTextLength}
                        </InputLabel>
                    </div>
                )}
            </div>
            <ProfileDescriptionInputField
                label={label}
                variant="filled"
                onChange={onChange}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                helperText={helperText}
                error={error}
                inputProps={{
                    maxLength: maxTextLength
                }}
                fullWidth
            />
        </div>
    );
};

export default ProfileDescriptionInput;
