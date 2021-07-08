import React, {ChangeEvent, useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {Button, CircularProgress, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import {selectUserData, selectUserIsLoading} from "../../store/ducks/user/selectors";
import {User} from "../../store/ducks/user/contracts/state";
import {fetchUserData} from "../../store/ducks/user/actionCreators";
import {selectUserProfile} from "../../store/ducks/userProfile/selectors";
import {fetchUserProfile, followProfile, unfollowProfile} from "../../store/ducks/userProfile/actionCreators";
import {useHomeStyles} from "../../pages/Home/HomeStyles";
import Follower from "./Follower";

const FollowingFollowers = () => {
    const classes = useHomeStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string, follow: string }>();
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const isFollowersLoading = useSelector(selectUserIsLoading);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        if (params.follow === "following") {
            setActiveTab(0);
        } else {
            setActiveTab(1);
        }
        dispatch(fetchUserProfile(params.id));
        dispatch(fetchUserData());
    }, []);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const handleShowFollowing = (): void => {
        history.push(`/user/${userProfile?.id}/following`)
    };

    const handleShowFollowers = (): void => {
        history.push(`/user/${userProfile?.id}/followers`)
    };

    const handleClickBack = (): void => {
        history.push(`/user/${userProfile?.id}`);
    };

    const handleFollow = (user: User): void => {
        dispatch(followProfile(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowProfile(user));
    };

    return (
        <Paper className={classes.followersWrapper} variant="outlined">
            <Paper className={classes.followersHeader}>
                <IconButton onClick={handleClickBack} style={{marginRight: 20}} color="primary">
                    <ArrowBackIcon/>
                </IconButton>
                <div>
                    <Typography variant="h6">{userProfile?.fullName}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>@{userProfile?.username}</Typography>
                </div>
            </Paper>
            <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                <Tab onClick={handleShowFollowing} className={classes.followersTab} label="Following"/>
                <Tab onClick={handleShowFollowers} className={classes.followersTab} label="Followers"/>
            </Tabs>
            {isFollowersLoading ? (
                <div className={classes.followersCentred}>
                    <CircularProgress/>
                </div>
            ) : (activeTab === 0 ? (userProfile?.followers?.length !== 0 ? (
                        userProfile?.followers?.map((user) =>
                            <Follower classes={classes} user={user} follow={handleFollow} unfollow={handleUnfollow}/>)
                    ) : (
                        <div className={classes.followersTopicWrapper}>
                            <Typography className={classes.followersTopic}>
                                {userProfile?.id === myProfile?.user.id ? (
                                    "You aren’t following anyone yet"
                                ) : (
                                    `@${userProfile.username} isn’t following anyone`
                                )}
                            </Typography>
                            <Typography className={classes.followersText}>
                                {userProfile?.id === myProfile?.user.id ? (
                                    "When you do, they’ll be listed here and you’ll see their Tweets in your timeline."
                                ) : (
                                    "When they do, they’ll be listed here."
                                )}
                            </Typography>
                            <Link to={"/home/connect"} className={classes.followerLink}>
                                {userProfile?.id === myProfile?.user.id ? (
                                    <Button variant="contained" color="primary">
                                        Find people to follow
                                    </Button>) : null}
                            </Link>
                        </div>
                    )
                ) : (userProfile?.following?.length !== 0 ? (
                        userProfile?.following?.map((user) =>
                            <Follower classes={classes} user={user} follow={handleFollow} unfollow={handleUnfollow}/>)
                    ) : (
                        <div className={classes.followersTopicWrapper}>
                            <Typography className={classes.followersTopic}>
                                {userProfile?.id === myProfile?.user.id ? (
                                    "You don’t have any followers yet"
                                ) : (
                                    `@${userProfile.username} doesn’t have any followers`
                                )}
                            </Typography>
                            <Typography className={classes.followersText}>
                                {userProfile?.id === myProfile?.user.id ? (
                                    "When someone follows you, you’ll see them here."
                                ) : (
                                    "When someone follows them, they’ll be listed here."
                                )}
                            </Typography>
                        </div>
                    )
                )
            )}
        </Paper>
    );
};

export default FollowingFollowers;
