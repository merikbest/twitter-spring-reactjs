import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {Paper} from "@material-ui/core";

import {fetchUserProfile} from "../../../store/ducks/userProfile/actionCreators";
import {selectUserProfile} from "../../../store/ducks/userProfile/selectors";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {fetchUserListsById, resetListsState} from "../../../store/ducks/lists/actionCreators";
import {selectIsLoaded, selectIsLoading, selectUserListsItems} from "../../../store/ducks/lists/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem/ListsItem";
import {useGlobalStyles} from "../../../util/globalClasses";
import {PROFILE} from "../../../util/pathConstants";
import {withDocumentTitle} from "../../../hoc/withDocumentTitle";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import EmptyPageDescription from "../../../components/EmptyPageDescription/EmptyPageDescription";
import PageHeaderTitle from "../../../components/PageHeaderTitle/PageHeaderTitle";

const ListsMemberships: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string }>();
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const lists = useSelector(selectUserListsItems);
    const isLoading = useSelector(selectIsLoading);
    const isLoaded = useSelector(selectIsLoaded);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchUserProfile(parseInt(params.id)));

        return () => {
            dispatch(resetListsState());
        };
    }, [params.id]);
    
    useEffect(() => {
        if (userProfile) {
            if ((userProfile.isPrivateProfile && !userProfile.isFollower) || userProfile.isMyProfileBlocked) {
                history.push(`${PROFILE}/${userProfile.id}`);
            } else {
                dispatch(fetchUserListsById(parseInt(params.id)));
            }
        }
    }, [userProfile])

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <PageHeaderWrapper backButton>
                <PageHeaderTitle 
                    title={`Lists ${(myProfile?.id === userProfile?.id) ? "you’re on" : ""}`} 
                    subtitle={`@${userProfile?.username}`}
                />
            </PageHeaderWrapper>
            <div className={globalClasses.contentWrapper}>
                {isLoading ? (
                    <Spinner/>
                ) : (
                    (lists.length === 0 && isLoaded) ? (
                        <EmptyPageDescription
                            title={(myProfile?.id === userProfile?.id) ? (
                                "You haven’t been added to any Lists yet"
                            ) : (
                                `@${userProfile?.username} hasn’t created any Lists`
                            )}
                            subtitle={(myProfile?.id === userProfile?.id) ? (
                                "When someone adds you to a List, it’ll show up here."
                            ) : (
                                "When they do, they’ll show up here."
                            )}
                        />
                    ) : (
                        lists.map((list) => <ListsItem key={list.id} item={list}/>)
                    )
                )}
            </div>
        </Paper>
    );
};

export default withDocumentTitle(ListsMemberships)("Lists");
