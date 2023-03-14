import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Dialog, DialogContent, Link as MuiLink, Typography } from "@material-ui/core";
import * as yup from "yup";

import { useChangeEmailModalStyles } from "./ChangeEmailModalStyles";
import { TweetIcon } from "../../../../../../icons";
import {
    selectUserIsError,
    selectUserIsLoading,
    selectUserProfileEmail
} from "../../../../../../store/ducks/user/selectors";
import { ChangeInfoTextField } from "../../../../ChangeInfoTextField/ChangeInfoTextField";
import { updateEmail } from "../../../../../../store/ducks/user/actionCreators";
import { EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS } from "../../../../../../constants/url-constants";


interface ChangeEmailModalProps {
    visible?: boolean;
    onClose: () => void;
}

interface EmailFormProps {
    email: string;
}

const SetEmailFormSchema = yup.object().shape({
    email: yup.string().email("Invalid mail").required("Please enter a valid email address.")
});

const ChangeEmailModal: FC<ChangeEmailModalProps> = ({ visible, onClose }): ReactElement | null => {
    const classes = useChangeEmailModalStyles();
    const dispatch = useDispatch();
    const myProfileEmail = useSelector(selectUserProfileEmail);
    const isLoading = useSelector(selectUserIsLoading);
    const isError = useSelector(selectUserIsError);
    const { control, handleSubmit, formState: { errors }, getValues } = useForm<EmailFormProps>({
        resolver: yupResolver(SetEmailFormSchema),
        mode: "onChange"
    });

    const onSubmit = (data: EmailFormProps): void => {
        dispatch(updateEmail({ email: data.email }));
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog transitionDuration={0} open={visible} onClose={onClose} className={classes.dialog}>
            <DialogContent className={classes.content}>
                <div className={classes.logoIcon}>
                    {TweetIcon}
                </div>
                <div>
                    <Typography variant={"h3"} component={"div"}>
                        Change email
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"}>
                        {`Your current email is ${myProfileEmail}. What would you like to update it to? Your email
                        is not displayed in your public profile on Twitter.`}
                    </Typography>
                </div>
                <form onSubmit={(!getValues("email") || errors.email) ? onClose : handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
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
                        <Typography variant={"body1"} component={"span"}>
                            {"Let people who have your email address find and connect with you on Twitter. "}
                            <MuiLink href={EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS} variant="body1" target="_blank"
                                     rel="noopener">
                                Learn more
                            </MuiLink>
                        </Typography>
                        <span><Checkbox /></span>
                    </div>
                    <div className={classes.footer}>
                        <Button
                            variant={(!getValues("email") || errors.email) ? "outlined" : "contained"}
                            type="submit"
                            color="primary"
                            size="small"
                            fullWidth
                        >
                            {(!getValues("email") || errors.email) ? "Cancel" : "Next"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeEmailModal;
