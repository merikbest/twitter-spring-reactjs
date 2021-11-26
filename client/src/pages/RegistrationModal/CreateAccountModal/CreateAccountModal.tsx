import React, {FC, ReactElement, useState} from 'react';
import {Button, CircularProgress, Dialog, DialogContent, Typography} from "@material-ui/core";

import {useCreateAccountModalStyles} from "./CreateAccountModalStyles";
import {RegistrationInputField} from "../RegistrationInput/RegistrationInputField";
import {RegistrationInfo} from "../../Authentication/Authentication";
import {AuthApi} from "../../../services/api/authApi";
import Spinner from "../../../components/Spinner/Spinner";

interface CustomizeModalProps {
    open: boolean;
    onClose: () => void;
    registrationInfo: RegistrationInfo;
    onOpenEmailVerification: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const CreateAccountModal: FC<CustomizeModalProps> = (
    {
        open,
        onClose,
        registrationInfo,
        onOpenEmailVerification
    }
): ReactElement => {
    const classes = useCreateAccountModalStyles();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = (): void => {
        setIsLoading(true);

        AuthApi.sendRegistrationCode(registrationInfo)
            .then((response) => {
                setIsLoading(false);
                onOpenEmailVerification(true);
            })
            .catch((error) => {
                console.log(error.reponse);
                setIsLoading(false);
            });
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
                <Typography component={"div"} className={classes.title}>
                    Step 3 of 5
                </Typography>
                {isLoading ? (
                    <Spinner/>
                ) : (
                    <>
                        <Typography component={"div"} className={classes.subtitle}>
                            Create your account
                        </Typography>
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
                        <Typography component={"div"} className={classes.text}>
                            By signing up, you agree to
                            the <a href={"https://twitter.com/tos#new"} target={"_blank"} className={classes.link}>Terms
                            of Service</a> and <a href={"https://twitter.com/privacy"} target={"_blank"} className={classes.link}>
                            Privacy Policy</a>, including <a href={"https://help.twitter.com/rules-and-policies/twitter-cookies"}
                            target={"_blank"} className={classes.link}>Cookie Use</a>. Others
                            will be able to find you by email or phone number
                            when
                            provided · <a href={""} target={"_blank"} className={classes.link}>Privacy Options</a>
                        </Typography>
                        <Button
                            className={classes.button}
                            onClick={onSubmit}
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Sign up
                        </Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreateAccountModal;
