import React, {FC, ReactElement} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {CircularProgress, Paper} from "@material-ui/core";
import List from "@material-ui/core/List/List";
import Divider from "@material-ui/core/Divider/Divider";

import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {selectUsersIsLoading, selectUsers} from "../../store/ducks/users/selectors";
import UsersItem from "./UsersItem";

interface UsersProps {
    classes: ReturnType<typeof useHomeStyles>;
}

const Users: FC<UsersProps> = ({classes}): ReactElement => {
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
                            {users.map((user) => <UsersItem classes={classes} user={user}/>)}
                            <Divider component="li"/>
                        </List>
                    )}
                </Paper>
            }
        </>
    );
};

export default Users;
