import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, Typography} from "@material-ui/core";

import {useNotificationsStyles} from "./NotificationsStyles";
import {ArrowRightIcon, FiltersIcon, PreferencesIcon,} from "../../../icons";

const Notifications: FC = (): ReactElement => {
    const classes = useNotificationsStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Select the kinds of notifications you get about your activities, interests, and recommendations.
                </Typography>
            </div>
            <div className={classes.listWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={"/settings/notification/filters"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {FiltersIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Filters
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Choose the notifications you’d like to see — and those you don’t.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/notification/preferences"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {PreferencesIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Preferences
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Select your preferences by notification type.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                </List>
            </div>
        </>
    );
};

export default Notifications;
