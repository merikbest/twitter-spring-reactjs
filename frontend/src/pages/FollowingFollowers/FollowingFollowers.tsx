import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { List } from "@material-ui/core";

import { selectUserDataId } from "../../store/ducks/user/selectors";
import {
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfileIsFollower,
    selectUserProfileIsMyProfileBlocked,
    selectUserProfileIsPrivateProfile,
    selectUserProfileUsername,
    selectUsersIsSuccessLoaded
} from "../../store/ducks/userProfile/selectors";
import { fetchUserProfile, resetUserProfileState } from "../../store/ducks/userProfile/actionCreators";
import { useFollowingFollowersStyles } from "./FollowingFollowersStyles";
import { fetchFollowers, fetchFollowings, resetUsersState } from "../../store/ducks/usersSearch/actionCreators";
import { useGlobalStyles } from "../../util/globalClasses";
import { PROFILE, USER } from "../../constants/path-constants";
import FollowingFollowersHeader from "./FollowingFollowersHeader/FollowingFollowersHeader";
import { selectFollowers, selectUsersSearchIsLoading } from "../../store/ducks/usersSearch/selectors";
import Spinner from "../../components/Spinner/Spinner";
import EmptyFollowersDescription from "./EmptyFollowersDescription/EmptyFollowersDescription";
import UsersItem, { UserItemSize } from "../../components/UsersItem/UsersItem";

const FollowingFollowers: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useFollowingFollowersStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string, follow: string }>();
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const fullName = useSelector(selectUserProfileFullName);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const isFollower = useSelector(selectUserProfileIsFollower);
    const isMyProfileBlocked = useSelector(selectUserProfileIsMyProfileBlocked);
    const isUserProfileLoaded = useSelector(selectUsersIsSuccessLoaded);
    const isUsersLoading = useSelector(selectUsersSearchIsLoading);
    const users = useSelector(selectFollowers);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        dispatch(fetchUserProfile(parseInt(params.id)));

        return () => {
            dispatch(resetUsersState());
            dispatch(resetUserProfileState());
        };
    }, [params]);

    useEffect(() => {
        if (isUserProfileLoaded && userProfileId) {
            if ((isPrivateProfile && !isFollower && userProfileId !== myProfileId) || isMyProfileBlocked) {
                history.push(`${PROFILE}/${userProfileId}`);
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
            history.push(`${USER}/${userProfileId}/followers`);
            fetchUsers(1);
        } else {
            history.push(`${USER}/${userProfileId}/following`);
            fetchUsers(0);
        }
    };

    const fetchUsers = (activeTabIndex: number): void => {
        document.title = `People ${activeTabIndex ? "following" : "followed"} by ${fullName} (@${username}) / Twitter`;
        setActiveTab(activeTabIndex);
        const user = { userId: params.id, page: 0 };
        dispatch(resetUsersState());
        dispatch(activeTabIndex ? fetchFollowings(user) : fetchFollowers(user));
    };

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <FollowingFollowersHeader />
            <div className={globalClasses.contentWrapper}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab className={classes.tab} label="Following" />
                        <Tab className={classes.tab} label="Followers" />
                    </Tabs>
                </div>
                {(isUsersLoading && !users.length) ? (
                    <Spinner />
                ) : (
                    (!isUsersLoading && !users.length) ? (
                        <EmptyFollowersDescription activeTab={activeTab} />
                    ) : (
                        <List>
                            {users.map((user) => (
                                <UsersItem key={user.id} user={user} size={UserItemSize.MEDIUM} />
                            ))}
                        </List>
                    )
                )}
            </div>
        </Paper>
    );
};

export default FollowingFollowers;
