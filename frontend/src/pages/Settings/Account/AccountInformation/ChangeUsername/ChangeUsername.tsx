import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { Button, Divider, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { useChangeUsernameStyles } from "./ChangeUsernameStyles";
import { ChangeInfoTextField } from "../../../ChangeInfoTextField/ChangeInfoTextField";
import { selectUserIsLoading, selectUserProfileUsername } from "../../../../../store/ducks/user/selectors";
import { updateUsername } from "../../../../../store/ducks/user/actionCreators";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";

const ChangeUsername: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useChangeUsernameStyles();
    const dispatch = useDispatch();
    const myProfileUsername = useSelector(selectUserProfileUsername);
    const isLoading = useSelector(selectUserIsLoading);
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        if (myProfileUsername) {
            setUsername(myProfileUsername);
        }
    }, []);

    const changeUsername = (): void => {
        dispatch(updateUsername({ username }));
    };

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value);
    };

    const setSuggestedUsername = (): void => {
        setUsername(`${myProfileUsername}123`);
    };

    return (
        <>
            <div>
                <div className={globalClasses.itemInfoWrapper}>
                    <ChangeInfoTextField
                        label={t("USERNAME", { defaultValue: "Username" })}
                        variant="filled"
                        onChange={handleChangeUsername}
                        value={username}
                        disabled={isLoading}
                        fullWidth
                    />
                </div>
                <Divider />
                <div className={classnames(classes.suggestionsWrapper, globalClasses.itemInfoWrapper)}>
                    <Typography variant="h5" component="div">
                        {t("SUGGESTIONS", { defaultValue: "Suggestions" })}
                    </Typography>
                    <Typography
                        id="suggestedUsername"
                        onClick={setSuggestedUsername}
                        variant="body1"
                        component="span"
                    >
                        {`${myProfileUsername}123`}
                    </Typography>
                </div>
                <Divider />
            </div>
            <div className={classnames(classes.buttonWrapper, globalClasses.itemInfoWrapper)}>
                <Button
                    onClick={changeUsername}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={!username || isLoading}
                >
                    {t("SAVE", { defaultValue: "Save" })}
                </Button>
            </div>
        </>
    );
};

export default withDocumentTitle(ChangeUsername)("Change username");
