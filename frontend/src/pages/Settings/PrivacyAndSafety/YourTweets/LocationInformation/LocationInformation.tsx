import React, { FC, ReactElement } from "react";
import { Checkbox, Link as MuiLink, Typography } from "@material-ui/core";

import { useLocationInformationStyles } from "./LocationInformationStyles";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { TWEET_LOCATION_SETTINGS } from "../../../../../constants/url-constants";

const LocationInformation: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useLocationInformationStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`If enabled, you will be able to attach location information to your Tweets. `}
                    <MuiLink href={TWEET_LOCATION_SETTINGS} variant="subtitle2" target="_blank" rel="noopener">
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Add location information to your Tweets
                    </Typography>
                    <Checkbox />
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

export default withDocumentTitle(LocationInformation)("Add location information to your Tweets");
