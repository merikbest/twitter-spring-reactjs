import React, {ChangeEvent, FC, ReactElement, useState} from 'react';
import {Button, Typography} from "@material-ui/core";

import {useChangeUsernameStyles} from "./ChangeUsernameStyles";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";

const ChangeUsername: FC = (): ReactElement => {
    const classes = useChangeUsernameStyles();
    const [username, setUsername] = useState<string>("");

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.currentTarget) {
            setUsername(event.currentTarget.value);
        }
    };

    return (
        <>
            <div>
                <div className={classes.textFieldWrapper}>
                    <ChangeInfoTextField
                        label="Username"
                        variant="filled"
                        onChange={handleChangeUsername}
                        value={username}
                        fullWidth
                    />
                </div>
                <div className={classes.divider}/>
                <div className={classes.suggestionsWrapper}>
                    <Typography component={"div"} className={classes.title}>
                        Suggestions
                    </Typography>
                    <Typography component={"div"} className={classes.suggestionText}>
                        Vbhjckfd11
                    </Typography>
                </div>
                <div className={classes.divider}/>
            </div>
            <div className={classes.buttonWrapper}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
            </div>
        </>
    );
};

export default ChangeUsername;
