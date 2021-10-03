import React, {FC, ReactElement, useState} from 'react';
import InputLabel from "@material-ui/core/InputLabel";

import {useCreateListsModalInputStyles} from "./CreateListsModalInputStyles";
import {ListModalInputField} from "./ListsModalInputField";

interface CreateListsModalInputProps {
    onChange: (...event: any[]) => void;
    value?: string;
    label: string;
    maxTextLength: number;
    helperText?: string;
    error?: boolean;
}

const CreateListsModalInput: FC<CreateListsModalInputProps> = (
    {
        onChange,
        value,
        label,
        maxTextLength,
        helperText,
        error
    }
): ReactElement => {
    const classes = useCreateListsModalInputStyles();
    const [focused, setFocused] = useState<boolean>(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {focused && (
                    <InputLabel style={{fontSize: 12}}>
                        {value?.length === undefined ? 0 : value.length} / {maxTextLength}
                    </InputLabel>
                )}
            </div>
            <ListModalInputField
                label={label}
                variant="filled"
                onChange={(event) => onChange(event.target.value)}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                helperText={helperText}
                error={error}
                inputProps={{
                    maxLength: maxTextLength,
                }}
                multiline={label === "Description"}
                rows={label === "Description" ? 3 : 1}
                fullWidth
            />
        </div>
    );
};

export default CreateListsModalInput;
