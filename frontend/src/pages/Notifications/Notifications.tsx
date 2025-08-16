import React, { FC, ReactElement } from "react";
import { Route } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { useNotificationsStyles } from "./NotificationsStyles";
import { useGlobalStyles } from "../../util/globalClasses";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import { NOTIFICATIONS, NOTIFICATIONS_MENTIONS } from "../../constants/path-constants";
import NotificationsTab from "./NotificationsTab";
import MentionsTab from "./MentionsTab";
import { useNotifications } from "./useNotifications";

const Notifications: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useNotificationsStyles();
    const { t } = useTranslation();
    const { userMentionsCount, activeTab, handleChangeTab } = useNotifications();

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <Paper className={classnames(globalClasses.pageHeader, classes.header)}>
                <div className={globalClasses.pageHeaderTitleWrapper}>
                    <Typography variant="h5">
                        {t("NOTIFICATIONS", { defaultValue: "Notifications" })}
                    </Typography>
                </div>
            </Paper>
            <div className={globalClasses.contentWrapper}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab className={classes.tab} label={t("ALL", { defaultValue: "All" })} />
                        <Tab
                            className={classes.tab}
                            label={t("MENTIONS", { defaultValue: "Mentions" })}
                            icon={userMentionsCount ? <span className={classes.mentionNotification} /> : undefined}
                        />
                    </Tabs>
                </div>
                <Route exact path={NOTIFICATIONS} component={NotificationsTab} />
                <Route exact path={NOTIFICATIONS_MENTIONS} component={MentionsTab} />
            </div>
        </Paper>
    );
};

export default withDocumentTitle(Notifications)("Notifications");
