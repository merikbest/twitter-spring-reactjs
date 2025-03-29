import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Divider, Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { SETTINGS_SECURITY_LOGIN_VERIFICATION } from "../../../../constants/path-constants";
import { ACCOUNT_SECURITY_TIPS, TWO_FACTOR_AUTHENTICATION } from "../../../../constants/url-constants";

const Security: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("SECURITY_DESCRIPTION", { defaultValue: "Manage your account’s security." })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("TWO_FACTOR_AUTHENTICATION", { defaultValue: "Two-factor authentication" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("TWO_FACTOR_AUTHENTICATION_DESCRIPTION", {
                        defaultValue: `Help protect your account from unauthorized access by requiring a second 
                        authentication method in addition to your Twitter password. You can choose a text message, 
                        authentication app, or security key.`
                    })}
                    {" "}
                    <MuiLink href={TWO_FACTOR_AUTHENTICATION} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <Link to={SETTINGS_SECURITY_LOGIN_VERIFICATION} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant="body1" component="span">
                        {t("TWO_FACTOR_AUTHENTICATION", { defaultValue: "Two-factor authentication" })}
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("ADDITIONAL_PASSWORD_PROTECTION", { defaultValue: "Additional password protection" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("ADDITIONAL_PASSWORD_PROTECTION_DESCRIPTION", {
                        defaultValue: `Enabling this setting adds extra security to your account by requiring additional 
                        information to reset your password. If enabled, you must provide either the phone number or 
                        email address associated with your account in order to reset your password.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("PASSWORD_RESET_PROTECT", { defaultValue: "Password reset protect" })}
                    </Typography>
                    <Checkbox />
                </div>
                <MuiLink href={ACCOUNT_SECURITY_TIPS} variant="body1" target="_blank" rel="noopener">
                    {t("LEARN_MORE", { defaultValue: "Learn more" })}
                </MuiLink>
            </div>
        </>
    );
};

export default withDocumentTitle(Security)("Security");
