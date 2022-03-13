import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {Button, Divider, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import classnames from "classnames";

import {useChangeUsernameStyles} from "./ChangeUsernameStyles";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";
import {selectUserData, selectUserIsLoading} from "../../../../../store/ducks/user/selectors";
import {updateUsername} from "../../../../../store/ducks/user/actionCreators";
import {useGlobalStyles} from "../../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../../hoc/withDocumentTitle";

const ChangeUsername: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
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
                <div className={globalClasses.itemInfoWrapper}>
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
                <div className={classnames(classes.suggestionsWrapper, globalClasses.itemInfoWrapper)}>
                    <Typography variant={"h5"} component={"div"}>
                        Suggestions
                    </Typography>
                    <Typography variant={"body1"} component={"span"} onClick={setSuggestedUsername}>
                        {`${myProfile?.username}123`}
                    </Typography>
                </div>
                <Divider/>
            </div>
            <div className={classnames(classes.buttonWrapper, globalClasses.itemInfoWrapper)}>
                <Button
                    onClick={changeUsername}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={username === "" || isLoading}
                >
                    Save
                </Button>
            </div>
        </>
    );
};

export default withDocumentTitle(ChangeUsername);
