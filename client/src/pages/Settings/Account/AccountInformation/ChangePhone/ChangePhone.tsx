import React, {ChangeEvent, FC, ReactElement, useState} from 'react';
import {Paper, Typography} from "@material-ui/core";

import {useChangePhoneStyles} from "./ChangePhoneStyles";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";

const ChangePhone: FC = (): ReactElement => {
    const classes = useChangePhoneStyles();
    const [phone, setPhone] = useState<string>("");

    const handleChangePhone = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.currentTarget) {
            setPhone(event.currentTarget.value);
        }
    };

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    <div className={classes.textFieldWrapper}>
                        <ChangeInfoTextField
                            disabled={true}
                            label="Current"
                            type="text"
                            variant="filled"
                            value={phone}
                            fullWidth
                        />
                    </div>
                    <div className={classes.divider}/>
                    <div className={classes.updatePhoneNumber}>
                        <Typography component={"span"}>
                            Update phone number
                        </Typography>
                    </div>
                    <div className={classes.deletePhoneNumber}>
                        <Typography component={"span"}>
                            Delete phone number
                        </Typography>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default ChangePhone;
