import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {Button, CircularProgress, Menu, MenuItem, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {BackButton} from "../BackButton/BackButton";
import {selectUser} from "../../store/ducks/users/selectors";
import {selectUserFollowers, selectUserIsLoading} from "../../store/ducks/user/selectors";
import Follower from "./Follower";
import {Link, useLocation, useParams} from "react-router-dom";
import {fetchUserFollowers, fetchUserFollowing} from "../../store/ducks/user/actionCreators";
import {useStylesFollower} from "./FollowerStyles";

const FollowingFollowers = () => {
    const classes = useStylesFollower();
    const dispatch = useDispatch();
    const location = useLocation<{ follow: number }>();
    const params = useParams<{ id: string }>();
    const userProfile = useSelector(selectUser);
    const followers = useSelector(selectUserFollowers);
    const isFollowersLoading = useSelector(selectUserIsLoading);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        if (location.state.follow === 0) {
            dispatch(fetchUserFollowing(params.id));
        } else {
            dispatch(fetchUserFollowers(params.id));
        }
        setActiveTab(location.state.follow);
    }, [location]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const handleShowFollowing = (): void => {
        dispatch(fetchUserFollowing(params.id));
    };

    const handleShowFollowers = (): void => {
        dispatch(fetchUserFollowers(params.id));
    };

    return (
        <Paper className={classes.followersWrapper} variant="outlined">
            <Paper className={classes.followersHeader}>
                <BackButton/>
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
            ) : (followers?.length !== 0 ? (
                    followers?.map((user) => <Follower user={user}/>)
                ) : (activeTab === 0 ? (
                        <div className={classes.followersTopicWrapper}>
                            <Typography className={classes.followersTopic}>
                                You aren’t following anyone yet
                            </Typography>
                            <Typography className={classes.followersText}>
                                When you do, they’ll be listed here and you’ll see their Tweets in your timeline.
                            </Typography>
                            <Button variant="contained" color="primary">
                                Find people to follow
                            </Button>
                        </div>
                    ) : (
                        <div className={classes.followersTopicWrapper}>
                            <Typography className={classes.followersTopic}>
                                You don’t have any followers yet
                            </Typography>
                            <Typography className={classes.followersText}>
                                When someone follows you, you’ll see them here.
                            </Typography>
                        </div>
                    )
                )
            )}
        </Paper>
    );
};

export default FollowingFollowers;
