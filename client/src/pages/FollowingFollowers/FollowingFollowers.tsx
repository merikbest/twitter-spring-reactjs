import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {Button, List, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import classnames from "classnames";

import {selectUserData, selectUserIsLoading} from "../../store/ducks/user/selectors";
import {selectUserProfile} from "../../store/ducks/userProfile/selectors";
import {fetchUserProfile, resetUserProfileState} from "../../store/ducks/userProfile/actionCreators";
import {useFollowingFollowersStyles} from "./FollowingFollowersStyles";
import BackButton from "../../components/BackButton/BackButton";
import Spinner from "../../components/Spinner/Spinner";
import {selectFollowers, selectUsersSearchIsLoading} from "../../store/ducks/usersSearch/selectors";
import {fetchFollowers, fetchFollowings, resetUsersState} from "../../store/ducks/usersSearch/actionCreators";
import UsersItem, {UserItemSize} from "../../components/UsersItem/UsersItem";
import {useGlobalStyles} from "../../util/globalClasses";
import {HOME_CONNECT, PROFILE, USER} from "../../util/pathConstants";
import PageHeaderTitle from "../../components/PageHeaderTitle/PageHeaderTitle";

const FollowingFollowers: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useFollowingFollowersStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string, follow: string }>();
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const isUsersLoading = useSelector(selectUsersSearchIsLoading);
    const isUserProfileLoading = useSelector(selectUserIsLoading);
    const users = useSelector(selectFollowers);
    const [activeTab, setActiveTab] = useState<number>(0);

    const isMyProfile = (userProfile?.id === myProfile?.id);

    useEffect(() => {
        dispatch(fetchUserProfile(parseInt(params.id)));

        return () => {
            dispatch(resetUsersState());
            dispatch(resetUserProfileState());
        };
    }, []);
    
    useEffect(() => {
        if (userProfile) {
            if ((userProfile.isPrivateProfile && !userProfile.isFollower && userProfile?.id !== myProfile?.id) || userProfile.isMyProfileBlocked) {
                history.push(`${PROFILE}/${userProfile.id}`);
            } else {
                if (params.follow === "following") {
                    fetchUsers(0);
                } else {
                    fetchUsers( 1);
                }
            }
        }
    }, [userProfile]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        if (newValue) {
            history.push(`${USER}/${userProfile?.id}/followers`);
            fetchUsers(1);
        } else {
            history.push(`${USER}/${userProfile?.id}/following`);
            fetchUsers( 0);
        }
    };

    const fetchUsers = (activeTabIndex: number): void => {
        document.title = `People ${activeTabIndex ? "following" : "followed"} by ${userProfile?.fullName} (@${userProfile?.username}) / Twitter`;
        setActiveTab(activeTabIndex);
        dispatch(activeTabIndex ? fetchFollowings(params.id) : fetchFollowers(params.id));
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
                {(isUserProfileLoading || isUsersLoading) ? (
                    <Spinner/>
                ) : (
                    (activeTab === 0) ? (
                        (userProfile?.followersSize) ? (
                            <List>
                                {users.map((user) => (
                                    <UsersItem key={user.id} item={user} size={UserItemSize.MEDIUM}/>
                                ))}
                            </List>
                        ) : (
                            <div className={classes.content}>
                                <Typography variant={"h5"} component={"div"}>
                                    {(isMyProfile) ? (
                                        "You aren’t following anyone yet"
                                    ) : (
                                        `@${userProfile?.username} isn’t following anyone`
                                    )}
                                </Typography>
                                <Typography variant={"subtitle1"} component={"div"}>
                                    {(isMyProfile) ? (
                                        "When you do, they’ll be listed here and you’ll see their Tweets in your timeline."
                                    ) : (
                                        "When they do, they’ll be listed here."
                                    )}
                                </Typography>
                                {(isMyProfile) && (
                                    <Button
                                        to={HOME_CONNECT}
                                        component={Link}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                    >
                                        Find people to follow
                                    </Button>
                                )}
                            </div>)
                    ) : (
                        (userProfile?.followingSize) ? (
                            <List>
                                {users.map((user) => (
                                    <UsersItem key={user.id} item={user} size={UserItemSize.MEDIUM}/>
                                ))}
                            </List>
                        ) : (
                            <div className={classes.content}>
                                <Typography variant={"h5"} component={"div"}>
                                    {(isMyProfile) ? (
                                        "You don’t have any followers yet"
                                    ) : (
                                        `@${userProfile?.username} doesn’t have any followers`
                                    )}
                                </Typography>
                                <Typography variant={"subtitle1"} component={"div"}>
                                    {(isMyProfile) ? (
                                        "When someone follows you, you’ll see them here."
                                    ) : (
                                        "When someone follows them, they’ll be listed here."
                                    )}
                                </Typography>
                            </div>
                        )
                    )
                )}
            </div>
        </Paper>
    );
};

export default FollowingFollowers;
