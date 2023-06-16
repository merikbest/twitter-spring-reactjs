import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as MuiLink, Radio, Typography } from "@material-ui/core";

import { useCustomizeModalStyles } from "./CustomizeModalStyles";
import { NEW_ACCOUNT_SETTINGS } from "../../../constants/url-constants";
import DialogWrapper from "../DialogWrapper/DialogWrapper";
import { selectRegistrationStep2 } from "../../../store/ducks/authentication/selector";
import { setRegistrationStep } from "../../../store/ducks/authentication/actionCreators";
import { RegistrationStep } from "../../../types/auth";

const CustomizeModal: FC = (): ReactElement => {
    const classes = useCustomizeModalStyles();
    const dispatch = useDispatch();
    const registrationStep2 = useSelector(selectRegistrationStep2);

    const onOpenCreateAccount = (): void => {
        dispatch(setRegistrationStep(RegistrationStep.STEP_3));
    };

    return (
        <DialogWrapper isOpen={registrationStep2} onClick={onOpenCreateAccount}>
            <Typography variant={"h3"} component={"div"} className={classes.title}>
                Customize your experience
            </Typography>
            <Typography component={"div"} className={classes.subtitle}>
                Track where you see Twitter content across the web
            </Typography>
            <Typography variant={"subtitle1"} component={"div"} className={classes.text}>
                Twitter uses this data to personalize your experience. This web browsing history will never be
                stored with your name, email, or phone number.
            </Typography>
            <Radio className={classes.radio} color="primary" checked />
            <Typography variant={"body1"} component={"div"}>
                {"For more details about these settings, visit the "}
                <MuiLink href={NEW_ACCOUNT_SETTINGS} variant="body1" target="_blank" rel="noopener">
                    Help Center
                </MuiLink>.
            </Typography>
        </DialogWrapper>
    );
};

export default CustomizeModal;
