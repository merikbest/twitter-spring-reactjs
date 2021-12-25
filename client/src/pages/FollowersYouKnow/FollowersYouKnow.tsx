import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {Paper, Typography} from "@material-ui/core";

import {useFollowersYouKnowStyles} from "./FollowersYouKnowStyles";
import {UserApi} from "../../services/api/userApi";
import {User} from "../../store/ducks/user/contracts/state";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import BackButton from "../../components/BackButton/BackButton";
import ConnectToUsers from "../../components/ConnectToUsers/ConnectToUsers";
import {fetchUserProfile} from "../../store/ducks/userProfile/actionCreators";
import {selectUserProfile} from "../../store/ducks/userProfile/selectors";
import {selectUserData} from "../../store/ducks/user/selectors";
import Spinner from "../../components/Spinner/Spinner";

const FollowersYouKnow: FC = (): ReactElement => {
    const classes = useFollowersYouKnowStyles();
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const history = useHistory();
    const userProfile = useSelector(selectUserProfile);
    const myProfile = useSelector(selectUserData);
    const [overallFollowers, setOverallFollowers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        dispatch(fetchUserProfile(params.id));
        setOverallFollowers([]);
        setIsLoading(true);
        UserApi.overallFollowers(params.id)
            .then(response => {
                setOverallFollowers(response);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (userProfile?.privateProfile) {
            history.push(`/user/${params.id}`);
        }
    }, [userProfile]);

    useEffect(() => {
        if (parseInt(params.id) === myProfile?.id) {
            history.push(`/user/${myProfile?.id}/followers`);
        }
    }, [myProfile]);

    const handleFollow = (user: User): void => {
        dispatch(followUser(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <BackButton/>
                <div>
                    <Typography component={"span"} className={classes.headerFullName}>
                        {userProfile?.fullName}
                    </Typography>
                    <Typography component={"div"} className={classes.headerUsername}>
                        @{userProfile?.username}
                    </Typography>
                </div>
            </Paper>
            {(isLoading && (overallFollowers.length === 0)) ? (
                <Spinner paddingTop={150}/>
            ) : (
                (!isLoading && (overallFollowers.length === 0)) ? (
                    <div className={classes.contentWrapper}>
                        <div className={classes.infoWrapper}>
                            <Typography component={"div"} className={classes.infoTitle}>
                                {`@${userProfile?.username} doesn’t have any followers you know yet`}
                            </Typography>
                            <Typography component={"div"} className={classes.infoText}>
                                When someone you know follows them, they’ll be listed here.
                            </Typography>
                        </div>
                    </div>
                ) : (
                    <ConnectToUsers
                        title={"Followers you know"}
                        isUsersLoading={isLoading}
                        users={overallFollowers}
                        handleFollow={handleFollow}
                        handleUnfollow={handleUnfollow}
                    />
                )
            )}
        </Paper>
    );
};

export default FollowersYouKnow;
