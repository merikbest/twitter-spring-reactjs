import React, {FC, ReactElement} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Paper, Typography} from "@material-ui/core";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";

import {selectUsers, selectUsersIsLoading} from "../../store/ducks/users/selectors";
import UsersItem, {UserItemSize} from "../UsersItem/UsersItem";
import {useUsersStyles} from "./UsersStyles";
import Spinner from "../Spinner/Spinner";

const Users: FC = (): ReactElement => {
    const classes = useUsersStyles();
    const location = useLocation();
    const users = useSelector(selectUsers);
    const isUsersLoading = useSelector(selectUsersIsLoading);

    return (
        <>
            {(location.pathname !== "/home/connect") && (
                <Paper className={classes.container}>
                    <Paper className={classes.header} variant="outlined">
                        <Typography variant={"h5"} component={"div"}>
                            Who to follow
                        </Typography>
                    </Paper>
                    {isUsersLoading ? (
                        <Spinner/>
                    ) : (
                        <List>
                            {users.slice(0, 5).map((user) => (
                                <UsersItem key={user.id} item={user} size={UserItemSize.SMALL}/>
                            ))}
                            <Link to={"/home/connect"}>
                                <ListItem className={classes.footer}>
                                    <Typography variant={"subtitle1"} component={"div"}>
                                        Show more
                                    </Typography>
                                </ListItem>
                            </Link>
                        </List>
                    )}
                </Paper>)
            }
        </>
    );
};

export default Users;
