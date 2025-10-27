import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { Controller } from "react-hook-form";

import { useSetPasswordModalStyles } from "./SetPasswordModalStyles";
import { RegistrationInputField } from "../RegistrationInput/RegistrationInputField";
import DialogWrapper from "../DialogWrapper";
import { useSetPasswordModal } from "./useSetPasswordModal";

const SetPasswordModal: FC = (): ReactElement => {
    const classes = useSetPasswordModalStyles();
    const { registrationStep5, control, handleSubmit, watch, errors, onSubmit } = useSetPasswordModal();

    return (
        <DialogWrapper
            isOpen={registrationStep5}
            onClick={handleSubmit(onSubmit)}
            disabledButton={!watch("password")}
        >
            <Typography variant="h3" component="div" className={classes.title}>
                You'll need a password
            </Typography>
            <Typography variant="subtitle1" component="div" className={classes.subtitle}>
                Make sure it’s 8 characters or more.
            </Typography>
            <div className={classes.controllerWrapper}>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <RegistrationInputField
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            helperText={errors.password?.message}
                            error={!!errors.password}
                            fullWidth
                        />
                    )}
                />
            </div>
        </DialogWrapper>
    );
};

export default SetPasswordModal;
