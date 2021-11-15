import React, {FC, ReactElement} from 'react';
import {Button, FormControl, InputLabel, Typography} from "@material-ui/core";

import {useChangeLanguageStyles} from "./ChangeLanguageStyles";
import {FilledSelect} from "../../../../../components/FilledSelect/FilledSelect";

const ChangeLanguage: FC = (): ReactElement => {
    const classes = useChangeLanguageStyles();

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
                        // value={country}
                        // onChange={changeCountry}
                        label="Display Language"
                        fullWidth
                    >
                        <option aria-label="None"/>
                        <option value={"English"}>English</option>
                    </FilledSelect>
                </FormControl>
                <Typography component={"div"} className={classes.languageInfo}>
                    Select your preferred language for headlines, buttons, and other text from Twitter on this account.
                    This does not change the language of the content you see in your timeline.
                </Typography>
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
        </>
    );
};

export default ChangeLanguage;
