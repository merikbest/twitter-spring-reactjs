import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon, FiltersIcon, PreferencesIcon } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { withDocumentTitle } from "../../../hoc/withDocumentTitle";
import { SETTINGS_NOTIFICATION_FILTERS, SETTINGS_NOTIFICATION_PREFERENCES } from "../../../constants/path-constants";

const Notifications: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("NOTIFICATIONS_DESCRIPTIONS", {
                        defaultValue: `Select the kinds of notifications you get about your activities, interests, 
                        and recommendations.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.listItemWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={SETTINGS_NOTIFICATION_FILTERS}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {FiltersIcon}
                            </div>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("FILTERS", { defaultValue: "Filters" })}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {t("FILTERS_DESCRIPTIONS", {
                                        defaultValue: "Choose the notifications you’d like to see — and those you don’t."
                                    })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={SETTINGS_NOTIFICATION_PREFERENCES}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {PreferencesIcon}
                            </div>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("PREFERENCES", { defaultValue: "Preferences" })}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {t("PREFERENCES_DESCRIPTIONS", {
                                        defaultValue: "Select your preferences by notification type."
                                    })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                </List>
            </div>
        </>
    );
};

export default withDocumentTitle(Notifications)("Notifications");
