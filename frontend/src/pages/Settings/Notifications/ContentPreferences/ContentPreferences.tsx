import React, { ReactElement, useState } from "react";
import { Divider, Typography } from "@material-ui/core";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../util/globalClasses";
import { useContentPreferencesStyles } from "./ContentPreferencesStyles";
import { ArrowRightIcon } from "../../../../icons";
import ExploreModal from "./ExploreModal/ExploreModal";
import RecommendationsModal from "./RecommendationsModal/RecommendationsModal";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import {
    SETTINGS_PERSONALIZATION,
    SETTINGS_PRIVACY_AND_SAFETY_BLOCKED,
    SETTINGS_PRIVACY_AND_SAFETY_MUTED
} from "../../../../constants/path-constants";

const ContentPreferences = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useContentPreferencesStyles();
    const { t } = useTranslation();
    const [visibleExploreModal, setVisibleExploreModal] = useState<boolean>(false);
    const [visibleRecommendationsModal, setVisibleRecommendationsModal] = useState<boolean>(false);
    const [isSearchModal, setIsSearchModal] = useState<boolean>(true);

    const onOpenSettingsModal = (condition: boolean): void => {
        setVisibleExploreModal(true);
        setIsSearchModal(condition);
    };

    const onOpenVisibleRecommendationsModal = (): void => {
        setVisibleRecommendationsModal(true);
    };

    const onCloseModal = (): void => {
        setVisibleExploreModal(false);
        setVisibleRecommendationsModal(false);
        setIsSearchModal(true);
    };

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("EXPLORE", { defaultValue: "Explore" })}
                </Typography>
            </div>
            <div
                id="searchSettings"
                className={globalClasses.contentLink}
                onClick={() => onOpenSettingsModal(true)}
            >
                <Typography variant="body1" component="span">
                    {t("SEARCH_SETTINGS", { defaultValue: "Search settings" })}
                </Typography>
                {ArrowRightIcon}
            </div>
            <div
                id="exploreSettings"
                className={globalClasses.contentLink}
                onClick={() => onOpenSettingsModal(false)}
            >
                <Typography variant="body1" component="span">
                    {t("EXPLORE_SETTINGS", { defaultValue: "Explore settings" })}
                </Typography>
                {ArrowRightIcon}
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("LANGUAGES", { defaultValue: "Languages" })}
                </Typography>
            </div>
            <div
                id="openVisibleRecommendationsModal"
                className={globalClasses.contentLink}
                onClick={onOpenVisibleRecommendationsModal}
            >
                <Typography variant="body1" component="span">
                    {t("RECOMMENDATIONS", { defaultValue: "Recommendations" })}
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("LANGUAGES_RECOMMENDATIONS_DESCRIPTION", {
                        defaultValue: "Select which languages you want recommended Tweets, people, and trends to include."
                    })}
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("SAFETY", { defaultValue: "Safety" })}
                </Typography>
            </div>
            <Link to={SETTINGS_PRIVACY_AND_SAFETY_MUTED} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant="body1" component="span">
                        {t("MUTED", { defaultValue: "Muted" })}
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Link to={SETTINGS_PRIVACY_AND_SAFETY_BLOCKED} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant="body1" component="span">
                        {t("BLOCKED_ACCOUNTS", { defaultValue: "Blocked accounts" })}
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("PERSONALIZATION_AND_DATA", { defaultValue: "Personalization and data" })}
                </Typography>
            </div>
            <Link to={SETTINGS_PERSONALIZATION} className={globalClasses.linkWrapper}>
                <div className={classnames(classes.personalizationLink, globalClasses.contentLink)}>
                    <div className={classes.personalizationInfo}>
                        <Typography variant="body1" component="div">
                            {t("PERSONALIZATION_AND_DATA", { defaultValue: "Personalization and data" })}
                        </Typography>
                        <Typography variant="subtitle2" component="div">
                            {t("ALLOW_SOME", { defaultValue: "Allow some" })}
                        </Typography>
                    </div>
                    {ArrowRightIcon}
                </div>
            </Link>
            <ExploreModal
                visible={visibleExploreModal}
                onClose={onCloseModal}
                isSearchModal={isSearchModal}
            />
            <RecommendationsModal
                visible={visibleRecommendationsModal}
                onClose={onCloseModal}
            />
        </>
    );
};

export default withDocumentTitle(ContentPreferences)("Content preferences");