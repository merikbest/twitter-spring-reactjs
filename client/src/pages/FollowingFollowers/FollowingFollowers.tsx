import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {Button, List, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
import classnames from "classnames";

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

        if (params.follow === "following") {
            document.title = `People followed by ${userProfile?.fullName} (@${userProfile?.username}) / Twitter`;
            setActiveTab(0);
            dispatch(fetchFollowers(params.id));
        } else {
            document.title = `People following by ${userProfile?.fullName} (@${userProfile?.username}) / Twitter`;
            setActiveTab(1);
            dispatch(fetchFollowings(params.id));
        }

        return () => {
            dispatch(resetUsersState());
            dispatch(resetUserProfileState());
        };
    }, [params.id, params.follow]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        if (newValue === 0) {
            dispatch(fetchFollowers(params.id));
        } else {
            dispatch(fetchFollowings(params.id));
        }
        setActiveTab(newValue);
    };

    const handleShowFollowing = (): void => {
        history.push(`/user/${userProfile?.id}/following`)
    };

    const handleShowFollowers = (): void => {
        history.push(`/user/${userProfile?.id}/followers`)
    };

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                {(userProfile !== undefined) && (
                    <>
                        <BackButton/>
                        <div>
                            <Typography variant={"h5"} component={"div"}>
                                {userProfile?.fullName}
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                @{userProfile?.username}
                            </Typography>
                        </div>
                    </>
                )}
            </Paper>
            <div className={globalClasses.contentWrapper}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab onClick={handleShowFollowing} className={classes.tab} label="Following"/>
                        <Tab onClick={handleShowFollowers} className={classes.tab} label="Followers"/>
                    </Tabs>
                </div>
                {(isUserProfileLoading || isUsersLoading) ? (
                    <Spinner/>
                ) : (
                    (activeTab === 0) ? (
                        (userProfile?.followersSize !== 0) ? (
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
                                        `@${userProfile.username} isn’t following anyone`
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
                                        to={"/home/connect"}
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
                        (userProfile?.followingSize !== 0) ? (
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
                                        `@${userProfile.username} doesn’t have any followers`
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
