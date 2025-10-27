import React, { FC, ReactElement } from "react";
import { Link as MuiLink, Typography } from "@material-ui/core";

import { useEmailVerificationModalStyles } from "./EmailVerificationModalStyles";
import { RegistrationInputField } from "../RegistrationInput/RegistrationInputField";
import DialogWrapper from "../DialogWrapper";
import { useEmailVerificationModal } from "./useEmailVerificationModal";

const EmailVerificationModal: FC = (): ReactElement => {
    const classes = useEmailVerificationModalStyles();
    const {
        registrationInfo,
        registrationStep4,
        errorMessage,
        verificationCode,
        checkEmailVerificationCode,
        onChangeVerificationCode
    } = useEmailVerificationModal();

    return (
        <DialogWrapper
            isOpen={registrationStep4}
            onClick={checkEmailVerificationCode}
            disabledButton={!verificationCode}
        >
            <Typography variant="h3" component="div">
                We sent you a code
            </Typography>
            <Typography variant="subtitle1" component="div">
                {`Enter it below to verify ${registrationInfo.email}.`}
            </Typography>
            <div style={{ marginTop: 10 }}>
                <RegistrationInputField
                    label="Verification code"
                    variant="filled"
                    helperText={errorMessage}
                    error={errorMessage !== null}
                    value={verificationCode}
                    onChange={onChangeVerificationCode}
                    fullWidth
                />
            </div>
            <MuiLink variant="subtitle2" href="#" className={classes.emailLinkWrapper}>
                Didn't receive email?
            </MuiLink>
        </DialogWrapper>
    );
};

export default EmailVerificationModal;
