import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import classnames from "classnames";

import {useNotificationsStyles} from "./NotificationsStyles";
import {NotificationsIconFilled} from "../../icons";
import {
    selectIsNotificationsLoading,
    selectNotificationsList,
    selectNotificationsTweetAuthors
} from "../../store/ducks/notifications/selectors";
import {fetchNotifications, resetNotificationState} from "../../store/ducks/notifications/actionCreators";
import {fetchUserData} from "../../store/ducks/user/actionCreators";
import Spinner from "../../components/Spinner/Spinner";
import {useGlobalStyles} from "../../util/globalClasses";
import NotificationItem from "./NotificationItem/NotificationItem";
import NotificationAuthorItem from "./NotificationAuthorItem/NotificationAuthorItem";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";

const Notifications: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useNotificationsStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const notifications = useSelector(selectNotificationsList);
    const tweetAuthors = useSelector(selectNotificationsTweetAuthors);
    const isNotificationLoading = useSelector(selectIsNotificationsLoading);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchNotifications());
        dispatch(fetchUserData());

        return () => {
            dispatch(resetNotificationState());
        };
    }, []);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const handleClickUser = (userId: number, event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`/profile/${userId}`);
    };

    return (
        <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant="outlined">
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
                        <Tab className={classes.tab} label="All"/>
                        <Tab className={classes.tab} label="Mentions"/>
                    </Tabs>
                </div>
                {isNotificationLoading ? (
                    <Spinner/>
                ) : (
                    (activeTab === 0) ? (
                        (notifications.length === 0) ? (
                            <div className={classes.infoWindow}>
                                <Typography variant={"h4"} component={"div"}>
                                    Nothing to see here — yet
                                </Typography>
                                <Typography variant={"subtitle1"} component={"div"}>
                                    From like to Retweets and whole lot more, this is where all the actions happens.
                                </Typography>
                            </div>
                        ) : (
                            <div>
                                {(tweetAuthors.length !== 0) && (
                                    <Link to={"/notifications/timeline"}>
                                        <Paper className={classes.notificationWrapper} variant="outlined">
                                            <div className={classes.notificationIcon}>
                                                <span id={"notification"}>
                                                    {NotificationsIconFilled}
                                                </span>
                                            </div>
                                            <div style={{flex: 1}}>
                                                {tweetAuthors.slice(0, 6).map((tweetAuthor) => (
                                                    <NotificationAuthorItem tweetAuthor={tweetAuthor}/>
                                                ))}
                                                <Typography variant={"body1"} component={"div"} className={classes.notificationInfoText}>
                                                    {"New Tweet notifications for "}
                                                    <Typography variant={"h6"} component={"span"}>
                                                        {tweetAuthors[0].fullName}
                                                    </Typography>
                                                    {(tweetAuthors.length > 2) ? (
                                                        ` and ${tweetAuthors.length -1} others`
                                                    ) : (
                                                        (tweetAuthors.length === 2) && (
                                                            " and " +
                                                            <Typography variant={"h6"} component={"span"}>
                                                                {tweetAuthors[1].fullName}
                                                            </Typography>
                                                        )
                                                    )}
                                                </Typography>
                                            </div>
                                        </Paper>
                                    </Link>
                                )}
                                {notifications.map((notification) => (
                                    <NotificationItem notification={notification} handleClickUser={handleClickUser}/>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className={classes.infoWindow}>
                            <Typography variant={"h4"} component={"div"}>
                                Nothing to see here — yet
                            </Typography>
                            <Typography variant={"subtitle1"} component={"div"}>
                                When someone mentions you, you’ll find it here.
                            </Typography>
                        </div>
                    )
                )}
            </div>
        </Paper>
    );
};

export default withDocumentTitle(Notifications);
