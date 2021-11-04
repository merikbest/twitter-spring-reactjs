import React, {FC, ReactElement} from 'react';
import {NavLink, Route} from 'react-router-dom';
import {Grid, List, ListItem, Paper, Typography} from "@material-ui/core";

import {useSettingsStyles} from "./SettingsStyles";
import {ArrowRightIcon} from "../../icons";
import {BackButton} from "../../components/BackButton/BackButton";
import Account from "./Account/Account";
import AccountInformation from "./Account/AccountInformation/AccountInformation";
import ChangeUsername from "./Account/AccountInformation/ChangeUsername/ChangeUsername";
import ChangePhone from "./Account/AccountInformation/ChangePhone/ChangePhone";
import ChangeEmail from "./Account/AccountInformation/ChangeEmail/ChangeEmail";
import ChangeCountry from "./Account/AccountInformation/ChangeCountry/ChangeCountry";
import ChangeLanguage from "./Account/AccountInformation/ChangeLanguage/ChangeLanguage";
import ChangeGender from "./Account/AccountInformation/ChangeGender/ChangeGender";
import ChangeAge from "./Account/AccountInformation/ChangeAge/ChangeAge";
import ChangeYourPassword from "./Account/ChangeYourPassword/ChangeYourPassword";
import TweetDeckTeams from "./Account/TweetDeckTeams/TweetDeckTeams";
import SecurityAndAccountAccess from "./SecurityAndAccountAccess/SecurityAndAccountAccess";
import DeactivateAccount from "./Account/DeactivateAccount/DeactivateAccount";
import Security from "./SecurityAndAccountAccess/Security/Security";
import TwoFactorAuthentication from "./SecurityAndAccountAccess/Security/TwoFactorAuthentication/TwoFactorAuthentication";
import AppsAndSessions from "./SecurityAndAccountAccess/AppsAndSessions/AppsAndSessions";
import ConnectedApps from "./SecurityAndAccountAccess/AppsAndSessions/ConnectedApps/ConnectedApps";
import Sessions from "./SecurityAndAccountAccess/AppsAndSessions/Sessions/Sessions";
import AccountAccessHistory from "./SecurityAndAccountAccess/AppsAndSessions/AccountAccessHistory/AccountAccessHistory";
import LoggedDevices from "./SecurityAndAccountAccess/AppsAndSessions/LoggedDevices/LoggedDevices";
import CurrentSession from "./SecurityAndAccountAccess/AppsAndSessions/Sessions/CurrentSession/CurrentSession";
import PrivacyAndSafety from "./PrivacyAndSafety/PrivacyAndSafety";
import Notifications from "./Notifications/Notifications";
import Accessibility from "./Accessibility/Accessibility";
import AdditionalResources from "./AdditionalResources/AdditionalResources";

