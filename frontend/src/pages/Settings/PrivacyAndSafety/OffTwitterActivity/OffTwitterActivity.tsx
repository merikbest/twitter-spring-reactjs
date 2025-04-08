import React, { FC, ReactElement } from "react";
import { Checkbox, Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { ACROSS_YOUR_DEVICES, TAILORED_SUGGESTIONS } from "../../../../constants/url-constants";

const OffTwitterActivity: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("OFF_TWITTER_ACTIVITY_DESCRIPTION", {
                        defaultValue: `Manage how Twitter uses your online activity outside of Twitter, such as the 
                        websites you visit, to personalize your experience.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("ALLOW_USE_OF_WHERE_YOU_SEE_TWITTER_CONTENT", {
                            defaultValue: "Allow use of where you see Twitter content across the Web"
                        })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("ALLOW_USE_OF_WHERE_YOU_SEE_TWITTER_CONTENT_DESCRIPTION", {
                        defaultValue: `This setting lets Twitter keep track of your visits to other websites that 
                        integrate Twitter content, such as embedded timelines. That information makes Twitter better for 
                        you, such as by personalizing your experience. This web browsing history will never be stored 
                        with your name, email, or phone number.`
                    })}
                    {" "}
                    <MuiLink href={TAILORED_SUGGESTIONS} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("PERSONALIZE_BASED_ON_YOUR_INFERRED_IDENTITY", {
                            defaultValue: "Personalize based on your inferred identity"
                        })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("PERSONALIZE_BASED_ON_YOUR_INFERRED_IDENTITY_DESCRIPTION", {
                        defaultValue: `Twitter will always personalize your experience based on information you’ve 
                        provided, as well as the devices you’ve used to log in. When this setting is enabled, 
                        Twitter may also personalize based on other inferences about your identity, like devices and 
                        browsers you haven’t used to log in to Twitter or email addresses and phone numbers similar 
                        to those linked to your Twitter account.`
                    })}
                    {" "}
                    <MuiLink href={ACROSS_YOUR_DEVICES} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(OffTwitterActivity)("Off-Twitter activity");
