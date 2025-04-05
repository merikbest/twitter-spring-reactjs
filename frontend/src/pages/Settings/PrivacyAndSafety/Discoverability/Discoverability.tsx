import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Divider, Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { SETTINGS_PRIVACY_AND_SAFETY_CONTACTS_DASHBOARD } from "../../../../constants/path-constants";
import {
    EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS,
    UPLOAD_YOUR_CONTACTS_TO_SEARCH
} from "../../../../constants/url-constants";

const Discoverability: FC = (): ReactElement => {
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
                <Typography variant="h5" component="div">
                    {t("DISCOVERABILITY", { defaultValue: "Discoverability" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("DISCOVERABILITY_DESCRIPTION", {
                        defaultValue: `Decide whether people who have your email address or phone number can find and 
                        connect with you on Twitter.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("DISCOVERABILITY_EMAIL_DESCRIPTION", {
                            defaultValue: "Let people who have your email address find you on Twitter"
                        })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("DISCOVERABILITY_EMAIL_CONNECT_DESCRIPTION", {
                        defaultValue: "Let people who have your email address find and connect with you on Twitter."
                    })}
                    {" "}
                    <MuiLink href={EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("DISCOVERABILITY_PHONE_DESCRIPTION", {
                            defaultValue: "Let people who have your phone number find you on Twitter"
                        })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("DISCOVERABILITY_PHONE_CONNECT_DESCRIPTION", {
                        defaultValue: "Let people who have your phone number find and connect with you on Twitter."
                    })}
                    {" "}
                    <MuiLink href={EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("CONTACTS", { defaultValue: "Contacts" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("CONTACTS_DESCRIPTION", {
                        defaultValue: "Manage contacts that you have imported from your mobile devices."
                    })}
                    {" "}
                    <MuiLink href={UPLOAD_YOUR_CONTACTS_TO_SEARCH} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <Link to={SETTINGS_PRIVACY_AND_SAFETY_CONTACTS_DASHBOARD} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant="body1" component="span">
                        {t("MANAGE_CONTACTS", { defaultValue: "Manage contacts" })}
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default withDocumentTitle(Discoverability)("Discoverability and contacts");
