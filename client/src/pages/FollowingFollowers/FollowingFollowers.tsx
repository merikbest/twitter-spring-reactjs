import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {Button, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {selectUserData, selectUserIsLoading} from "../../store/ducks/user/selectors";
import {User} from "../../store/ducks/user/contracts/state";
import {fetchUserData, followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import {selectUserProfile} from "../../store/ducks/userProfile/selectors";
import {fetchUserProfile} from "../../store/ducks/userProfile/actionCreators";
import {useFollowingFollowersStyles} from "./FollowingFollowersStyles";
import Follower from "../../components/Follower/Follower";
import BackButton from "../../components/BackButton/BackButton";
import Spinner from "../../components/Spinner/Spinner";

const FollowingFollowers: FC = (): ReactElement => {
    const classes = useFollowingFollowersStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string, follow: string }>();
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const isFollowersLoading = useSelector(selectUserIsLoading);
    const [activeTab, setActiveTab] = useState<number>(0);

    const isMyProfile = (userProfile?.id === myProfile?.id);
    const profileData = (isMyProfile) ? (myProfile) : (userProfile);

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
        dispatch(followUser(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header}>
                <BackButton/>
                <div>
                    <Typography component={"div"} className={classes.headerFullName}>
                        {userProfile?.fullName}
                    </Typography>
                    <Typography component={"div"} className={classes.headerUsername}>
                        @{userProfile?.username}
                    </Typography>
                </div>
            </Paper>
            <div className={classes.contentWrapper}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab onClick={handleShowFollowing} className={classes.tab} label="Following"/>
                        <Tab onClick={handleShowFollowers} className={classes.tab} label="Followers"/>
                    </Tabs>
                </div>
                {(isFollowersLoading) ? (
                    <Spinner/>
                ) : (
                    (activeTab === 0) ? (
                        (userProfile?.followers?.length !== 0) ? (
                            profileData?.followers?.map((user) => (
                                <Follower key={user.id} item={user} follow={handleFollow} unfollow={handleUnfollow}/>
                            ))
                        ) : (
                            <div className={classes.content}>
                                <Typography className={classes.topic}>
                                    {(isMyProfile) ? (
                                        "You aren’t following anyone yet"
                                    ) : (
                                        `@${userProfile.username} isn’t following anyone`
                                    )}
                                </Typography>
                                <Typography className={classes.text}>
                                    {(isMyProfile) ? (
                                        "When you do, they’ll be listed here and you’ll see their Tweets in your timeline."
                                    ) : (
                                        "When they do, they’ll be listed here."
                                    )}
                                </Typography>
                                <Link to={"/home/connect"} className={classes.link}>
                                    {(isMyProfile) && (
                                        <Button variant="contained" color="primary">
                                            Find people to follow
                                        </Button>
                                    )}
                                </Link>
                            </div>)
                    ) : (
                        (userProfile?.following?.length !== 0) ? (
                            profileData?.following?.map((user) => (
                                <Follower key={user.id} item={user} follow={handleFollow} unfollow={handleUnfollow}/>
                            ))
                        ) : (
                            <div className={classes.content}>
                                <Typography className={classes.topic}>
                                    {(isMyProfile) ? (
                                        "You don’t have any followers yet"
                                    ) : (
                                        `@${userProfile.username} doesn’t have any followers`
                                    )}
                                </Typography>
                                <Typography className={classes.text}>
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
