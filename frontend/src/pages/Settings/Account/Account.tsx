import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon, CommunityIcon, DeleteAccountIcon, DownloadIcon, KeyIcon, ProfileIcon } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { withDocumentTitle } from "../../../hoc/withDocumentTitle";
import {
    SETTINGS_DEACTIVATE,
    SETTINGS_INFO,
    SETTINGS_PASSWORD,
    SETTINGS_TEAMS
} from "../../../constants/path-constants";

const Account: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <Typography variant="subtitle2" component="div" className={globalClasses.itemInfoWrapper}>
                {t("ACCOUNT_SETTINGS_DESCRIPTION", {
                    defaultValue: `See information about your account, download an archive of your data,
                    or learn about your account deactivation options`
                })}
            </Typography>
            <div className={globalClasses.listItemWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={SETTINGS_INFO}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {ProfileIcon}
                            </div>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("ACCOUNT_INFORMATION_TITLE", { defaultValue: "Account information" })}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {t("ACCOUNT_INFORMATION_DESCRIPTION", {
                                        defaultValue: "See your account information like your phone number and email address."
                                    })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={SETTINGS_PASSWORD}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {KeyIcon}
                            </div>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("CHANGE_YOUR_PASSWORD_TITLE", { defaultValue: "Change your password" })}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {t("CHANGE_YOUR_PASSWORD_DESCRIPTION", {
                                        defaultValue: "Change your password at any time."
                                    })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <ListItem>
                        <div className={globalClasses.listIconWrapper}>
                            {DownloadIcon}
                        </div>
                        <div>
                            <Typography variant="body1" component="div">
                                {t("DOWNLOAD_DATA_TITLE", { defaultValue: "Download an archive of your data" })}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                {t("DOWNLOAD_DATA_DESCRIPTION", {
                                    defaultValue: "Get insights into the type of information stored for your account."
                                })}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                    <Link to={SETTINGS_TEAMS}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {CommunityIcon}
                            </div>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("TWEET_DECK_TEAMS_TITLE", { defaultValue: "TweetDeck Teams" })}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {t("TWEET_DECK_TEAMS_DESCRIPTION", {
                                        defaultValue: "Invite anyone to Tweet from this account using the Teams feature in TweetDeck."
                                    })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={SETTINGS_DEACTIVATE}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {DeleteAccountIcon}
                            </div>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("DEACTIVATE_YOUR_ACCOUNT_TITLE", { defaultValue: "Deactivate your account" })}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {t("DEACTIVATE_YOUR_ACCOUNT_DESCRIPTION", {
                                        defaultValue: "Find out how you can deactivate your account."
                                    })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                </List>
            </div>
        </>
    );
};

export default withDocumentTitle(Account)("Settings");
