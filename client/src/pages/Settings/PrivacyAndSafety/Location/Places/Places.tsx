import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Divider, Typography} from "@material-ui/core";
import axios from "axios";

import {useLocationStyles} from "./PlacesStyles";
import {DeviceIcon, LocationIconFilled} from "../../../../../icons";

const Places: FC = (): ReactElement => {
    const classes = useLocationStyles();
    const [countryName, setCountryName] = useState<string>("Unknown");

    useEffect(() => {
        axios.get('https://ipapi.co/json/')
            .then((response) => {
                setCountryName(response.data.country_name)
            }).catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    These are the places Twitter uses to show you more relevant content. You won’t see places listed
                    here if you turned off “Personalize based on places you’ve been”.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <div className={classes.locationInfoWrapper}>
                    <div className={classes.locationIconWrapper}>
                        <span className={classes.locationIconIcon}>
                            {LocationIconFilled}
                        </span>
                    </div>
                    <Typography component={"span"}>
                        {countryName}
                    </Typography>
                </div>
            </div>
            <Divider/>
            <div className={classes.deleteUser}>
                <Typography component={"span"}>
                    Remove
                </Typography>
            </div>
        </>
    );
};

export default Places;
