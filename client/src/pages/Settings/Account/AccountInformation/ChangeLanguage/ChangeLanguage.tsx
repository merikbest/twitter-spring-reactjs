import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Divider, FormControl, InputLabel, Typography} from "@material-ui/core";

import {useChangeLanguageStyles} from "./ChangeLanguageStyles";
import {FilledSelect} from "../../../../../components/FilledSelect/FilledSelect";
import {selectUserData, selectUserIsLoading} from "../../../../../store/ducks/user/selectors";
import {setUserLoadingStatus, updateLanguage} from "../../../../../store/ducks/user/actionCreators";
import {LoadingStatus} from "../../../../../store/types";

const ChangeLanguage: FC = (): ReactElement => {
    const classes = useChangeLanguageStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isLoading = useSelector(selectUserIsLoading);
    const [language, setLanguage] = useState<string>("");

    useEffect(() => {
        if (myProfile) {
            setLanguage(myProfile?.language!);
        }

        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
        };
    }, []);

    const changeLanguage = (event: ChangeEvent<{ value: unknown }>): void => {
        setLanguage(event.target.value as string);
    };

    const onSubmit = (): void => {
        dispatch(updateLanguage({language}));
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
                        label="Display Language"
                        fullWidth
                    >
                        <option aria-label="None"/>
                        {languages()}
                    </FilledSelect>
                </FormControl>
                <Typography component={"div"} className={classes.languageInfo}>
                    Select your preferred language for headlines, buttons, and other text from Twitter on this account.
                    This does not change the language of the content you see in your timeline.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.buttonWrapper}>
                <Button
                    onClick={onSubmit}
                    disabled={isLoading}
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

export default ChangeLanguage;

const languages = (): JSX.Element => {
    return (
        <>
            <option value="Arabic - العربية">Arabic - العربية</option>
            <option value="Arabic (Feminine) - العربية (مؤنث)">Arabic (Feminine) - العربية (مؤنث)</option>
            <option value="Bangla - বাংলা">Bangla - বাংলা</option>
            <option value="Basque (beta) - euskara">Basque (beta) - euskara</option>
            <option value="British English">British English</option>
            <option value="Bulgarian - български">Bulgarian - български</option>
            <option value="Catalan - català">Catalan - català</option>
            <option value="Croatian - hrvatski">Croatian - hrvatski</option>
            <option value="Czech - čeština">Czech - čeština</option>
            <option value="Danish - dansk">Danish - dansk</option>
            <option value="Dutch - Nederlands">Dutch - Nederlands</option>
            <option value="English">English</option>
            <option value="Filipino">Filipino</option>
            <option value="Finnish - suomi">Finnish - suomi</option>
            <option value="French - français">French - français</option>
            <option value="Galician (beta) - galego">Galician (beta) - galego</option>
            <option value="German - Deutsch">German - Deutsch</option>
            <option value="Greek - Ελληνικά">Greek - Ελληνικά</option>
            <option value="Gujarati - ગુજરાતી">Gujarati - ગુજરાતી</option>
            <option value="Hebrew - עברית">Hebrew - עברית</option>
            <option value="Hindi - हिन्दी">Hindi - हिन्दी</option>
            <option value="Hungarian - magyar">Hungarian - magyar</option>
            <option value="Indonesian - Indonesia">Indonesian - Indonesia</option>
            <option value="Irish (beta) - Gaeilge">Irish (beta) - Gaeilge</option>
            <option value="Italian - italiano">Italian - italiano</option>
            <option value="Japanese - 日本語">Japanese - 日本語</option>
            <option value="Kannada - ಕನ್ನಡ">Kannada - ಕನ್ನಡ</option>
            <option value="Korean - 한국어">Korean - 한국어</option>
            <option value="Malay - Melayu">Malay - Melayu</option>
            <option value="Marathi - मराठी">Marathi - मराठी</option>
            <option value="Norwegian - norsk">Norwegian - norsk</option>
            <option value="Persian - فارسی">Persian - فارسی</option>
            <option value="Polish - polski">Polish - polski</option>
            <option value="Portuguese - português">Portuguese - português</option>
            <option value="Romanian - română">Romanian - română</option>
            <option value="Russian - русский">Russian - русский</option>
            <option value="Serbian - српски">Serbian - српски</option>
            <option value="Simplified Chinese - 简体中文">Simplified Chinese - 简体中文</option>
            <option value="Slovak - slovenčina">Slovak - slovenčina</option>
            <option value="Spanish - español">Spanish - español</option>
            <option value="Swedish - svenska">Swedish - svenska</option>
            <option value="Tamil - தமிழ்">Tamil - தமிழ்</option>
            <option value="Thai - ไทย">Thai - ไทย</option>
            <option value="Traditional Chinese - 繁體中文">Traditional Chinese - 繁體中文</option>
            <option value="Turkish - Türkçe">Turkish - Türkçe</option>
            <option value="Ukrainian - українська">Ukrainian - українська</option>
            <option value="Urdu (beta) - اردو">Urdu (beta) - اردو</option>
            <option value="Vietnamese - Tiếng Việt">Vietnamese - Tiếng Việt</option>
        </>
    );
};
