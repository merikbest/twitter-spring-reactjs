import React, {FC, ReactElement, useState} from 'react';
import {Button, Dialog, DialogContent, Link as MuiLink, Typography} from "@material-ui/core";

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
                        <Typography variant={"h5"} component={"div"} className={classes.subtitle}>
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
                        <Typography variant={"body1"} component={"div"} className={classes.text}>
                            {"By signing up, you agree to the "}
                            <MuiLink href="https://twitter.com/tos#new" variant="body1" target="_blank" rel="noopener">
                                Terms of Service
                            </MuiLink>
                            {" and "}
                            <MuiLink href="https://twitter.com/privacy" variant="body1" target="_blank" rel="noopener">
                                Privacy Policy
                            </MuiLink>
                            {", including "}
                            <MuiLink href="https://help.twitter.com/rules-and-policies/twitter-cookies" variant="body1"
                                target="_blank" rel="noopener">
                                Cookie Use
                            </MuiLink>
                            {". Others will be able to find you by email or phone number when provided · "}
                            <MuiLink href="https://twitter.com/privacy" variant="body1" target="_blank" rel="noopener">
                                Privacy Options
                            </MuiLink>
                        </Typography>
                        <Button
                            className={classes.button}
                            onClick={onSubmit}
                            variant="contained"
                            color="primary"
                            size="small"
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
