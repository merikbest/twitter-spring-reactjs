import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Checkbox, Dialog, DialogContent, Typography} from "@material-ui/core";
import classNames from "classnames";
import * as yup from "yup";

import {useChangeEmailModalStyles} from "./ChangeEmailModalStyles";
import {TweetIcon} from "../../../../../../icons";
import {selectUserData, selectUserIsError, selectUserIsLoading} from "../../../../../../store/ducks/user/selectors";
import {ChangeInfoTextField} from "../../../../ChangeInfoTextField/ChangeInfoTextField";
import {updateEmail} from "../../../../../../store/ducks/user/actionCreators";


interface ChangeEmailModalProps {
    visible?: boolean;
    onClose: () => void;
}

interface EmailFormProps {
    email: string;
}

const SetEmailFormSchema = yup.object().shape({
    email: yup.string().email("Invalid mail").required("Please enter a valid email address."),
});

const ChangeEmailModal: FC<ChangeEmailModalProps> = ({visible, onClose}): ReactElement | null => {
    const classes = useChangeEmailModalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isLoading = useSelector(selectUserIsLoading);
    const isError = useSelector(selectUserIsError);
    const {control, register, handleSubmit, watch, formState: {errors}, getValues} = useForm<EmailFormProps>({
        resolver: yupResolver(SetEmailFormSchema),
        mode: "onChange",
    });

    const onSubmit = (data: EmailFormProps): void => {
        dispatch(updateEmail({email: data.email}));
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog
            transitionDuration={0}
            open={visible}
            onClose={onClose}
            className={classes.dialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent className={classes.content}>
                <div className={classes.logoIcon}>
                    {TweetIcon}
                </div>
                <div>
                    <Typography component={"div"} className={classes.title}>
                        Change email
                    </Typography>
                    <Typography component={"div"} className={classNames(classes.text, classes.textSecondary)}>
                        {`Your current email is ${myProfile?.email}. What would you like to update it to? Your email
                        is not displayed in your public profile on Twitter.`}
                    </Typography>
                </div>
                <form onSubmit={(!getValues("email") || !!errors.email) ? onClose : handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}}) => (
                            <ChangeInfoTextField
                                inputMode="email"
                                id="email"
                                name="email"
                                label="Your email"
                                variant="filled"
                                onChange={onChange}
                                value={value}
                                disabled={isLoading}
                                helperText={errors.email?.message || isError && "Please enter a valid email address."}
                                error={!!errors.email || isError}
                                fullWidth
                            />
                        )}
                    />
                    <div className={classes.infoWrapper}>
                        <Typography component={"span"} className={classNames(classes.text, classes.textPrimary)}>
                            Let people who have your email address find and connect with you on Twitter. <a
                            href="https://help.twitter.com/safety-and-security/email-and-phone-discoverability-settings"
                            target={"_blank"} className={classes.link}>Learn more</a>
                        </Typography>
                        <span><Checkbox/></span>
                    </div>
                    <div className={classes.footer}>
                        <Button
                            color="primary"
                            variant={(!getValues("email") || !!errors.email) ? "outlined" : "contained"}
                            type="submit"
                            fullWidth
                        >
                            {(!getValues("email") || !!errors.email) ? "Cancel" : "Next"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeEmailModal;
