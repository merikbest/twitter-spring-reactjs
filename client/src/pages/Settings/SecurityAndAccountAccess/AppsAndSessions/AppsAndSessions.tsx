import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, Paper, Typography} from "@material-ui/core";

import {useAppsAndSessionsStyles} from "./AppsAndSessionsStyles";
import {ArrowRightIcon} from "../../../../icons";

const AppsAndSessions: FC = (): ReactElement => {
    const classes = useAppsAndSessionsStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    <div className={classes.infoItemWrapper}>
                        <Typography component={"div"} className={classes.text}>
                            See information about when you logged into your account and the apps you connected to your
                            account.
                        </Typography>
                    </div>
                    <div className={classes.listWrapper}>
                        <List component="nav" aria-label="main mailbox folders">
                            <Link to={"/settings/security/connected_apps"}>
                                <ListItem>
                                    <Typography component={"span"}>
                                        Connected apps
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                            </Link>
                            <Link to={"/settings/security/sessions"}>
                                <ListItem>
                                    <Typography component={"span"}>
                                        Sessions
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                            </Link>
                            <Link to={"/settings/security/login_history"}>
                                <ListItem>
                                    <Typography component={"span"}>
                                        Account access history
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                            </Link>
                            <Link to={"/settings/security/devices"}>
                                <ListItem>
                                    <Typography component={"span"}>
                                        Logged-in devices and apps
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                            </Link>
                        </List>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default AppsAndSessions;
