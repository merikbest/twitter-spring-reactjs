import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import {
    SETTINGS_PRIVACY_AND_SAFETY_LOCATION,
    SETTINGS_PRIVACY_AND_SAFETY_LOCATIONS
} from "../../../../constants/path-constants";
import { EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS } from "../../../../constants/url-constants";

const Location: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("MANAGE_THE_LOCATION_INFORMATION", {
                        defaultValue: "Manage the location information Twitter uses to personalize your experience."
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("PERSONALIZE_BASED_ON_PLACES_YOU_HAVE_BEEN", {
                            defaultValue: "Personalize based on places you’ve been"
                        })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("PERSONALIZE_BASED_ON_PLACES_YOU_HAVE_BEEN_DESCRIPTION", {
                        defaultValue: `You will always see ads on Twitter based on your Twitter activity. 
                        When this setting is enabled, Twitter may further personalize ads from Twitter advertisers, 
                        on and off Twitter, by combining your Twitter activity with other online activity and 
                        information from our partners.`
                    })}
                    {" "}
                    <MuiLink href={EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <Link to={SETTINGS_PRIVACY_AND_SAFETY_LOCATIONS} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant="body1" component="span">
                        {t("SEE_PLACES_YOU_HAVE_BEEN", { defaultValue: "See places you’ve been" })}
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Link to={SETTINGS_PRIVACY_AND_SAFETY_LOCATION} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant="body1" component="span">
                        {t("ADD_LOCATION_INFORMATION_TO_YOUR_TWEETS", {
                            defaultValue: "Add location information to your Tweets"
                        })}
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <div className={globalClasses.contentLink}>
                <Typography variant="body1" component="span">
                    {t("EXPLORE_SETTINGS", { defaultValue: "Explore settings" })}
                </Typography>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default withDocumentTitle(Location)("Location information");
