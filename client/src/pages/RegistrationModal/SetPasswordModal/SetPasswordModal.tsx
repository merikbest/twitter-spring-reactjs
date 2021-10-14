import React, {FC, ReactElement} from 'react';
import {History, LocationState} from "history";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Button, Dialog, DialogContent, Typography} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";
import TwitterIcon from "@material-ui/icons/Twitter";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {useSetPasswordModalStyles} from "./SetPasswordModalStyles";
import {RegistrationInputField} from "../RegistrationInput/RegistrationInputField";
import {fetchSignUp} from "../../../store/ducks/user/actionCreators";

interface SetPasswordProps {
    email: string;
    open: boolean;
    onClose: () => void;
}

interface PasswordFormProps {
    password: string;
}

export interface RegistrationProps {
    email: string;
    password: string;
    history: History<LocationState>;
}

const SetPasswordFormSchema = yup.object().shape({
    password: yup.string().min(8, "Your password needs to be at least 8 characters. Please enter a longer one.").required(),
});

const SetPasswordModal: FC<SetPasswordProps> = ({email, open, onClose}): ReactElement => {
    const classes = useSetPasswordModalStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {control, register, handleSubmit, watch, formState: {errors}} = useForm<PasswordFormProps>({
        resolver: yupResolver(SetPasswordFormSchema),
        mode: "onChange",
    });

    const onSubmit = (data: PasswordFormProps): void => {
        const registrationData: RegistrationProps = {email: email, password: data.password, history: history};
        dispatch(fetchSignUp(registrationData));
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
                    You'll need a password
                </Typography>
                <Typography component={"div"} className={classes.text}>
                    Make sure it’s 8 characters or more.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{marginTop: 10}}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}}) => (
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
                    <Button
                        className={classes.button}
                        disabled={watch("password") === ""}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Next
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SetPasswordModal;
