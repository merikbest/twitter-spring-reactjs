import React, { FC, ReactElement } from "react";
import { Link as MuiLink, Radio, Typography } from "@material-ui/core";

import { useCustomizeModalStyles } from "./CustomizeModalStyles";
import { NEW_ACCOUNT_SETTINGS } from "../../../constants/url-constants";
import DialogWrapper from "../DialogWrapper";
import { useCustomizeModal } from "./useCustomizeModal";

const CustomizeModal: FC = (): ReactElement => {
    const classes = useCustomizeModalStyles();
    const { registrationStep2, onOpenCreateAccount } = useCustomizeModal();

    return (
        <DialogWrapper isOpen={registrationStep2} onClick={onOpenCreateAccount}>
            <Typography variant="h3" component="div" className={classes.title}>
                Customize your experience
            </Typography>
            <Typography component="div" className={classes.subtitle}>
                Track where you see Twitter content across the web
            </Typography>
            <Typography variant="subtitle1" component="div" className={classes.text}>
                Twitter uses this data to personalize your experience. This web browsing history will never be
                stored with your name, email, or phone number.
            </Typography>
            <Radio className={classes.radio} color="primary" checked />
            <Typography variant="body1" component="div">
                {"For more details about these settings, visit the "}
                <MuiLink href={NEW_ACCOUNT_SETTINGS} variant="body1" target="_blank" rel="noopener">
                    Help Center
                </MuiLink>.
            </Typography>
        </DialogWrapper>
    );
};

export default CustomizeModal;
