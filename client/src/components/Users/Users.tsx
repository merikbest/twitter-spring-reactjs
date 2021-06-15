import React, {FC, ReactElement} from 'react';
import {Paper, Typography} from "@material-ui/core";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Button from "@material-ui/core/Button/Button";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import Divider from "@material-ui/core/Divider/Divider";
import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {useSelector} from "react-redux";
import {selectUsersItems} from "../../store/ducks/users/selectors";

const Users: FC = (): ReactElement => {
    const classes = useHomeStyles();
    const items = useSelector(selectUsersItems);

    return (
        <Paper className={classes.rightSideBlock}>
            <Paper className={classes.rightSideBlockHeader} variant="outlined">
                <b>Кого читать</b>
            </Paper>
            <List>
                {items.map(() => {
                    return (
                        <ListItem className={classes.rightSideBlockItem}>
                            <ListItemAvatar>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://avatars.githubusercontent.com/u/56604599?v=4"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Dock Of Shame"
                                secondary={
                                    <Typography component="span" variant="body2" color="textSecondary">
                                        @FavDockOfShame
                                    </Typography>
                                }
                            />
                            <Button color="primary">
                                <PersonAddIcon/>
                            </Button>
                        </ListItem>
                    );
                })}
                <Divider component="li"/>
            </List>
        </Paper>
    );
};

export default Users;
