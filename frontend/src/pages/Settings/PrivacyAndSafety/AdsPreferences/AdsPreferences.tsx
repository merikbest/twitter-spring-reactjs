import React, { FC, ReactElement } from "react";
import { Checkbox, Link as MuiLink, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { SETTINGS_PRIVACY_AND_SAFETY_AUDIENCES } from "../../../../constants/path-constants";
import { EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS } from "../../../../constants/url-constants";

const AdsPreferences: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("CONTROL_YOUR_DISCOVERABILITY", {
                        defaultValue: "Control your discoverability settings and manage contacts you’ve imported."
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("PERSONALIZED_ADS", { defaultValue: "Personalized ads" })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("PERSONALIZED_ADS_DESCRIPTION", {
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
            {/*<Link to="" className={classes.adsPreferencesWrapper}>*/}
            <div className={globalClasses.contentLink}>
                <Typography variant="body1" component="span">
                    {t("INTERESTS", { defaultValue: "Interests" })}
                </Typography>
                {ArrowRightIcon}
            </div>
            {/*</Link>*/}
            <Link to={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCES} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant="body1" component="span">
                        {t("YOUR_ADVERTISER_LIST", { defaultValue: "Your advertiser list" })}
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default withDocumentTitle(AdsPreferences)("Ads preferences");
