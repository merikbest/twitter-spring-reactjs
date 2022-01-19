import React, {FC, ReactElement} from 'react';
import {Checkbox, Link as MuiLink, Typography} from "@material-ui/core";

import {useLocationInformationStyles} from "./LocationInformationStyles";

const LocationInformation: FC = (): ReactElement => {
    const classes = useLocationInformationStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`If enabled, you will be able to attach location information to your Tweets. `}
                    <MuiLink
                        href="https://help.twitter.com/safety-and-security/tweet-location-settings"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Add location information to your Tweets
                    </Typography>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.deleteLocationInformation}>
                <Typography variant={"body1"} component={"span"}>
                    Remove all location information attached to your Tweets
                </Typography>
            </div>
        </>
    );
};

export default LocationInformation;
