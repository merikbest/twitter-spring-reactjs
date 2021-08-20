import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {CircularProgress, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import {useNotificationsStyles} from "./NotificationsStyles";
import {UserApi} from "../../services/api/userApi";

const Notifications: FC = (): ReactElement => {
    const classes = useNotificationsStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [notifications, setNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        setIsLoading(true);
        UserApi.getUserNotifications()
            .then(response => {
                console.log(response)
                // setNotifications(response);
                setIsLoading(false);
            });
    }, []);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const handleShowFollowing = (): void => {

    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header}>
                <div>
                    <Typography variant="h6">Notifications</Typography>
                </div>
            </Paper>
            <div style={{paddingTop: 57,}}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab onClick={handleShowFollowing} className={classes.tab} label="All"/>
                        <Tab onClick={handleShowFollowing} className={classes.tab} label="Mentions"/>
                    </Tabs>
                </div>
                {isLoading ? (
                    <div className={classes.loading}>
                        <CircularProgress/>
                    </div>
                ) : (
                    (activeTab === 0) ? (
                        (notifications.length === 0) ? (
                            <div>
                                <div className={classes.title}>
                                    Nothing to see here — yet
                                </div>
                                <div className={classes.text}>
                                    From like to Retweets and whole lot more, this is where all the actions happens.
                                </div>
                            </div>
                        ) : (
                            <div>

                            </div>
                        )
                    ) : (
                        <div>
                            <div className={classes.title}>
                                Nothing to see here — yet
                            </div>
                            <div className={classes.text}>
                                When someone mentions you, you’ll find it here.
                            </div>
                        </div>
                    )
                )}
            </div>
        </Paper>
    );
};

export default Notifications;
