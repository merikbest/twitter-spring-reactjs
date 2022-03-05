import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Paper, Typography} from "@material-ui/core";

import BackButton from "../../../components/BackButton/BackButton";
import {fetchUserProfile} from "../../../store/ducks/userProfile/actionCreators";
import {selectUserProfile} from "../../../store/ducks/userProfile/selectors";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {fetchUserListsById, resetListsState} from "../../../store/ducks/lists/actionCreators";
import {selectIsLoaded, selectIsLoading, selectUserListsItems} from "../../../store/ducks/lists/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem/ListsItem";
import {useGlobalStyles} from "../../../util/globalClasses";

const ListsMemberships: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const lists = useSelector(selectUserListsItems);
    const isLoading = useSelector(selectIsLoading);
    const isLoaded = useSelector(selectIsLoaded);
    const params = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchUserProfile(parseInt(params.id)));
        dispatch(fetchUserListsById(parseInt(params.id)));

        return () => {
            dispatch(resetListsState());
        };
    }, [params.id]);

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <Paper className={globalClasses.pageHeader} variant="outlined">
                <BackButton/>
                <div>
                    <Typography variant={"h5"} component={"div"}>
                        Lists {(myProfile?.id === userProfile?.id) && ("you’re on")}
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        @{userProfile?.username}
                    </Typography>
                </div>
            </Paper>
            <div className={globalClasses.contentWrapper}>
                {isLoading ? (
                    <Spinner/>
                ) : (
                    (lists.length === 0 && isLoaded) ? (
                        <div className={globalClasses.infoText}>
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
