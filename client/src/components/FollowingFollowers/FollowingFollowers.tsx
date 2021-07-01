import React, {ChangeEvent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {Button, CircularProgress, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import {selectUser} from "../../store/ducks/users/selectors";
import {selectUserIsLoading} from "../../store/ducks/user/selectors";
import {useHistory, useParams} from "react-router-dom";
import {useStylesFollower} from "./FollowerStyles";
import {fetchUser} from "../../store/ducks/users/actionCreators";
import Follower from "./Follower";

const FollowingFollowers = () => {
    const classes = useStylesFollower();
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string, follow: string }>();
    const userProfile = useSelector(selectUser);
    const isFollowersLoading = useSelector(selectUserIsLoading);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        if (params.follow === "following") {
            setActiveTab(0);
        } else {
            setActiveTab(1);
        }
        dispatch(fetchUser(params.id));
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
                        userProfile?.followers?.map((user) => <Follower user={user}/>)
                    ) : (
                        <div className={classes.followersTopicWrapper}>
                            <Typography className={classes.followersTopic}>
                                You aren’t following anyone yet
                            </Typography>
                            <Typography className={classes.followersText}>
                                When you do, they’ll be listed here and you’ll see their Tweets in your timeline.
                            </Typography>
                            <Link to={"/home/connect"} className={classes.followerLink}>
                                <Button variant="contained" color="primary">
                                    Find people to follow
                                </Button>
                            </Link>
                        </div>
                    )
                ) : (userProfile?.following?.length !== 0 ? (
                        userProfile?.following?.map((user) => <Follower user={user}/>)
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
