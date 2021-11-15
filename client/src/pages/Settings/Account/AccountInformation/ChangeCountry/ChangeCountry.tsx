import React, {FC, ReactElement} from 'react';
import {FormControl, InputLabel, Typography} from "@material-ui/core";

import {useChangeCountryStyles} from "./ChangeCountryStyles";
import {FilledSelect} from "../../../../../components/FilledSelect/FilledSelect";

const ChangeCountry: FC = (): ReactElement => {
    const classes = useChangeCountryStyles();

    return (
        <>
            <div className={classes.selectWrapper}>
                <FormControl variant="filled">
                    <InputLabel htmlFor="select-country">
                        Country
                    </InputLabel>
                    <FilledSelect
                        variant="filled"
                        labelId="select-country"
                        id="select-country"
                        native
                        // value={country}
                        // onChange={changeCountry}
                        label="Country"
                        fullWidth
                    >
                        <option aria-label="None"/>
                        <option value={"England"}>England</option>
                    </FilledSelect>
                </FormControl>
                <Typography component={"div"} className={classes.countryInfo}>
                    This is the primary country associated with your account. Your country helps us to customize
                    your Twitter experience. <a
                    href={"https://help.twitter.com/managing-your-account/how-to-change-country-settings"}
                    target="_blank" className={classes.link}>Learn more</a>
                </Typography>
            </div>
        </>
    );
};

export default ChangeCountry;
