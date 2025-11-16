import React, { ReactElement } from "react";
import Paper from "@material-ui/core/Paper";
import classnames from "classnames";

import { useUserPageStyles } from "./UserPageStyles";
import Spinner from "../../components/Spinner/Spinner";
import UserNotFound from "./UserNotFound";
import { useGlobalStyles } from "../../util/globalClasses";
import UserPageHeader from "./UserPageHeader";
import UserWallpaper from "./UserWallpaper";
import UserAvatar from "./UserAvatar";
import EditProfileButton from "./EditProfileButton";
import AddUserToChatButton from "./AddUserToChatButton";
import BlockUserButton from "./BlockUserButton";
import NotificationButton from "./NotificationButton";
import UnfollowUserButton from "./UnfollowUserButton";
import CancelUserButton from "./CancelUserButton";
import FollowUserButton from "./FollowUserButton";
import UserInfo from "./UserInfo";
import UserDetails from "./UserDetails";
import UserInteractionCount from "./UserInteractionCount";
import UserUnmuteMessage from "./UserUnmuteMessage";
import UserFollowerGroup from "./UserFollowerGroup";
import UserBlockedMessage from "./UserBlockedMessage";
import UserPrivateProfileMessage from "./UserPrivateProfileMessage";
import UserTweets from "./UserTweets";
import UserPageActions from "./UserPageActions";
import { useUserPage } from "./useUserPage";

const UserPage = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useUserPageStyles();
    const {
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
    } = useUserPage();

    if (isUserProfileNotLoaded) {
        return <UserNotFound />;
    }

    return (
        <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant="outlined">
            <UserPageHeader userTweetsActiveTab={userTweetsActiveTab} />
            <div className={globalClasses.contentWrapper}>
                <UserWallpaper />
                <div className={classes.info}>
                    <UserAvatar />
                    {(isMyProfileLoaded && isUserProfileSuccessLoaded) && (
                        !isMyProfileBlocked && (
                            (userProfileId === myProfileId) ? (
                                <EditProfileButton />
                            ) : (
                                <div className={classes.buttonWrapper}>
                                    <UserPageActions />
                                    {(
                                        (!isPrivateProfile || isFollower) && !isMutedDirectMessages && !isUserBlocked
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
                                <UserTweets
                                    userTweetsActiveTab={userTweetsActiveTab}
                                    handleChangeUserTweetsTab={handleChangeUserTweetsTab}
                                />
                            )
                        )
                    )
                )}
            </div>
        </Paper>
    );
};

export default UserPage;
