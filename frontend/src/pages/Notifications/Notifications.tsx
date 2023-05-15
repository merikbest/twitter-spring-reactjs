import React, { ChangeEvent, FC, ReactElement, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import classnames from "classnames";

import { useNotificationsStyles } from "./NotificationsStyles";
import { useGlobalStyles } from "../../util/globalClasses";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import { NOTIFICATIONS, NOTIFICATIONS_MENTIONS } from "../../constants/path-constants";
import NotificationsPage from "./NotificationsPage/NotificationsPage";
import MentionsPage from "./MentionsPage/MentionsPage";
import { selectUserDataMentionsCount } from "../../store/ducks/user/selectors";

const Notifications: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useNotificationsStyles();
    const history = useHistory();
    const userMentionsCount = useSelector(selectUserDataMentionsCount);
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        if (newValue === 0) {
            history.push(NOTIFICATIONS);
        } else {
            history.push(NOTIFICATIONS_MENTIONS);
        }
        setActiveTab(newValue);
    };

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <Paper className={classnames(globalClasses.pageHeader, classes.header)}>
                <div className={globalClasses.pageHeaderTitleWrapper}>
                    <Typography variant="h5">
                        Notifications
                    </Typography>
                </div>
            </Paper>
            <div className={globalClasses.contentWrapper}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab className={classes.tab} label="All" />
                        <Tab
                            className={classes.tab}
                            label="Mentions"
                            icon={userMentionsCount ? <span className={classes.mentionNotification} /> : undefined}
                        />
                    </Tabs>
                </div>
                <Route exact path={NOTIFICATIONS} component={NotificationsPage} />
                <Route exact path={NOTIFICATIONS_MENTIONS} component={MentionsPage} />
            </div>
        </Paper>
    );
};

export default withDocumentTitle(Notifications)("Notifications");
