import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Divider, Link as MuiLink, Typography } from "@material-ui/core";
import classnames from "classnames";
import { Trans, useTranslation } from "react-i18next";

import { useLoggedDevicesStyles } from "./LoggedDevicesStyles";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY } from "../../../../../constants/path-constants";
import { ACROSS_YOUR_DEVICES } from "../../../../../constants/url-constants";

const LoggedDevices: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useLoggedDevicesStyles();
    const { t } = useTranslation();

    return (
        <>
            <div className={classnames(classes.infoItemWrapper, globalClasses.itemInfoWrapper)}>
                <Typography variant="subtitle2" component="div">
                    {t("LOGGED_DEVICES_DESCRIPTION", {
                        defaultValue: `These are browsers, devices, and information Twitter uses to personalize your 
                        experience. This includes devices and browsers you haven’t used to log in to Twitter, as well 
                        as email addresses and phone numbers like those linked to your Twitter account.`
                    })}
                    {" "}
                    <MuiLink href={ACROSS_YOUR_DEVICES} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <Divider />
            <div className={classnames(classes.infoItemWrapper, globalClasses.itemInfoWrapper)}>
                <Typography variant="h6" component="div">
                    {t("BROWSERS", { defaultValue: "Browsers" })}
                </Typography>
                <Typography variant="subtitle2" component="div">
                    <Trans
                        i18nKey={t("BROWSERS_DESCRIPTION", {
                            defaultValue: `You can remove this information by disabling “Personalize based on your 
                            inferred identity” in your Off-Twitter activity settings.`
                        })}
                        components={{
                            settingsLink: <MuiLink component={Link} variant="subtitle2" to={SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY} />
                        }}
                    />
                </Typography>
            </div>
            <Divider />
            <div className={classnames(classes.infoItemWrapper, globalClasses.itemInfoWrapper)}>
                <Typography variant="h6" component="div">
                    {t("MOBILE_DEVICES", { defaultValue: "Mobile Devices" })}
                </Typography>
                <Typography variant="subtitle2" component="div">
                    <Trans
                        i18nKey={t("BROWSERS_DESCRIPTION", {
                            defaultValue: `You can remove this information by disabling “Personalize based on your 
                            inferred identity” in your Off-Twitter activity settings.`
                        })}
                        components={{
                            settingsLink: <MuiLink component={Link} variant="subtitle2" to={SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY} />
                        }}
                    />
                </Typography>
            </div>
            <Divider />
            <div className={classnames(classes.infoItemWrapper, globalClasses.itemInfoWrapper)}>
                <Typography variant="h6" component="div">
                    {t("EMAIL_ADDRESSES", { defaultValue: "Email addresses" })}
                </Typography>
                <Typography variant="subtitle2" component="div">
                    <Trans
                        i18nKey={t("EMAIL_ADDRESSES_DESCRIPTION", {
                            defaultValue: `There are inferred hashes of email addresses that share common components 
                            with the email address you have provided to Twitter. You can remove this information by 
                            disabling “Personalize based on your inferred identity” in your Off-Twitter activity 
                            settings.`
                        })}
                        components={{
                            settingsLink: <MuiLink component={Link} variant="subtitle2" to={SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY} />
                        }}
                    />
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(LoggedDevices)("Logged-in devices and apps");
