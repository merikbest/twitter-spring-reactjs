import React, {FC, ReactElement} from 'react';
import {NavLink} from 'react-router-dom';
import {List, ListItem, Typography} from "@material-ui/core";

import {ArrowRightIcon, CommunityIcon, DeleteAccountIcon, DownloadIcon, KeyIcon, ProfileIcon} from "../../../icons";
import {useGlobalStyles} from "../../../util/globalClasses";
import {withDocumentTitle} from "../../../hoc/withDocumentTitle";

const Account: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <>
            <Typography variant={"subtitle2"} component={"div"} className={globalClasses.itemInfoWrapper}>
                See information about your account, download an archive of your data, or learn about your
                account deactivation options
            </Typography>
            <div className={globalClasses.listItemWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <NavLink to={"/settings/info"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {ProfileIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Account information
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    See your account information like your phone number and email address.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </NavLink>
                    <NavLink to={"/settings/password"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {KeyIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Change your password
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Change your password at any time.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </NavLink>
                    <ListItem>
                        <div className={globalClasses.listIconWrapper}>
                            {DownloadIcon}
                        </div>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Download an archive of your data
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                Get insights into the type of information stored for your account.
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                    <NavLink to={"/settings/teams"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {CommunityIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    TweetDeck Teams
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Invite anyone to Tweet from this account using the Teams feature in
                                    TweetDeck.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </NavLink>
                    <NavLink to={"/settings/deactivate"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {DeleteAccountIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Deactivate your account
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Find out how you can deactivate your account.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </NavLink>
                </List>
            </div>
        </>
    );
};

export default withDocumentTitle(Account);
