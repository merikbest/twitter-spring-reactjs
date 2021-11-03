import React, {FC, ReactElement} from 'react';
import {List, ListItem, Paper, Typography} from "@material-ui/core";

import {useAccessibilityStyles} from "./AccessibilityStyles";
import {
    AccessibilityIcon,
    ArrowRightIcon,
    DisplayIcon,
    LanguagesIcon,
    TweetActivityIcon
} from "../../../icons";

const Accessibility: FC = (): ReactElement => {
    const classes = useAccessibilityStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    <div className={classes.infoItemWrapper}>
                        <Typography component={"div"} className={classes.text}>
                            Manage how Twitter content is displayed to you.
                        </Typography>
                    </div>
                    <div className={classes.listWrapper}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <div className={classes.icon}>
                                    {AccessibilityIcon}
                                </div>
                                <div>
                                    <Typography component={"div"} className={classes.subtitle}>
                                        Filters
                                    </Typography>
                                    <Typography component={"div"} className={classes.text}>
                                        Choose the notifications you’d like to see — and those you don’t.
                                    </Typography>
                                </div>
                                <div className={classes.arrowIcon}>
                                    {ArrowRightIcon}
                                </div>
                            </ListItem>
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
                        </List>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Accessibility;
