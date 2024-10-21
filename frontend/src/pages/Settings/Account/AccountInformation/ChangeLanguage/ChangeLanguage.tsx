import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, FormControl, InputLabel, Typography } from "@material-ui/core";

import { useChangeLanguageStyles } from "./ChangeLanguageStyles";
import { FilledSelect } from "../../../../../components/FilledSelect/FilledSelect";
import { selectUserIsLoading, selectUserProfileLanguage } from "../../../../../store/ducks/user/selectors";
import { updateLanguage } from "../../../../../store/ducks/user/actionCreators";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { fetchLanguages, resetLocalizationState } from "../../../../../store/ducks/localization/actionCreators";
import {
    selectIsLocalizationError,
    selectIsLocalizationLoading,
    selectLanguages
} from "../../../../../store/ducks/localization/selectors";

const ChangeLanguage: FC = (): ReactElement => {
    const classes = useChangeLanguageStyles();
    const dispatch = useDispatch();
    const languages = useSelector(selectLanguages);
    const languagesLoading = useSelector(selectIsLocalizationLoading);
    const languagesError = useSelector(selectIsLocalizationError);
    const profileLanguage = useSelector(selectUserProfileLanguage);
    const isLoading = useSelector(selectUserIsLoading);
    const [language, setLanguage] = useState<string>("");

    useEffect(() => {
        dispatch(fetchLanguages());

        if (profileLanguage) {
            setLanguage(profileLanguage);
        }

        return () => {
            dispatch(resetLocalizationState());
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
                    <InputLabel id="select-language" shrink>
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
                        error={languagesError}
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
