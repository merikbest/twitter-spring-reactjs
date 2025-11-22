import React, { FC, ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import { FormControl, InputLabel } from "@material-ui/core";

import { FilledSelect } from "../../../../../../components/FilledSelect/FilledSelect";
import { BirthDateVisibility } from "../../../../../../store/ducks/user/contracts/state";

interface BirthDateSelectProps {
    name: string;
    label: string;
    control: Control<any>;
    children: ReactNode;
    defaultValue?: number | string | BirthDateVisibility;
    error?: boolean;
    width?: number;
    marginRight?: number;
}

const BirthDateSelect: FC<BirthDateSelectProps> = (
    {
        name,
        label,
        control,
        children,
        defaultValue,
        error,
        width,
        marginRight
    }
) => (
    <FormControl variant="filled">
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <>
                    <InputLabel error={error}>{label}</InputLabel>
                    <FilledSelect
                        {...field}
                        variant="filled"
                        error={error}
                        native
                        style={{ width, marginRight }}
                    >
                        {children}
                    </FilledSelect>
                </>
            )}
        />
    </FormControl>
);

export default BirthDateSelect;
