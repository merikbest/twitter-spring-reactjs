import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, Typography } from "@material-ui/core";
import classnames from "classnames";

import { useAppsAndSessionsStyles } from "./AppsAndSessionsStyles";
import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import {
    SETTINGS_SECURITY_CONNECTED_APPS,
    SETTINGS_SECURITY_DEVICES,
    SETTINGS_SECURITY_LOGIN_HISTORY,
    SETTINGS_SECURITY_SESSIONS
} from "../../../../constants/path-constants";

const AppsAndSessions: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
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
                    <Link to={SETTINGS_SECURITY_CONNECTED_APPS}>
                        <ListItem>
                            <Typography variant={"body1"} component={"span"}>
                                Connected apps
                            </Typography>
                            {ArrowRightIcon}
                        </ListItem>
                    </Link>
                    <Link to={SETTINGS_SECURITY_SESSIONS}>
                        <ListItem>
                            <Typography variant={"body1"} component={"span"}>
                                Sessions
                            </Typography>
                            {ArrowRightIcon}
                        </ListItem>
                    </Link>
                    <Link to={SETTINGS_SECURITY_LOGIN_HISTORY}>
                        <ListItem>
                            <Typography variant={"body1"} component={"span"}>
                                Account access history
                            </Typography>
                            {ArrowRightIcon}
                        </ListItem>
                    </Link>
                    <Link to={SETTINGS_SECURITY_DEVICES}>
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

export default withDocumentTitle(AppsAndSessions)("Apps and sessions");
