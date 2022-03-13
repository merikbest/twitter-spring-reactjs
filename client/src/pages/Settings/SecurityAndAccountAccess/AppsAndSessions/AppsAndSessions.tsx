import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useAppsAndSessionsStyles} from "./AppsAndSessionsStyles";
import {ArrowRightIcon} from "../../../../icons";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";

const AppsAndSessions: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useAppsAndSessionsStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    See information about when you logged into your account and the apps you connected to your
                    account.
                </Typography>
            </div>
            <div className={classnames(classes.listWrapper, globalClasses.svg)}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={"/settings/security/connected_apps"}>
                        <ListItem>
                            <Typography variant={"body1"} component={"span"}>
                                Connected apps
                            </Typography>
                            {ArrowRightIcon}
                        </ListItem>
                    </Link>
                    <Link to={"/settings/security/sessions"}>
                        <ListItem>
                            <Typography variant={"body1"} component={"span"}>
                                Sessions
                            </Typography>
                            {ArrowRightIcon}
                        </ListItem>
                    </Link>
                    <Link to={"/settings/security/login_history"}>
                        <ListItem>
                            <Typography variant={"body1"} component={"span"}>
                                Account access history
                            </Typography>
                            {ArrowRightIcon}
                        </ListItem>
                    </Link>
                    <Link to={"/settings/security/devices"}>
                        <ListItem>
                            <Typography variant={"body1"} component={"span"}>
                                Logged-in devices and apps
                            </Typography>
                            {ArrowRightIcon}
                        </ListItem>
                    </Link>
                </List>
            </div>
        </>
    );
};

export default withDocumentTitle(AppsAndSessions);
