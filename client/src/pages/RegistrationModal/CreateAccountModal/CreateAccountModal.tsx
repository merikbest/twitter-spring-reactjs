import React, {FC, ReactElement} from 'react';
import {Button, Dialog, DialogContent} from "@material-ui/core";

import {useCreateAccountModalStyles} from "./CreateAccountModalStyles";
import {RegistrationInputField} from "../RegistrationInput/RegistrationInputField";
import {RegistrationInfo} from "../../Authentication/Authentication";
import {AuthApi} from "../../../services/api/authApi";

interface CustomizeModalProps {
    open: boolean;
    onClose: () => void;
    registrationInfo: RegistrationInfo;
    onOpenEmailVerification: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const CreateAccountModal: FC<CustomizeModalProps> = ({
                                                         open,
                                                         onClose,
                                                         registrationInfo,
                                                         onOpenEmailVerification
                                                     }): ReactElement => {
    const classes = useCreateAccountModalStyles();

    const onSubmit = (): void => {
        AuthApi.sendRegistrationCode(registrationInfo)
            .then((response) => onOpenEmailVerification(true))
            .catch((error) => console.log(error.reponse));
    };

    return (
        <Dialog
            hideBackdrop={true}
            style={{height: 666, marginTop: 92}}
            transitionDuration={0}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent style={{paddingTop: 0, paddingBottom: 0}} className={classes.container}>
                <div className={classes.title}>
                    Step 3 of 5
                </div>
                <div className={classes.subtitle}>
                    Create your account
                </div>
                <div className={classes.form}>
                    <RegistrationInputField
                        disabled={true}
                        label="Name"
                        variant="filled"
                        value={registrationInfo.username}
                        fullWidth
                    />
                    <RegistrationInputField
                        disabled={true}
                        label="Email"
                        variant="filled"
                        value={registrationInfo.email}
                        fullWidth
                    />
                    <RegistrationInputField
                        disabled={true}
                        label="Birth date"
                        variant="filled"
                        value={registrationInfo.birthday}
                        fullWidth
                    />
                </div>
                <div className={classes.text}>
                    By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>,
                    including <span>Cookie Use</span>. Others will be able to find you by email or phone number when
                    provided · <span>Privacy Options</span>
                </div>
                <Button
                    className={classes.button}
                    onClick={onSubmit}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Sign up
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAccountModal;
