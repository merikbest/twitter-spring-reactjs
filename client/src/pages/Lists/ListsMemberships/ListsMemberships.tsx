import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Paper, Typography} from "@material-ui/core";

import {useListsMembershipsStyles} from "./ListsMembershipsStyles";
import BackButton from "../../../components/BackButton/BackButton";
import {fetchUserProfile} from "../../../store/ducks/userProfile/actionCreators";
import {selectUserProfile} from "../../../store/ducks/userProfile/selectors";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {fetchUserListsById, resetListsState} from "../../../store/ducks/lists/actionCreators";
import {selectIsListsLoaded, selectIsListsLoading, selectUserListsItems} from "../../../store/ducks/lists/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem/ListsItem";

const ListsMemberships: FC = (): ReactElement => {
    const classes = useListsMembershipsStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const lists = useSelector(selectUserListsItems);
    const isLoading = useSelector(selectIsListsLoading);
    const isLoaded = useSelector(selectIsListsLoaded);
    const params = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchUserProfile(params.id));
        dispatch(fetchUserListsById(params.id));

        return () => {
            dispatch(resetListsState());
        };
    }, [params.id]);

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <BackButton/>
                <div>
                    <Typography component={"div"} className={classes.headerFullName}>
                        Lists {(myProfile?.id === userProfile?.id) && ("you’re on")}
                    </Typography>
                    <Typography component={"div"} className={classes.headerUsername}>
                        @{userProfile?.username}
                    </Typography>
                </div>
            </Paper>
            <div className={classes.contentWrapper}>
                {isLoading ? (
                    <Spinner/>
                ) : (
                    (lists.length === 0 && isLoaded) ? (
                        <div className={classes.infoWrapper}>
                            <Typography variant={"h4"} component={"div"}>
                                {(myProfile?.id === userProfile?.id) ? (
                                    "You haven’t been added to any Lists yet"
                                ) : (
                                    `@${userProfile?.username} hasn’t created any Lists`
                                )}
                            </Typography>
                            <Typography variant={"subtitle1"} component={"div"}>
                                {(myProfile?.id === userProfile?.id) ? (
                                    "When someone adds you to a List, it’ll show up here."
                                ) : (
                                    "When they do, they’ll show up here."
                                )}
                            </Typography>
                        </div>
                    ) : (
                        lists.map((list) => <ListsItem key={list.id} item={list}/>)
                    )
                )}
            </div>
        </Paper>
    );
};

export default ListsMemberships;
