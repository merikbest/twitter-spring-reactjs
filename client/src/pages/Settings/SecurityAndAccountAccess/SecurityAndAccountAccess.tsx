import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {List, ListItem, Typography} from "@material-ui/core";

import {AppsIcon, ArrowRightIcon, ConnectedIcon, SecurityIcon} from "../../../icons";
import {useGlobalStyles} from "../../../util/globalClasses";
import {withDocumentTitle} from "../../../hoc/withDocumentTitle";

const SecurityAndAccountAccess: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage your account’s security and keep track of your account’s usage including apps that
                    you have connected to your account.
                </Typography>
            </div>
            <div className={globalClasses.listItemWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={"/settings/security"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {SecurityIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Security
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Manage your account’s security.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/security/apps_and_sessions"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {AppsIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Apps and sessions
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    See information about when you logged into your account and the apps you
                                    connected to your account.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <ListItem>
                        <div className={globalClasses.listIconWrapper}>
                            {ConnectedIcon}
                        </div>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Connected accounts
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                Manage Google or Apple accounts connected to Twitter to log in.
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </List>
            </div>
        </>
    );
};

export default withDocumentTitle(SecurityAndAccountAccess);
