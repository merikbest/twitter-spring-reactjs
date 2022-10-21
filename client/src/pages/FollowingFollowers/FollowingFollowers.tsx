import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {List} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import classnames from "classnames";

import {selectUserData, selectUserIsLoaded} from "../../store/ducks/user/selectors";
import {selectUserProfile} from "../../store/ducks/userProfile/selectors";
import {fetchUserProfile, resetUserProfileState} from "../../store/ducks/userProfile/actionCreators";
import {useFollowingFollowersStyles} from "./FollowingFollowersStyles";
import BackButton from "../../components/BackButton/BackButton";
import Spinner from "../../components/Spinner/Spinner";
import {selectFollowers, selectUsersSearchIsLoading} from "../../store/ducks/usersSearch/selectors";
import {fetchFollowers, fetchFollowings, resetUsersState} from "../../store/ducks/usersSearch/actionCreators";
import UsersItem, {UserItemSize} from "../../components/UsersItem/UsersItem";
import {useGlobalStyles} from "../../util/globalClasses";
import {PROFILE, USER} from "../../util/pathConstants";
import PageHeaderTitle from "../../components/PageHeaderTitle/PageHeaderTitle";
import EmptyFollowersDescription from "./EmptyFollowersDescription/EmptyFollowersDescription";

const FollowingFollowers: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useFollowingFollowersStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string, follow: string }>();
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const isUsersLoading = useSelector(selectUsersSearchIsLoading);
    const isUserProfileLoaded = useSelector(selectUserIsLoaded);
    const users = useSelector(selectFollowers);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        dispatch(fetchUserProfile(parseInt(params.id)));

        return () => {
            dispatch(resetUsersState());
            dispatch(resetUserProfileState());
        };
    }, []);

    useEffect(() => {
        if (isUserProfileLoaded && userProfile) {
            if ((userProfile.isPrivateProfile && !userProfile.isFollower && userProfile?.id !== myProfile?.id) || userProfile.isMyProfileBlocked) {
                history.push(`${PROFILE}/${userProfile.id}`);
            } else {
                if (params.follow === "following") {
                    fetchUsers(0);
                } else {
                    fetchUsers(1);
                }
            }
        }
    }, [isUserProfileLoaded]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        if (newValue) {
            history.push(`${USER}/${userProfile?.id}/followers`);
            fetchUsers(1);
        } else {
            history.push(`${USER}/${userProfile?.id}/following`);
            fetchUsers(0);
        }
    };

    const fetchUsers = (activeTabIndex: number): void => {
        document.title = `People ${activeTabIndex ? "following" : "followed"} by ${userProfile?.fullName} (@${userProfile?.username}) / Twitter`;
        setActiveTab(activeTabIndex);
        const user = {userId: params.id, page: 0};
        dispatch(resetUsersState());
        dispatch(activeTabIndex ? fetchFollowings(user) : fetchFollowers(user));
    };

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                {(userProfile) && (
                    <>
                        <BackButton/>
                        <PageHeaderTitle title={userProfile?.fullName} subtitle={`@${userProfile?.username}`}/>
                    </>
                )}
            </Paper>
            <div className={globalClasses.contentWrapper}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab className={classes.tab} label="Following"/>
                        <Tab className={classes.tab} label="Followers"/>
                    </Tabs>
                </div>
                {(isUsersLoading && !users.length) ? (
                    <Spinner/>
                ) : (
                    (!isUsersLoading && !users.length) ? (
                        <EmptyFollowersDescription
                            activeTab={activeTab}
                            isMyProfile={userProfile?.id === myProfile?.id}
                            username={userProfile?.username}
                        />
                    ) : (
                        <List>
                            {users.map((user) => (
                                <UsersItem key={user.id} user={user} size={UserItemSize.MEDIUM}/>
                            ))}
                        </List>
                    )
                )}
            </div>
        </Paper>
    );
};

export default FollowingFollowers;
