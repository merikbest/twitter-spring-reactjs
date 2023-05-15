import React, { FC, ReactElement, useEffect, useState } from "react";
import { Divider, Typography } from "@material-ui/core";
import axios from "axios";

import { useLocationStyles } from "./PlacesStyles";
import { LocationIconFilled } from "../../../../../icons";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { FIND_USER_LOCATION } from "../../../../../constants/url-constants";

const Places: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useLocationStyles();
    const [countryName, setCountryName] = useState<string>("Unknown");

    useEffect(() => {
        axios.get(FIND_USER_LOCATION)
            .then((response) => {
                setCountryName(response.data.country_name);
            }).catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    These are the places Twitter uses to show you more relevant content. You won’t see places listed
                    here if you turned off “Personalize based on places you’ve been”.
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <div className={classes.locationInfoWrapper}>
                    <div className={classes.locationIconWrapper}>
                        <span className={classes.locationIconIcon}>
                            {LocationIconFilled}
                        </span>
                    </div>
                    <Typography variant={"body1"} component={"span"}>
                        {countryName}
                    </Typography>
                </div>
            </div>
            <Divider />
            <div className={classes.deleteUser}>
                <Typography variant={"body1"} component={"span"}>
                    Remove
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(Places)("See places you’ve been");
