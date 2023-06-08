import React, { FC, ReactElement } from "react";
import InputLabel from "@material-ui/core/InputLabel";

import { useCreateListsModalInputStyles } from "./CreateListsModalInputStyles";
import { ListModalInputField } from "./ListsModalInputField";
import { useFocus } from "../../../../../hook/useFocus";

interface CreateListsModalInputProps {
    onChange: (...event: any[]) => void;
    value: string;
    name: string;
    label: string;
    maxTextLength: number;
    helperText?: string;
    error?: boolean;
}

const CreateListsModalInput: FC<CreateListsModalInputProps> = (
    {
        onChange,
        value,
        name,
        label,
        maxTextLength,
        helperText,
        error
    }
): ReactElement => {
    const classes = useCreateListsModalInputStyles();
    const { focused, onFocus, onBlur } = useFocus();

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {focused && (
                    <InputLabel style={{ fontSize: 12 }}>
                        {!value?.length ? 0 : value.length} / {maxTextLength}
                    </InputLabel>
                )}
            </div>
            <ListModalInputField
                id={name}
                name={name}
                onChange={(event) => onChange(event.target.value)}
                value={value}
                helperText={helperText}
                error={error}
                variant="filled"
                label={label}
                inputProps={{
                    maxLength: maxTextLength
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                multiline={label === "Description"}
                rows={label === "Description" ? 3 : 1}
                fullWidth
            />
        </div>
    );
};

export default CreateListsModalInput;
