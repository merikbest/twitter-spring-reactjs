import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {List, ListItem, Typography} from "@material-ui/core";

import {useSecurityAndAccountAccessStyles} from "./SecurityAndAccountAccessStyles";
import {AppsIcon, ArrowRightIcon, ConnectedIcon, SecurityIcon} from "../../../icons";

const SecurityAndAccountAccess: FC = (): ReactElement => {
    const classes = useSecurityAndAccountAccessStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.info}>
                    Manage your account’s security and keep track of your account’s usage including apps that
                    you have connected to your account.
                </Typography>
            </div>
            <div className={classes.listWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={"/settings/security"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {SecurityIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.title}>
                                    Security
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage your account’s security.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/security/apps_and_sessions"}>
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
                    </Link>
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
        </>
    );
};

export default SecurityAndAccountAccess;
