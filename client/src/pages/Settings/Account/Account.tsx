import React, {FC, ReactElement} from 'react';
import {NavLink} from 'react-router-dom';
import {List, ListItem, Paper, Typography} from "@material-ui/core";

import {useAccountStyles} from "./AccountStyles";
import {ArrowRightIcon, CommunityIcon, DeleteAccountIcon, DownloadIcon, KeyIcon, ProfileIcon} from "../../../icons";

const Account: FC = (): ReactElement => {
    const classes = useAccountStyles();

    return (
        <>
            <Typography component={"div"} className={classes.accountInfo}>
                See information about your account, download an archive of your data, or learn about your
                account deactivation options
            </Typography>
            <div className={classes.listWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <NavLink to={"/settings/info"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {ProfileIcon}
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
                    </NavLink>
                    <NavLink to={"/settings/password"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {KeyIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.title}>
                                    Change your password
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Change your password at any time.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </NavLink>
                    <ListItem>
                        <div className={classes.icon}>
                            {DownloadIcon}
                        </div>
                        <div>
                            <Typography component={"div"} className={classes.title}>
                                Download an archive of your data
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
                                Get insights into the type of information stored for your account.
                            </Typography>
                        </div>
                        <div className={classes.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                    <NavLink to={"/settings/teams"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {CommunityIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.title}>
                                    TweetDeck Teams
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Invite anyone to Tweet from this account using the Teams feature in
                                    TweetDeck.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </NavLink>
                    <NavLink to={"/settings/deactivate"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {DeleteAccountIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.title}>
                                    Deactivate your account
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Find out how you can deactivate your account.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </NavLink>
                </List>
            </div>
        </>
    );
};

export default Account;
