import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Divider, Typography } from "@material-ui/core";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { useLanguagesStyles } from "./LanguagesStyles";
import { ArrowRightIcon } from "../../../../icons";
import { selectUserProfileLanguage } from "../../../../store/ducks/user/selectors";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { SETTINGS_INFO_LANGUAGES } from "../../../../constants/path-constants";

const Languages: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useLanguagesStyles();
    const myProfileLanguage = useSelector(selectUserProfileLanguage);
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("LANGUAGES_DESCRIPTION", {
                        defaultValue: "Manage which languages are used to personalize your Twitter experience."
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("DISPLAY_LANGUAGE", { defaultValue: "Display language" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("DISPLAY_LANGUAGE_SELECT_DESCRIPTION", {
                        defaultValue: "Select your preferred language for headlines, buttons, and other text from Twitter."
                    })}
                </Typography>
            </div>
            <Link to={SETTINGS_INFO_LANGUAGES} className={globalClasses.linkWrapper}>
                <div className={classnames(globalClasses.contentLink, classes.accessibilityWrapper)}>
                    <div className={classes.accessibilityInfo}>
                        <Typography variant="body1" component="div">
                            {t("DISPLAY_LANGUAGE", { defaultValue: "Display language" })}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            {myProfileLanguage}
                        </Typography>
                    </div>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("SELECT_ADDITIONAL_LANGUAGES", { defaultValue: "Select additional languages" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("SELECT_ADDITIONAL_LANGUAGES_DESCRIPTION", {
                        defaultValue: "Select additional languages for the content you want to see on Twitter."
                    })}
                </Typography>
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant="body1" component="span">
                    {t("ADDITIONAL_LANGUAGES_YOU_SPEAK", { defaultValue: "Additional languages you speak" })}
                </Typography>
                {ArrowRightIcon}
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("LANGUAGES_YOU_MAY_KNOW", { defaultValue: "Languages you may know" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("LANGUAGES_YOU_MAY_KNOW_DESCRIPTION", {
                        defaultValue: `Manage the languages Twitter inferred based on your activity, 
                        such as the accounts you follow and the Tweets you engage with.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant="body1" component="span">
                    {t("LANGUAGES_YOU_MAY_KNOW", { defaultValue: "Languages you may know" })}
                </Typography>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default withDocumentTitle(Languages)("Languages");
