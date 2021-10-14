import React, {FC, ReactElement, useState} from 'react';
import TwitterIcon from "@material-ui/icons/Twitter";
import {Button, Dialog, DialogContent, Typography} from "@material-ui/core";

import {useEmailVerificationModalStyles} from "./EmailVerificationModalStyles";
import {RegistrationInputField} from "../RegistrationInput/RegistrationInputField";
import {AuthApi} from "../../../services/api/authApi";

interface CustomizeModalProps {
    email: string;
    open: boolean;
    onClose: () => void;
    onOpenSetPassword: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const EmailVerificationModal: FC<CustomizeModalProps> = ({email, open, onClose, onOpenSetPassword}): ReactElement => {
    const classes = useEmailVerificationModalStyles()
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [error, setError] = useState<string>("");

    const checkEmailVerificationCode = (): void => {
        AuthApi.checkRegistrationCode(verificationCode)
            .then((response) => onOpenSetPassword(true))
            .catch((error) => setError(error.response.data));
    };

    return (
        <Dialog
            hideBackdrop={true}
            transitionDuration={0}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent style={{paddingTop: 0, paddingBottom: 0}} className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon/>
                </div>
                <Typography component={"div"} className={classes.title}>
                    We sent you a code
                </Typography>
                <Typography component={"div"} className={classes.text}>
                    Enter it below to verify {email}.
                </Typography>
                <div style={{marginTop: 10}}>
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
                <Typography component={"div"} className={classes.link}>
                    Didn't receive email?
                </Typography>
                <div className={classes.buttonWrapper}>
                    <Button
                        disabled={verificationCode === ""}
                        onClick={checkEmailVerificationCode}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Next
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EmailVerificationModal;
