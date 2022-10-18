import React, {ReactElement} from "react";

import {useUserListsStyles} from "./UserListsStyles";
import {Paper, Typography} from "@material-ui/core";
import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem/ListsItem";
import {useGlobalStyles} from "../../../util/globalClasses";
import {useSelector} from "react-redux";
import {selectIsUserListsLoading, selectUserListsItems} from "../../../store/ducks/lists/selectors";

const UserLists = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useUserListsStyles();
    const userLists = useSelector(selectUserListsItems);
    const isUserListsLoading = useSelector(selectIsUserListsLoading);

    return (
        <Paper id={"userLists"} className={classes.myLists} variant="outlined">
            <Typography variant="h5" className={globalClasses.itemInfoWrapper}>
                Your Lists
            </Typography>
            {isUserListsLoading ? (
                <Spinner/>
            ) : (
                userLists.map((list) => (<ListsItem key={list.id} item={list} isMyList/>))
            )}
        </Paper>
    );
};

export default UserLists;
