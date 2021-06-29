import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {BackButton} from "../BackButton/BackButton";
import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {selectUser} from "../../store/ducks/users/selectors";
import {selectUserFollowers} from "../../store/ducks/user/selectors";
import Follower from "./Follower";
import {useLocation, useParams} from "react-router-dom";
import {fetchUserFollowers, fetchUserFollowing} from "../../store/ducks/user/actionCreators";

const FollowingFollowers = () => {
    const classes = useHomeStyles();
    const dispatch = useDispatch();
    const location = useLocation<{ follow: number }>();
    const params = useParams<{ id: string }>();
    const userProfile = useSelector(selectUser);
    const followers = useSelector(selectUserFollowers);
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
        <Paper className={classes.tweetsWrapper} variant="outlined">
            <Paper className={classes.tweetsHeader}>
                <BackButton/>
                <div>
                    <Typography variant="h6">{userProfile?.fullName}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>@{userProfile?.username}</Typography>
                </div>
            </Paper>
            <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                <Tab onClick={handleShowFollowing} style={{minWidth: "301px", textTransform: 'none'}} label="Following"/>
                <Tab onClick={handleShowFollowers} style={{minWidth: "301px", textTransform: 'none'}} label="Followers"/>
            </Tabs>
            {followers ? (followers.map((user) => <Follower user={user}/>)) : null}
        </Paper>
    );
};

export default FollowingFollowers;
