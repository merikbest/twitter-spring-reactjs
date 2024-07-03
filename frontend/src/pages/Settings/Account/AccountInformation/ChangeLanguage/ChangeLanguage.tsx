import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, FormControl, InputLabel, Typography } from "@material-ui/core";

import { useChangeLanguageStyles } from "./ChangeLanguageStyles";
import { FilledSelect } from "../../../../../components/FilledSelect/FilledSelect";
import { selectUserIsLoading, selectUserProfileLanguage } from "../../../../../store/ducks/user/selectors";
import { setUserLoadingStatus, updateLanguage } from "../../../../../store/ducks/user/actionCreators";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { LoadingStatus } from "../../../../../types/common";
import { fetchLanguages } from "../../../../../store/ducks/localization/actionCreators";
import { selectIsLocalizationLoading, selectLanguages } from "../../../../../store/ducks/localization/selectors";

const ChangeLanguage: FC = (): ReactElement => {
    const classes = useChangeLanguageStyles();
    const dispatch = useDispatch();
    const languages = useSelector(selectLanguages);
    const languagesLoading = useSelector(selectIsLocalizationLoading);
    const profileLanguage = useSelector(selectUserProfileLanguage);
    const isLoading = useSelector(selectUserIsLoading);
    const [language, setLanguage] = useState<string>("");

    useEffect(() => {
        dispatch(fetchLanguages());

        if (profileLanguage) {
            setLanguage(profileLanguage);
        }

        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
        };
    }, []);

    const changeLanguage = (event: ChangeEvent<{ value: unknown }>): void => {
        setLanguage(event.target.value as string);
    };

    const onSubmit = (): void => {
        dispatch(updateLanguage({ language }));
    };

    return (
        <>
            <div className={classes.selectWrapper}>
                <FormControl variant="filled">
                    <InputLabel htmlFor="select-language">
                        Display Language
                    </InputLabel>
                    <FilledSelect
                        variant="filled"
                        labelId="select-language"
                        id="select-language"
                        native
                        value={language}
                        onChange={changeLanguage}
                        disabled={languagesLoading}
                        label="Display Language"
                        fullWidth
                    >
                        <option aria-label="None" />
                        {languages.map(language => (
                                <option key={language.id} value={language.language}>
                                    {language.language}
                                </option>
                            )
                        )}
                    </FilledSelect>
                </FormControl>
                <Typography variant={"subtitle2"} component={"div"} className={classes.languageInfo}>
                    Select your preferred language for headlines, buttons, and other text from Twitter on this account.
                    This does not change the language of the content you see in your timeline.
                </Typography>
            </div>
            <Divider />
            <div className={classes.buttonWrapper}>
                <Button
                    onClick={onSubmit}
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Save
                </Button>
            </div>
        </>
    );
};

export default withDocumentTitle(ChangeLanguage)("Change display language");
