import React, {FC} from 'react';

import {useCustomizeModalStyles} from "./CustomizeModalStyles";
import {Button, Dialog, DialogContent, Radio} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

interface CustomizeModalProps {
    open: boolean;
    onClose: () => void;
}

const CustomizeModal:FC<CustomizeModalProps> = ({open, onClose}) => {
    const classes = useCustomizeModalStyles();
    // hideBackdrop={true}

    return (
        <Dialog style={{height: 666, marginTop: 92}} transitionDuration={0} open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogContent style={{paddingTop: 0, paddingBottom: 0}} className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon/>
                </div>
                <div className={classes.title}>
                    Customize your experience
                </div>
                <div className={classes.subtitle}>
                    Track where you see Twitter content across the web
                </div>
                <div className={classes.text}>
                    Twitter uses this data to personalize your experience. This web browsing history will never be
                    stored with your name, email, or phone number.
                </div>
                <Radio className={classes.radio} checked={true} color="primary"/>
                <div>
                    For more details about these settings, visit the <span className={classes.link}>Help Center</span>.
                </div>
                <Button
                    style={{marginTop: 285}}
                    // type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Next
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default CustomizeModal;
