import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import {
    fetchUserPinnedTweet,
    fetchUserTweets,
    resetUserTweets,
    setAddedUserTweet,
    setUpdatedUserTweet,
    setUserVote
} from "../../store/ducks/userTweets/actionCreators";
import {
    fetchImages,
    fetchUserProfile,
    resetImagesState,
    resetUserProfileState
} from "../../store/ducks/userProfile/actionCreators";
import {
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfileIsFollower,
    selectUserProfileIsMutedDirectMessages, selectUserProfileIsMyProfileBlocked,
    selectUserProfileIsPrivateProfile, selectUserProfileIsUserBlocked, selectUserProfileIsWaitingForApprove,
    selectUserProfileUsername,
    selectUsersIsErrorLoaded,
    selectUsersIsLoading,
    selectUsersIsSuccessLoaded
} from "../../store/ducks/userProfile/selectors";
import { WS_URL } from "../../constants/endpoint-constants";
import { TOPIC_USER_ADD_TWEET, TOPIC_USER_UPDATE_TWEET, TOPIC_USER_VOTE_TWEET } from "../../constants/ws-constants";
import { selectUserDataId, selectUserIsLoaded } from "../../store/ducks/user/selectors";

let stompClient: CompatClient | null = null;

export const useUserPage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams<{ userId: string }>();
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const fullName = useSelector(selectUserProfileFullName);
    const username = useSelector(selectUserProfileUsername);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const isFollower = useSelector(selectUserProfileIsFollower);
    const isMutedDirectMessages = useSelector(selectUserProfileIsMutedDirectMessages);
    const isUserBlocked = useSelector(selectUserProfileIsUserBlocked);
    const isMyProfileBlocked = useSelector(selectUserProfileIsMyProfileBlocked);
    const isWaitingForApprove = useSelector(selectUserProfileIsWaitingForApprove);
    const isMyProfileLoaded = useSelector(selectUserIsLoaded);
    const isUserProfileLoading = useSelector(selectUsersIsLoading);
    const isUserProfileSuccessLoaded = useSelector(selectUsersIsSuccessLoaded);
    const isUserProfileNotLoaded = useSelector(selectUsersIsErrorLoaded);
    const [userTweetsActiveTab, setUserTweetsActiveTab] = useState(0);

    const handleChangeUserTweetsTab = useCallback((newValue: number): void => {
        setUserTweetsActiveTab(newValue);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (userId) {
            dispatch(fetchUserProfile(parseInt(userId)));
            dispatch(fetchImages(parseInt(userId)));
        }
        document.body.style.overflow = "unset";

        stompClient = Stomp.over(() => new SockJS(WS_URL));
        stompClient.connect({}, () => {
            stompClient?.subscribe(TOPIC_USER_ADD_TWEET(userId), (response) => {
                dispatch(setAddedUserTweet(JSON.parse(response.body)));
            });
            stompClient?.subscribe(TOPIC_USER_UPDATE_TWEET, (response) => {
                dispatch(setUpdatedUserTweet(JSON.parse(response.body)));
            });
            stompClient?.subscribe(TOPIC_USER_VOTE_TWEET(userId), (response) => {
                dispatch(setUserVote(JSON.parse(response.body)));
            });
        });
        setUserTweetsActiveTab(0);

        return () => {
            dispatch(resetUserProfileState());
            dispatch(resetUserTweets());
            dispatch(resetImagesState());
            stompClient?.disconnect();
        };
    }, [userId]);

    useEffect(() => {
        if (isUserProfileSuccessLoaded) {
            document.title = `${fullName} (@${username}) / Twitter`;
            dispatch(fetchUserPinnedTweet({ userId }));
            dispatch(fetchUserTweets({ userId, page: 0 }));
        }

        return () => {
            document.title = "Twitter";
            dispatch(resetUserTweets());
        };
    }, [isUserProfileSuccessLoaded]);

    return {
        myProfileId,
        userProfileId,
        isPrivateProfile,
        isFollower,
        isMutedDirectMessages,
        isUserBlocked,
        isMyProfileBlocked,
        isWaitingForApprove,
        isMyProfileLoaded,
        userTweetsActiveTab,
        handleChangeUserTweetsTab,
        isUserProfileLoading,
        isUserProfileSuccessLoaded,
        isUserProfileNotLoaded
    };
};
