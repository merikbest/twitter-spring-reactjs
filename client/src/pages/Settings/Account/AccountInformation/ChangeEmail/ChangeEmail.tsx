import React, {ChangeEvent, FC, ReactElement, useState} from 'react';
import {Typography} from "@material-ui/core";

import {useChangeEmailStyles} from "./ChangeEmailStyles";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";

const ChangeEmail: FC = (): ReactElement => {
    const classes = useChangeEmailStyles();
    const [email, setEmail] = useState<string>("");

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.currentTarget) {
            setEmail(event.currentTarget.value);
        }
    };

    return (
        <>
            <div className={classes.textFieldWrapper}>
                <ChangeInfoTextField
                    disabled={true}
                    label="Current"
                    type="text"
                    variant="filled"
                    value={email}
                    fullWidth
                />
            </div>
            <div className={classes.divider}/>
            <div className={classes.updateEmailAddress}>
                <Typography component={"span"}>
                    Update email address
                </Typography>
            </div>
        </>
    );
};

export default ChangeEmail;
