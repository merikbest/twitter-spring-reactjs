import React, {FC, ReactElement} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {CircularProgress, Paper, Typography} from "@material-ui/core";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Button from "@material-ui/core/Button/Button";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import Divider from "@material-ui/core/Divider/Divider";

import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {selectUsersIsLoading, selectUsers} from "../../store/ducks/users/selectors";

const Users: FC = (): ReactElement => {
    const classes = useHomeStyles();
    const location = useLocation();
    const users = useSelector(selectUsers);
    const isUsersLoading = useSelector(selectUsersIsLoading);

    return (
        <>
            {location.pathname === "/home/connect" ? null :
                <Paper className={classes.rightSideBlock}>
                    <Paper className={classes.rightSideBlockHeader} variant="outlined">
                        <b>Who to follow</b>
                    </Paper>
                    {isUsersLoading ? (
                        <div className={classes.tweetsCentred}>
                            <CircularProgress/>
                        </div>
                    ) : (
                        <List>
                            {users.map((user) => {
                                return (
                                    <Link to={`/user/${user.id}`}>
                                        <ListItem key={user.id} className={classes.rightSideBlockItem}>
                                            <ListItemAvatar>
                                                <Avatar alt={`${user.id}`} src={user.avatar?.src}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={user.fullName}
                                                secondary={
                                                    <Typography component="span" variant="body2" color="textSecondary">
                                                        @{user.username}
                                                    </Typography>
                                                }
                                            />
                                            <Button color="primary">
                                                <PersonAddIcon/>
                                            </Button>
                                        </ListItem>
                                    </Link>
                                );
                            })}
                            <Divider component="li"/>
                        </List>
                    )}
                </Paper>
            }
        </>

    );
};

export default Users;
