import React, { FC, ReactElement } from "react";
import { Checkbox, Link as MuiLink, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { SETTINGS_PRIVACY_AND_SAFETY_LOCATION } from "../../../../constants/path-constants";
import { MEDIA_POLICY } from "../../../../constants/url-constants";

const YourTweets: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("YOUR_TWEETS_DESCRIPTION", {
                        defaultValue: "Manage the information associated with your Tweets."
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("MARK_MEDIA_YOU_TWEET", {
                            defaultValue: "Mark media you Tweet as having material that may be sensitive"
                        })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("YOUR_TWEETS_DESCRIPTION2", {
                        defaultValue: `When enabled, pictures and videos you Tweet will be marked as sensitive for 
                        people who don’t want to see sensitive content.`
                    })}
                    {" "}
                    <MuiLink href={MEDIA_POLICY} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
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
        </>
    );
};

export default withDocumentTitle(YourTweets)("Your Tweets");
