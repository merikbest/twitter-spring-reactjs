import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Link as MuiLink, Typography } from "@material-ui/core";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { useAudienceAndTaggingStyles } from "./AudienceAndTaggingStyles";
import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { SETTINGS_PRIVACY_AND_SAFETY_TAGGING } from "../../../../constants/path-constants";
import { PUBLIC_AND_PROTECTED_TWEETS } from "../../../../constants/url-constants";
import { useAudienceAndTagging } from "./useAudienceAndTagging";

const AudienceAndTagging: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useAudienceAndTaggingStyles();
    const { t } = useTranslation();
    const { checked, handleChange } = useAudienceAndTagging();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("AUDIENCE_AND_TAGGING_DESCRIPTION", {
                        defaultValue: "Manage what information you allow other people on Twitter to see."
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("PROTECT_YOUR_TWEETS", { defaultValue: "Protect your Tweets" })}
                    </Typography>
                    <Checkbox checked={checked} onChange={handleChange} />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("PROTECT_YOUR_TWEETS_DESCRIPTION", {
                        defaultValue: `When selected, your Tweets and other account information are only visible to 
                        people who follow you.`
                    })}
                    {" "}
                    <MuiLink href={PUBLIC_AND_PROTECTED_TWEETS} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <Link to={SETTINGS_PRIVACY_AND_SAFETY_TAGGING} className={globalClasses.linkWrapper}>
                <div className={classnames(globalClasses.contentLink, classes.photoTaggingLink)}>
                    <div className={classes.photoTagInfo}>
                        <Typography variant="body1" component="div">
                            {t("PHOTO_TAGGING", { defaultValue: "Photo tagging" })}
                        </Typography>
                        <Typography variant="subtitle2" component="div">
                            {t("ANYONE_CAN_TAG_YOU", { defaultValue: "Anyone can tag you" })}
                        </Typography>
                    </div>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default withDocumentTitle(AudienceAndTagging)("Audience and tagging");
