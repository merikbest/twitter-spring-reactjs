import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import classnames from "classnames";

import { useUserPageStyles } from "./UserPageStyles";
import { selectUserDataId, selectUserIsLoaded } from "../../store/ducks/user/selectors";
import {
    fetchUserTweets,
    resetUserTweets,
    setAddedUserTweet,
    setUpdatedUserTweet,
    setUserVote
} from "../../store/ducks/userTweets/actionCreators";
import {
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfileIsFollower,
    selectUserProfileIsMutedDirectMessages,
    selectUserProfileIsMyProfileBlocked,
    selectUserProfileIsPrivateProfile,
    selectUserProfileIsUserBlocked,
    selectUserProfileIsWaitingForApprove,
    selectUserProfileUsername,
    selectUsersIsErrorLoaded,
    selectUsersIsLoading,
    selectUsersIsSuccessLoaded
} from "../../store/ducks/userProfile/selectors";
import {
    fetchImages,
    fetchUserProfile,
    resetImagesState,
    resetUserProfileState
} from "../../store/ducks/userProfile/actionCreators";
import { WS_URL } from "../../constants/endpoint-constants";
import Spinner from "../../components/Spinner/Spinner";
import UserNotFound from "./UserNotFound/UserNotFound";
import { useGlobalStyles } from "../../util/globalClasses";
import UserPageHeader from "./UserPageHeader/UserPageHeader";
import UserWallpaper from "./UserWallpaper/UserWallpaper";
import UserAvatar from "./UserAvatar/UserAvatar";
import EditProfileButton from "./EditProfileButton/EditProfileButton";
import AddUserToChatButton from "./AddUserToChatButton/AddUserToChatButton";
import BlockUserButton from "./BlockUserButton/BlockUserButton";
import NotificationButton from "./NotificationButton/NotificationButton";
import UnfollowUserButton from "./UnfollowUserButton/UnfollowUserButton";
import CancelUserButton from "./CancelUserButton/CancelUserButton";
import FollowUserButton from "./FollowUserButton/FollowUserButton";
import UserInfo from "./UserInfo/UserInfo";
import UserDetails from "./UserDetails/UserDetails";
import UserInteractionCount from "./UserInteractionCount/UserInteractionCount";
import UserUnmuteMessage from "./UserUnmuteMessage/UserUnmuteMessage";
import UserFollowerGroup from "./UserFollowerGroup/UserFollowerGroup";
import UserBlockedMessage from "./UserBlockedMessage/UserBlockedMessage";
import UserPrivateProfileMessage from "./UserPrivateProfileMessage/UserPrivateProfileMessage";
import UserTweets from "./UserTweets/UserTweets";
import UserPageActions from "./UserPageActions/UserPageActions";
import { TOPIC_USER_ADD_TWEET, TOPIC_USER_UPDATE_TWEET, TOPIC_USER_VOTE_TWEET } from "../../constants/ws-constants";

let stompClient: CompatClient | null = null;

const UserPage = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
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
    const params = useParams<{ userId: string }>();
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (params.userId) {
            dispatch(fetchUserProfile(parseInt(params.userId)));
            dispatch(fetchImages(parseInt(params.userId)));
        }
        document.body.style.overflow = "unset";

        stompClient = Stomp.over(() => new SockJS(WS_URL));
        stompClient.connect({}, () => {
            stompClient?.subscribe(TOPIC_USER_ADD_TWEET(params.userId), (response) => {
                dispatch(setAddedUserTweet(JSON.parse(response.body)));
            });
            stompClient?.subscribe(TOPIC_USER_UPDATE_TWEET(params.userId), (response) => {
                dispatch(setUpdatedUserTweet(JSON.parse(response.body)));
            });
            stompClient?.subscribe(TOPIC_USER_VOTE_TWEET(params.userId), (response) => {
                dispatch(setUserVote(JSON.parse(response.body)));
            });
        });

        return () => {
            dispatch(resetUserProfileState());
            dispatch(resetUserTweets());
            dispatch(resetImagesState());
            stompClient?.disconnect();
        };
    }, [params.userId]);

    useEffect(() => {
        if (isUserProfileSuccessLoaded) {
            document.title = `${fullName} (@${username}) / Twitter`;
            dispatch(fetchUserTweets({ userId: params.userId, page: 0 }));
        }

        return () => {
            document.title = "Twitter";
            dispatch(resetUserTweets());
        };
    }, [isUserProfileSuccessLoaded]);

    const handleChangeTab = useCallback((newValue: number): void => {
        setActiveTab(newValue);
    }, []);

    return (
        <>
            {isUserProfileNotLoaded ? (
                <UserNotFound />
            ) : (
                <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant="outlined">
                    <UserPageHeader activeTab={activeTab} />
                    <div className={globalClasses.contentWrapper}>
                        <UserWallpaper />
                        <div className={classes.info}>
                            <UserAvatar />
                            {(isMyProfileLoaded && isUserProfileSuccessLoaded) && (
                                isMyProfileBlocked ? null : (
                                    (userProfileId === myProfileId) ? (
                                        <EditProfileButton />
                                    ) : (
                                        <div className={classes.buttonWrapper}>
                                            <UserPageActions />
                                            {(
                                                (!isPrivateProfile || isFollower) &&
                                                !isMutedDirectMessages &&
                                                !isUserBlocked
                                            ) && (
                                                <AddUserToChatButton />
                                            )}
                                            {isUserBlocked ? (
                                                <BlockUserButton />
                                            ) : (
                                                isFollower ? (
                                                    <>
                                                        <NotificationButton />
                                                        <UnfollowUserButton />
                                                    </>
                                                ) : (
                                                    userProfileId && (
                                                        isWaitingForApprove ? (
                                                            <CancelUserButton />
                                                        ) : (
                                                            <FollowUserButton />
                                                        )
                                                    )
                                                )
                                            )}
                                        </div>
                                    )
                                )
                            )}
                            <UserInfo />
                            <div className={classes.infoList}>
                                <UserDetails />
                                <UserInteractionCount />
                            </div>
                            <UserUnmuteMessage />
                            <UserFollowerGroup />
                        </div>
                        {isUserProfileLoading ? (
                            <Spinner />
                        ) : (
                            (isUserProfileSuccessLoaded) && (
                                isMyProfileBlocked ? (
                                    <UserBlockedMessage />
                                ) : (
                                    isPrivateProfile && !isFollower && userProfileId !== myProfileId ? (
                                        <UserPrivateProfileMessage />
                                    ) : (
                                        <UserTweets activeTab={activeTab} handleChangeTab={handleChangeTab} />
                                    )
                                )
                            )
                        )}
                    </div>
                </Paper>
            )}
        </>
    );
};

export default UserPage;