const Settings: FC = (): ReactElement => {
    const classes = useSettingsStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Grid className={classes.grid} md={4} item>
                <div className={classes.container}>
                    <Paper variant="outlined">
                        <Paper className={classes.leftSideHeader}>
                            <div>
                                <Typography variant="h6">
                                    Settings
                                </Typography>
                            </div>
                        </Paper>
                        <div className={classes.listWrapper}>
                            <List component="nav" aria-label="main mailbox folders">
                                <NavLink to={"/settings"}>
                                    <ListItem
                                        selected={selectedIndex === 1}
                                        onClick={() => handleListItemClick(1)}
                                    >
                                        <Typography component={"span"}>
                                            Your account
                                        </Typography>
                                        {ArrowRightIcon}
                                    </ListItem>
                                </NavLink>
                                <NavLink to={"/settings/security_and_account_access"}>
                                    <ListItem
                                        selected={selectedIndex === 2}
                                        onClick={() => handleListItemClick(2)}
                                    >
                                        <Typography component={"span"}>
                                            Security and account access
                                        </Typography>
                                        {ArrowRightIcon}
                                    </ListItem>
                                </NavLink>
                                <NavLink to={"/settings/privacy_and_safety"}>
                                    <ListItem
                                        selected={selectedIndex === 3}
                                        onClick={() => handleListItemClick(3)}
                                    >
                                        <Typography component={"span"}>
                                            Privacy and safety
                                        </Typography>
                                        {ArrowRightIcon}
                                    </ListItem>
                                </NavLink>
                                <NavLink to={"/settings/notification"}>
                                    <ListItem
                                        selected={selectedIndex === 4}
                                        onClick={() => handleListItemClick(4)}
                                    >
                                        <Typography component={"span"}>
                                            Notifications
                                        </Typography>
                                        {ArrowRightIcon}
                                    </ListItem>
                                </NavLink>
                                <NavLink to={"/settings/accessibility_display_and_languages"}>
                                    <ListItem
                                        selected={selectedIndex === 5}
                                        onClick={() => handleListItemClick(5)}
                                    >
                                        <Typography component={"span"}>
                                            Accessibility, display, and languages
                                        </Typography>
                                        {ArrowRightIcon}
                                    </ListItem>
                                </NavLink>
                                <NavLink to={"/settings/about"}>
                                    <ListItem
                                        selected={selectedIndex === 6}
                                        onClick={() => handleListItemClick(6)}
                                    >
                                        <Typography component={"span"}>
                                            Additional resources
                                        </Typography>
                                        {ArrowRightIcon}
                                    </ListItem>
                                </NavLink>
                            </List>
                        </div>
                    </Paper>
                </div>
            </Grid>
            <Grid className={classes.grid} md={5} item>
                <Paper className={classes.rightSideHeader}>
                    <Route exact path="/settings">
                        <Typography variant="h6">
                            Your Account
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info">
                        <BackButton/>
                        <Typography variant="h6">
                            Account information
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/username">
                        <BackButton/>
                        <Typography variant="h6">
                            Change username
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/phone">
                        <BackButton/>
                        <Typography variant="h6">
                            Change phone
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/email">
                        <BackButton/>
                        <Typography variant="h6">
                            Change email
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/country">
                        <BackButton/>
                        <Typography variant="h6">
                            Change country
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/languages">
                        <BackButton/>
                        <Typography variant="h6">
                            Languages
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/gender">
                        <BackButton/>
                        <Typography variant="h6">
                            Gender
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/age">
                        <BackButton/>
                        <Typography variant="h6">
                            Age
                        </Typography>
                    </Route>
                    <Route exact path="/settings/password">
                        <BackButton/>
                        <Typography variant="h6">
                            Change your password
                        </Typography>
                    </Route>
                    <Route exact path="/settings/teams">
                        <BackButton/>
                        <Typography variant="h6">
                            TweetDeck Teams
                        </Typography>
                    </Route>
                    <Route exact path="/settings/deactivate">
                        <BackButton/>
                        <Typography variant="h6">
                            Deactivate account
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security_and_account_access">
                        <Typography variant="h6">
                            Security and account access
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security">
                        <BackButton/>
                        <Typography variant="h6">
                            Security
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/login_verification">
                        <BackButton/>
                        <Typography variant="h6">
                            Two-factor authentication
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/apps_and_sessions">
                        <BackButton/>
                        <Typography variant="h6">
                            Apps and sessions
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/connected_apps">
                        <BackButton/>
                        <Typography variant="h6">
                            Connected apps
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/sessions">
                        <BackButton/>
                        <Typography variant="h6">
                            Sessions
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/sessions/current">
                        <BackButton/>
                        <Typography variant="h6">
                            Current session
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/login_history">
                        <BackButton/>
                        <Typography variant="h6">
                            Account access history
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/devices">
                        <BackButton/>
                        <Typography variant="h6">
                            Logged-in devices and apps
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety">
                        <Typography variant="h6">
                            Privacy and safety
                        </Typography>
                    </Route>
                    <Route exact path="/settings/notification">
                        <Typography variant="h6">
                            Notifications
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages">
                        <Typography variant="h6">
                            Accessibility, display and languages
                        </Typography>
                    </Route>
                    <Route exact path="/settings/about">
                        <Typography variant="h6">
                            Additional resources
                        </Typography>
                    </Route>
                </Paper>
                <div className={classes.pageContainer}>
                    <Paper variant="outlined">
                        <div className={classes.pageInfoWrapper}>
                            <Route exact path="/settings" component={Account}/>
                            <Route exact path="/settings/info" component={AccountInformation}/>
                            <Route exact path="/settings/info/username" component={ChangeUsername}/>
                            <Route exact path="/settings/info/phone" component={ChangePhone}/>
                            <Route exact path="/settings/info/email" component={ChangeEmail}/>
                            <Route exact path="/settings/info/country" component={ChangeCountry}/>
                            <Route exact path="/settings/info/languages" component={ChangeLanguage}/>
                            <Route exact path="/settings/info/gender" component={ChangeGender}/>
                            <Route exact path="/settings/info/age" component={ChangeAge}/>
                            <Route exact path="/settings/password" component={ChangeYourPassword}/>
                            <Route exact path="/settings/teams" component={TweetDeckTeams}/>
                            <Route exact path="/settings/deactivate" component={DeactivateAccount}/>
                            <Route exact path="/settings/security_and_account_access" component={SecurityAndAccountAccess}/>
                            <Route exact path="/settings/security" component={Security}/>
                            <Route exact path="/settings/security/login_verification" component={TwoFactorAuthentication}/>
                            <Route exact path="/settings/security/apps_and_sessions" component={AppsAndSessions}/>
                            <Route exact path="/settings/security/connected_apps" component={ConnectedApps}/>
                            <Route exact path="/settings/security/sessions" component={Sessions}/>
                            <Route exact path="/settings/security/sessions/current" component={CurrentSession}/>
                            <Route exact path="/settings/security/login_history" component={AccountAccessHistory}/>
                            <Route exact path="/settings/security/devices" component={LoggedDevices}/>
                            <Route exact path="/settings/privacy_and_safety" component={PrivacyAndSafety}/>
                            <Route exact path="/settings/notification" component={Notifications}/>
                            <Route exact path="/settings/accessibility_display_and_languages" component={Accessibility}/>
                            <Route exact path="/settings/about" component={AdditionalResources}/>
                        </div>
                    </Paper>
                </div>
            </Grid>
        </>
    );
};

export default Settings;
