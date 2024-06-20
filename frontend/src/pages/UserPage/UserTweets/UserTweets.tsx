import React, { ChangeEvent, FC, memo, ReactElement, useEffect, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import UserPageTweets from "../UserPageTweets";
import { useUserPageStyles } from "../UserPageStyles";
import {
    fetchUserLikedTweets,
    fetchUserMediaTweets,
    fetchUserRetweetsAndReplies,
    fetchUserTweets,
    resetUserTweets
} from "../../../store/ducks/userTweets/actionCreators";
import { selectIsUserTweetsLoaded } from "../../../store/ducks/userTweets/selectors";
import { selectUsersIsSuccessLoaded } from "../../../store/ducks/userProfile/selectors";

interface UserTweetsProps {
    userTweetsActiveTab: number;
    handleChangeUserTweetsTab: (newValue: number) => void;
}

const UserTweets: FC<UserTweetsProps> = memo(({ userTweetsActiveTab, handleChangeUserTweetsTab }): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const params = useParams<{ userId: string }>();
    const isUserProfileSuccessLoaded = useSelector(selectUsersIsSuccessLoaded);
    const isTweetsLoaded = useSelector(selectIsUserTweetsLoaded);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        if (isUserProfileSuccessLoaded) {
            setPage(prevState => prevState + 1);
        }
    }, [isUserProfileSuccessLoaded]);

    const loadUserTweets = (): void => {
        if (userTweetsActiveTab === 1) {
            dispatch(fetchUserRetweetsAndReplies({ userId: params.userId, page }));
        } else if (userTweetsActiveTab === 2) {
            dispatch(fetchUserMediaTweets({ userId: params.userId, page }));
        } else if (userTweetsActiveTab === 3) {
            dispatch(fetchUserLikedTweets({ userId: params.userId, page }));
        } else {
            dispatch(fetchUserTweets({ userId: params.userId, page, activeTab: userTweetsActiveTab }));
        }

        if (isTweetsLoaded) {
            setPage(prevState => prevState + 1);
        }
    };

    const handleChangeActiveTab = (event: ChangeEvent<{}>, newValue: number): void => {
        handleChangeUserTweetsTab(newValue);
    };

    const handleShowTweets = (callback: () => void): void => {
        window.scrollTo(0, 0);
        setPage(0);
        dispatch(resetUserTweets());
        callback();
    };

    const handleShowUserTweets = (): void => {
        dispatch(fetchUserTweets({ userId: params.userId, page: 0 }));
        setPage(prevState => prevState + 1);
    };

    const handleShowUserRetweetsAndReplies = (): void => {
        dispatch(fetchUserRetweetsAndReplies({ userId: params.userId, page: 0 }));
        setPage(prevState => prevState + 1);
    };

    const handleShowMediaTweets = (): void => {
        dispatch(fetchUserMediaTweets({ userId: params.userId, page: 0 }));
        setPage(prevState => prevState + 1);
    };

    const handleShowLikedTweets = (): void => {
        dispatch(fetchUserLikedTweets({ userId: params.userId, page: 0 }));
        setPage(prevState => prevState + 1);
    };

    return (
        <>
            <div className={classes.tabs}>
                <Tabs value={userTweetsActiveTab} indicatorColor="primary" textColor="primary" onChange={handleChangeActiveTab}>
                    <Tab onClick={() => handleShowTweets(handleShowUserTweets)} label="Tweets" />
                    <Tab onClick={() => handleShowTweets(handleShowUserRetweetsAndReplies)} label="Tweets & replies" />
                    <Tab onClick={() => handleShowTweets(handleShowMediaTweets)} label="Media" />
                    <Tab onClick={() => handleShowTweets(handleShowLikedTweets)} label="Likes" />
                </Tabs>
            </div>
            <Divider />
            <div className={classes.tweets}>
                <UserPageTweets userTweetsActiveTab={userTweetsActiveTab} page={page} loadUserTweets={loadUserTweets} />
            </div>
        </>
    );
});

export default UserTweets;
