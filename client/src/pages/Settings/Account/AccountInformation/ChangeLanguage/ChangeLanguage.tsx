import React, {FC, ReactElement} from 'react';
import {List, ListItem, Paper, Typography} from "@material-ui/core";

import {useChangeLanguageStyles} from "./ChangeLanguageStyles";
import {ArrowRightIcon} from "../../../../../icons";
import {NavLink} from "react-router-dom";

const ChangeLanguage: FC = (): ReactElement => {
    const classes = useChangeLanguageStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    <List>
                        <div className={classes.text}>
                            <Typography component={"span"}>
                                Manage which languages are used to personalize your Twitter experience.
                            </Typography>
                        </div>
                        <div className={classes.title}>
                            <Typography component={"span"}>
                                Display language
                            </Typography>
                        </div>
                        <div className={classes.text}>
                            <Typography component={"span"}>
                                Select your preferred language for headlines, buttons, and other text from Twitter.
                            </Typography>
                        </div>
                        <NavLink to={"/settings/info/language"}>
                            <ListItem>
                                <div>
                                    <Typography component={"div"} className={classes.listItemTitle}>
                                        Display language
                                    </Typography>
                                    <Typography component={"div"} className={classes.listItemText}>
                                        English
                                    </Typography>
                                </div>
                                <div className={classes.arrowIcon}>
                                    {ArrowRightIcon}
                                </div>
                            </ListItem>
                        </NavLink>
                        <div className={classes.divider}/>
                        <div className={classes.title}>
                            <Typography component={"span"}>
                                Select additional languages
                            </Typography>
                        </div>
                        <div className={classes.text}>
                            <Typography component={"span"}>
                                Select additional languages for the content you want to see on Twitter.
                            </Typography>
                        </div>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.listItemTitle}>
                                    Additional languages you speak
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                        <div className={classes.divider}/>
                        <div className={classes.title}>
                            <Typography component={"span"}>
                                Languages you may know
                            </Typography>
                        </div>
                        <div className={classes.text}>
                            <Typography component={"span"}>
                                Manage the languages Twitter inferred based on your activity, such as the accounts you
                                follow and the Tweets you engage with.
                            </Typography>
                        </div>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.listItemTitle}>
                                    Languages you may know
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </List>
                </div>
            </Paper>
        </div>
    );
};

export default ChangeLanguage;
