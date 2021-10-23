import React, {FC, ReactElement} from 'react';
import {NavLink, Route} from 'react-router-dom';
import {Grid, List, ListItem, Paper, Typography} from "@material-ui/core";

import {useSettingsStyles} from "./SettingsStyles";
import {ArrowRightIcon} from "../../icons";
import Account from "./Account/Account";
import AccountInformation from "./Account/AccountInformation/AccountInformation";
import {BackButton} from "../../components/BackButton/BackButton";
import ChangeUsername from "./Account/AccountInformation/ChangeUsername/ChangeUsername";
import ChangePhone from "./Account/AccountInformation/ChangePhone/ChangePhone";
import ChangeEmail from "./Account/AccountInformation/ChangeEmail/ChangeEmail";
import ChangeCountry from "./Account/AccountInformation/ChangeCountry/ChangeCountry";

const Settings: FC = (): ReactElement => {
    const classes = useSettingsStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
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
                                        onClick={(event) => handleListItemClick(event, 1)}
                                    >
                                        <Typography component={"span"}>
                                            Your account
                                        </Typography>
                                        {ArrowRightIcon}
                                    </ListItem>
                                </NavLink>
                                <ListItem
                                    selected={selectedIndex === 2}
                                    onClick={(event) => handleListItemClick(event, 2)}
                                >
                                    <Typography component={"span"}>
                                        Security and account access
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                                <ListItem
                                    selected={selectedIndex === 3}
                                    onClick={(event) => handleListItemClick(event, 3)}
                                >
                                    <Typography component={"span"}>
                                        Privacy and safety
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                                <ListItem
                                    selected={selectedIndex === 4}
                                    onClick={(event) => handleListItemClick(event, 4)}
                                >
                                    <Typography component={"span"}>
                                        Notifications
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                                <ListItem
                                    selected={selectedIndex === 5}
                                    onClick={(event) => handleListItemClick(event, 5)}
                                >
                                    <Typography component={"span"}>
                                        Accessibility, display, and languages
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                                <ListItem
                                    selected={selectedIndex === 6}
                                    onClick={(event) => handleListItemClick(event, 6)}
                                >
                                    <Typography component={"span"}>
                                        Additional resources
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
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
                </Paper>
                <Route exact path="/settings" component={Account}/>
                <Route exact path="/settings/info" component={AccountInformation}/>
                <Route exact path="/settings/info/username" component={ChangeUsername}/>
                <Route exact path="/settings/info/phone" component={ChangePhone}/>
                <Route exact path="/settings/info/email" component={ChangeEmail}/>
                <Route exact path="/settings/info/country" component={ChangeCountry}/>
            </Grid>
        </>

    );
};

export default Settings;
