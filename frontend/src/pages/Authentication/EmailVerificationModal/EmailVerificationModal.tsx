import React, { FC, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as MuiLink, Typography } from "@material-ui/core";

import { useEmailVerificationModalStyles } from "./EmailVerificationModalStyles";
import { RegistrationInputField } from "../RegistrationInput/RegistrationInputField";
import DialogWrapper from "../DialogWrapper/DialogWrapper";
import { selectRegistrationInfo, selectRegistrationStep4 } from "../../../store/ducks/authentication/selector";
import { fetchCheckRegistrationCode } from "../../../store/ducks/authentication/actionCreators";

const EmailVerificationModal: FC = (): ReactElement => {
    const classes = useEmailVerificationModalStyles();
    const dispatch = useDispatch();
    const registrationInfo = useSelector(selectRegistrationInfo);
    const registrationStep4 = useSelector(selectRegistrationStep4);
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [error, setError] = useState<string>("");

    const checkEmailVerificationCode = (): void => {
        dispatch(fetchCheckRegistrationCode(verificationCode));
    };

    return (
        <DialogWrapper
            isOpen={registrationStep4}
            onClick={checkEmailVerificationCode}
            disabledButton={!verificationCode}
        >
            <Typography variant={"h3"} component={"div"}>
                We sent you a code
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {`Enter it below to verify ${registrationInfo.email}.`}
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
