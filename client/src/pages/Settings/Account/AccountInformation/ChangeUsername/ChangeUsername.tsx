import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {Button, Divider, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

import {useChangeUsernameStyles} from "./ChangeUsernameStyles";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";
import {selectUserData, selectUserIsLoading} from "../../../../../store/ducks/user/selectors";
import {updateUsername} from "../../../../../store/ducks/user/actionCreators";

const ChangeUsername: FC = (): ReactElement => {
    const classes = useChangeUsernameStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isLoading = useSelector(selectUserIsLoading);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        if (myProfile) {
            setUsername(myProfile.username);
        }


    }, []);

    const changeUsername = (): void => {
        dispatch(updateUsername({username}));
    };

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.currentTarget) {
            setUsername(event.currentTarget.value);
        }
    };

    const setSuggestedUsername = (): void => {
        setUsername(`${myProfile?.username}123`);
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
                        disabled={isLoading}
                        fullWidth
                    />
                </div>
                <Divider/>
                <div className={classes.suggestionsWrapper}>
                    <Typography component={"div"} className={classes.title}>
                        Suggestions
                    </Typography>
                    <Typography component={"span"} className={classes.suggestionText} onClick={setSuggestedUsername}>
                        {`${myProfile?.username}123`}
                    </Typography>
                </div>
                <Divider/>
            </div>
            <div className={classes.buttonWrapper}>
                <Button
                    onClick={changeUsername}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={username === "" || isLoading}
                >
                    Save
                </Button>
            </div>
        </>
    );
};

export default ChangeUsername;
