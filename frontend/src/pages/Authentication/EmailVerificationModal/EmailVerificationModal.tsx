import React, { FC, ReactElement, useState } from "react";
import { Link as MuiLink, Typography } from "@material-ui/core";

import { useEmailVerificationModalStyles } from "./EmailVerificationModalStyles";
import { RegistrationInputField } from "../RegistrationInput/RegistrationInputField";
import { RegistrationApi } from "../../../services/api/user-service/registrationApi";
import DialogWrapper from "../DialogWrapper/DialogWrapper";

interface CustomizeModalProps {
    email: string;
    isOpen: boolean;
    onClose: () => void;
    onOpenSetPassword: () => void;
}

const EmailVerificationModal: FC<CustomizeModalProps> = (
    {
        email,
        isOpen,
        onClose,
        onOpenSetPassword
    }
): ReactElement => {
    const classes = useEmailVerificationModalStyles();
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [error, setError] = useState<string>("");

    const checkEmailVerificationCode = (): void => {
        RegistrationApi.checkRegistrationCode(verificationCode)
            .then(() => onOpenSetPassword())
            .catch((error) => setError(error.response.data));
    };

    return (
        <DialogWrapper
            isOpen={isOpen}
            onClose={onClose}
            onClick={checkEmailVerificationCode}
            disabledButton={!verificationCode}
            hideBackdrop
            modalShadow
        >
            <Typography variant={"h3"} component={"div"}>
                We sent you a code
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {`Enter it below to verify ${email}.`}
            </Typography>
            <div style={{ marginTop: 10 }}>
                <RegistrationInputField
                    label="Verification code"
                    variant="filled"
                    helperText={error}
                    error={error !== ""}
                    value={verificationCode}
                    onChange={(event) => setVerificationCode(event.target.value)}
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
