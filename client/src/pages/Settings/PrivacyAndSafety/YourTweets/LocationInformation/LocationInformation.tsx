import React, {FC, ReactElement} from 'react';

import {useLocationInformationStyles} from "./LocationInformationStyles";
import {Checkbox, Typography} from "@material-ui/core";

const LocationInformation: FC = (): ReactElement => {
    const classes = useLocationInformationStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    If enabled, you will be able to attach location information to your Tweets. <a
                    href={"https://help.twitter.com/safety-and-security/tweet-location-settings"}
                    target="_blank"
                    className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Add location information to your Tweets</span>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.deleteLocationInformation}>
                <Typography component={"span"}>
                    Remove all location information attached to your Tweets
                </Typography>
            </div>
        </>
    );
};

export default LocationInformation;
