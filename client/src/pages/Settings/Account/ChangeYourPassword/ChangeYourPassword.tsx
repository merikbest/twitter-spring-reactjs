import React, {FC, ReactElement, useState} from 'react';

import {useChangeYourPasswordStyles} from "./ChangeYourPasswordStyles";
import {Button, Paper} from "@material-ui/core";
import {ChangeInfoTextField} from "../../ChangeInfoTextField/ChangeInfoTextField";

const ChangeYourPassword: FC = (): ReactElement => {
    const classes = useChangeYourPasswordStyles();
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPassword2, setNewPassword2] = useState<string>("");


    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    <div className={classes.textFieldWrapper}>
                        <ChangeInfoTextField
                            label="Current password"
                            type="text"
                            variant="filled"
                            value={currentPassword}
                            fullWidth
                        />
                        <span className={classes.link}>Forgot password?</span>
                    </div>
                    <div className={classes.divider}/>
                    <div className={classes.textFieldWrapper}>
                        <ChangeInfoTextField
                            label="New password"
                            type="text"
                            variant="filled"
                            value={newPassword}
                            fullWidth
                        />
                    </div>
                    <div className={classes.textFieldWrapper}>
                        <ChangeInfoTextField
                            label="Confirm password"
                            type="text"
                            variant="filled"
                            value={newPassword2}
                            fullWidth
                        />
                    </div>
                    <div className={classes.divider}/>
                    <div className={classes.buttonWrapper}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default ChangeYourPassword;
