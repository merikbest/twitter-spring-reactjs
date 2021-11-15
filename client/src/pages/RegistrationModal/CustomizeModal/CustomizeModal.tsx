import React, {FC, ReactElement} from 'react';
import {Button, Dialog, DialogContent, Radio, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import {useCustomizeModalStyles} from "./CustomizeModalStyles";

interface CustomizeModalProps {
    open: boolean;
    onClose: () => void;
    onOpenCreateAccount: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const CustomizeModal: FC<CustomizeModalProps> = ({open, onClose, onOpenCreateAccount}): ReactElement => {
    const classes = useCustomizeModalStyles();

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
                    Customize your experience
                </Typography>
                <Typography component={"div"} className={classes.subtitle}>
                    Track where you see Twitter content across the web
                </Typography>
                <Typography component={"div"} className={classes.text}>
                    Twitter uses this data to personalize your experience. This web browsing history will never be
                    stored with your name, email, or phone number.
                </Typography>
                <Radio className={classes.radio} checked={true} color="primary"/>
                <Typography component={"div"}>
                    For more details about these settings, visit the <a
                    href={"https://help.twitter.com/managing-your-account/new-account-settings"} target={"_blank"}
                    className={classes.link}>Help Center</a>.
                </Typography>
                <div className={classes.buttonWrapper}>
                    <Button
                        onClick={() => onOpenCreateAccount(true)}
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

export default CustomizeModal;
