import React, {FC, ReactElement} from 'react';
import {FormControl, InputLabel, Paper, Select, Typography} from "@material-ui/core";

import {useChangeCountryStyles} from "./ChangeCountryStyles";

const ChangeCountry: FC = (): ReactElement => {
    const classes = useChangeCountryStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    <div className={classes.selectWrapper}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="select-country">
                                Country
                            </InputLabel>
                            <Select
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
                            </Select>
                        </FormControl>
                        <Typography component={"div"} className={classes.countryInfo}>
                            This is the primary country associated with your account. Your country helps us to customize
                            your Twitter experience. <a href={"https://help.twitter.com/managing-your-account/how-to-change-country-settings"}
                            target="_blank" className={classes.link}>Learn more</a>
                        </Typography>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default ChangeCountry;
