import React, {FC, ReactElement} from 'react';
import {NavLink} from "react-router-dom";
import {List, ListItem, Paper, Typography} from "@material-ui/core";

import {useSecurityAndAccountAccessStyles} from "./SecurityAndAccountAccessStyles";
import {AppsIcon, ArrowRightIcon, ConnectedIcon, ProfileIcon, SecurityIcon} from "../../../icons";

const SecurityAndAccountAccess: FC = (): ReactElement => {
    const classes = useSecurityAndAccountAccessStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    <div className={classes.infoItemWrapper}>
                        <Typography component={"div"} className={classes.info}>
                            Manage your account’s security and keep track of your account’s usage including apps that
                            you have connected to your account.
                        </Typography>
                    </div>
                    <div className={classes.listWrapper}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <div className={classes.icon}>
                                    {SecurityIcon}
                                </div>
                                <div>
                                    <Typography component={"div"} className={classes.title}>
                                        Account information
                                    </Typography>
                                    <Typography component={"div"} className={classes.text}>
                                        See your account information like your phone number and email address.
                                    </Typography>
                                </div>
                                <div className={classes.arrowIcon}>
                                    {ArrowRightIcon}
                                </div>
                            </ListItem>

                            <ListItem>
                                <div className={classes.icon}>
                                    {AppsIcon}
                                </div>
                                <div>
                                    <Typography component={"div"} className={classes.title}>
                                        Apps and sessions
                                    </Typography>
                                    <Typography component={"div"} className={classes.text}>
                                        See information about when you logged into your account and the apps you
                                        connected to your account.
                                    </Typography>
                                </div>
                                <div className={classes.arrowIcon}>
                                    {ArrowRightIcon}
                                </div>
                            </ListItem>

                            <ListItem>
                                <div className={classes.icon}>
                                    {ConnectedIcon}
                                </div>
                                <div>
                                    <Typography component={"div"} className={classes.title}>
                                        Connected accounts
                                    </Typography>
                                    <Typography component={"div"} className={classes.text}>
                                        Manage Google or Apple accounts connected to Twitter to log in.
                                    </Typography>
                                </div>
                                <div className={classes.arrowIcon}>
                                    {ArrowRightIcon}
                                </div>
                            </ListItem>
                        </List>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default SecurityAndAccountAccess;
