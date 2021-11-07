import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, Typography} from "@material-ui/core";

import {useAccessibilityDisplayLanguagesStyles} from "./AccessibilityDisplayLanguagesStyles";
import {AccessibilityIcon, ArrowRightIcon, DisplayIcon, LanguagesIcon, TweetActivityIcon} from "../../../icons";

const AccessibilityDisplayLanguages: FC = (): ReactElement => {
    const classes = useAccessibilityDisplayLanguagesStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage how Twitter content is displayed to you.
                </Typography>
            </div>
            <div className={classes.listWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={"/settings/accessibility_display_and_languages/accessibility"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {AccessibilityIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Accessibility
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage aspects of your Twitter experience such as limiting color contrast and
                                    motion.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/accessibility_display_and_languages/display"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {DisplayIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Display
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage your font size, color, and background. These settings affect all the
                                    Twitter accounts on this browser.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/accessibility_display_and_languages/languages"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {LanguagesIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Languages
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage which languages are used to personalize your Twitter experience.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/accessibility_display_and_languages/data"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {TweetActivityIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Data usage
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Limit how Twitter uses some of your network data. These settings affect all the
                                    Twitter accounts on this browser.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                </List>
            </div>
        </>
    );
};

export default AccessibilityDisplayLanguages;
