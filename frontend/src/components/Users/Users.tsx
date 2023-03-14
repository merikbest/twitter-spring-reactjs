import React, { FC, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";

import { selectUsers, selectUsersIsLoading } from "../../store/ducks/users/selectors";
import UsersItem, { UserItemSize } from "../UsersItem/UsersItem";
import { useUsersStyles } from "./UsersStyles";
import Spinner from "../Spinner/Spinner";
import { resetUsersState } from "../../store/ducks/users/actionCreators";
import { HOME_CONNECT } from "../../constants/path-constants";

const Users: FC = (): ReactElement => {
    const classes = useUsersStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const users = useSelector(selectUsers);
    const isUsersLoading = useSelector(selectUsersIsLoading);

    const clickToConnect = () => {
        dispatch(resetUsersState());
        history.push(HOME_CONNECT);
    };

    return (
        <>
            {(history.location.pathname !== HOME_CONNECT) && (
                <Paper className={classes.container}>
                    <Paper className={classes.header} variant="outlined">
                        <Typography variant={"h5"} component={"div"}>
                            Who to follow
                        </Typography>
                    </Paper>
                    {isUsersLoading ? (
                        <Spinner />
                    ) : (
                        <List>
                            {users.slice(0, 5).map((user) => (
                                <UsersItem key={user.id} user={user} size={UserItemSize.SMALL} />
                            ))}
                            <ListItem id={"clickToConnect"} onClick={clickToConnect} className={classes.footer}>
                                <Typography variant={"body1"} component={"div"}>
                                    Show more
                                </Typography>
                            </ListItem>
                        </List>
                    )}
                </Paper>
            )}
        </>
    );
};

export default Users;
