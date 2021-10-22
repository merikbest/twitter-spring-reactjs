import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';

import {useSettingsStyles} from "./SettingsStyles";
import {Grid, List, ListItem, Paper, Typography} from "@material-ui/core";
import {ArrowRightIcon} from "../../icons";

const Settings: FC = (): ReactElement => {
    const classes = useSettingsStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Grid className={classes.grid} md={4} item>
                <div className={classes.messagesContainer}>
                    <Paper variant="outlined">
                        <Paper className={classes.header}>
                            <div>
                                <Typography variant="h6">
                                    Settings
                                </Typography>
                            </div>
                        </Paper>
                        <div className={classes.listWrapper}>
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem
                                    selected={selectedIndex === 1}
                                    onClick={(event) => handleListItemClick(event, 1)}
                                >
                                    <Typography component={"span"}>
                                        Your account
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
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
                123
            </Grid>
        </>

    );
};

export default Settings;
