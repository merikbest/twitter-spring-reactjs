import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Divider, Paper, Switch, Typography} from "@material-ui/core";
import classNames from "classnames";

import {useConversationInfoStyles} from "./ConversationInfoStyles";
import BackButton from "../../../components/BackButton/BackButton";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {LockIcon} from "../../../icons";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {User} from "../../../store/ducks/user/contracts/state";
import {addUserToBlocklist, followUser, unfollowUser} from "../../../store/ducks/user/actionCreators";
import LeaveFromConversationModal from "./LeaveFromConversationModal/LeaveFromConversationModal";
import {leaveFromConversation} from "../../../store/ducks/chats/actionCreators";
import BlockUserModal from "../../../components/BlockUserModal/BlockUserModal";
import {SnackbarProps, withSnackbar} from "../../../hoc/withSnackbar";
import ActionSnackbar from "../../../components/ActionSnackbar/ActionSnackbar";
import UnfollowModal from "../../../components/UnfollowModal/UnfollowModal";
import {followProfile, processFollowRequest, unfollowProfile} from "../../../store/ducks/userProfile/actionCreators";

interface ConversationInfoProps {
    participantId?: number;
    chatId?: number;
    chatParticipant?: User;
}

const ConversationInfo: FC<ConversationInfoProps & SnackbarProps> = (
    {
        participantId,
        chatId,
        chatParticipant,
        snackBarMessage,
        openSnackBar,
        setSnackBarMessage,
        setOpenSnackBar,
        onCloseSnackBar
    }
): ReactElement => {
    const classes = useConversationInfoStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const myProfile = useSelector(selectUserData);
    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);
    const [visibleLeaveFromConversationModal, setVisibleLeaveFromConversationModal] = useState<boolean>(false);
    const [isUserBlocked, setIsUserBlocked] = useState<boolean>(false);
    const [isWaitingForApprove, setIsWaitingForApprove] = useState<boolean>(false);

    const isFollower = myProfile?.followers?.findIndex(follower => follower.id === chatParticipant?.id) !== -1;

    useEffect(() => {
        const userBlocked = myProfile?.userBlockedList?.findIndex(blockedUser => blockedUser.id === chatParticipant?.id) !== -1;
        const waitingForApprove = chatParticipant?.followerRequests?.findIndex(blockedUser => blockedUser.id === myProfile?.id) !== -1;
        console.log(JSON.stringify(chatParticipant?.followerRequests))
        setBtnText(waitingForApprove ? ("Pending") : (userBlocked ? "Blocked" : "Following"));
        setIsUserBlocked(userBlocked);
        setIsWaitingForApprove(waitingForApprove);
    }, [chatParticipant, myProfile]);

    const handleFollow = (user: User): void => {
        if (user?.privateProfile) {
            handleProcessFollowRequest(user);
        } else {
            dispatch(followUser(user));
            dispatch(followProfile(user));
        }
    };

    const handleUnfollow = (user: User): void => {
        if (user?.privateProfile) {
            handleProcessFollowRequest(user);
        } else {
            dispatch(unfollowUser(user));
            dispatch(unfollowProfile(user));
            setVisibleUnfollowModal(false);
        }
    };

    const handleProcessFollowRequest = (user: User): void => {
        dispatch(processFollowRequest(user.id!));
    };

    const handleClickOpenUnfollowModal = (): void => {
        setVisibleUnfollowModal(true);
    };

    const onCloseUnfollowModal = (): void => {
        setVisibleUnfollowModal(false);
    };

    const handleLeaveFromConversation = (): void => {
        dispatch(leaveFromConversation({participantId: participantId!, chatId: chatId!}));
        history.push({pathname: "/messages", state: {removeParticipant: true}});
        setVisibleLeaveFromConversationModal(false);
    };

    const handleClickOpenLeaveFromConversationModal = (): void => {
        setVisibleLeaveFromConversationModal(true);
    };

    const onCloseLeaveFromConversationModal = (): void => {
        setVisibleLeaveFromConversationModal(false);
    };

    const onBlockUser = (): void => {
        dispatch(addUserToBlocklist(chatParticipant?.id!));
        setVisibleBlockUserModal(false);
        setSnackBarMessage!(`@${chatParticipant?.username!} has been ${isUserBlocked ? "unblocked" : "blocked"}.`);
        setOpenSnackBar!(true);
    };

    const onOpenBlockUserModal = (): void => {
        setVisibleBlockUserModal(true);
    };

    const onCloseBlockUserModal = (): void => {
        setVisibleBlockUserModal(false);
    };

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <Paper className={classes.header}>
                    <BackButton/>
                    <Typography variant="h6">
                        Conversation info
                    </Typography>
                </Paper>
                <div className={classes.pageInfoWrapper}>
                    <Avatar
                        className={classes.participantAvatar}
                        src={chatParticipant?.avatar?.src ? chatParticipant?.avatar.src : DEFAULT_PROFILE_IMG}
                    />
                    <div style={{flex: 1}}>
                        <div className={classes.participantInfoWrapper}>
                            <div>
                                <Typography variant={"h6"} component={"span"}>
                                    {chatParticipant?.fullName}
                                </Typography>
                                {chatParticipant?.privateProfile && (
                                    <span className={classes.lockIcon}>
                                        {LockIcon}
                                    </span>
                                )}
                                <Typography variant={"subtitle1"} component={"div"}>
                                    @{chatParticipant?.username}
                                </Typography>
                            </div>
                            <div className={classes.buttonWrapper}>
                                {(!isFollower) ? (
                                    (isUserBlocked) ? (
                                        <Button
                                            onClick={onOpenBlockUserModal}
                                            className={classNames(classes.containedButton, classes.blockButton)}
                                            onMouseOver={() => setBtnText("Unblock")}
                                            onMouseLeave={() => setBtnText("Blocked")}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                        >
                                            {btnText}
                                        </Button>
                                    ) : (
                                        (isWaitingForApprove) ? (
                                            <Button
                                                onClick={() => handleProcessFollowRequest(chatParticipant!)}
                                                className={classes.outlinedButton}
                                                onMouseOver={() => setBtnText("Cancel")}
                                                onMouseLeave={() => setBtnText("Pending")}
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                            >
                                                {btnText}
                                            </Button>
                                        ) : (
                                            <Button
                                                className={classes.outlinedButton}
                                                onClick={() => handleFollow(chatParticipant!)}
                                                color="primary"
                                                variant="outlined"
                                            >
                                                Follow
                                            </Button>
                                        )
                                    )
                                ) : (
                                    <Button
                                        className={classes.containedButton}
                                        onMouseOver={() => setBtnText("Unfollow")}
                                        onMouseLeave={() => setBtnText("Following")}
                                        onClick={handleClickOpenUnfollowModal}
                                        color="primary"
                                        variant="contained"
                                    >
                                        {btnText}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className={classes.notificationsInfoWrapper}>
                    <Typography variant={"h5"} component={"div"}>
                        Notifications
                    </Typography>
                    <div className={classes.switchWrapper}>
                        <Typography variant={"body1"} component={"span"}>
                            {`Snooze notifications from ${chatParticipant?.fullName}`}
                        </Typography>
                        <Switch checked={false}/>
                    </div>
                </div>
                <Divider/>
                <div
                    className={classNames(classes.conversationInfoButton, classes.blockUser)}
                    onClick={onOpenBlockUserModal}
                >
                    <Typography variant={"body1"} component={"span"}>
                        {isUserBlocked ? "Unblock " : "Block "} @{chatParticipant?.username}
                    </Typography>
                </div>
                <div className={classNames(classes.conversationInfoButton, classes.blockUser)}>
                    <Typography variant={"body1"} component={"span"}>
                        Report @{chatParticipant?.username}
                    </Typography>
                </div>
                <div
                    className={classNames(classes.conversationInfoButton, classes.leaveConversation)}
                    onClick={handleClickOpenLeaveFromConversationModal}
                >
                    <Typography variant={"body1"} component={"span"}>
                        Leave conversation
                    </Typography>
                </div>
            </Paper>
            <LeaveFromConversationModal
                handleLeaveFromConversation={handleLeaveFromConversation}
                visible={visibleLeaveFromConversationModal}
                onClose={onCloseLeaveFromConversationModal}
            />
            <UnfollowModal
                user={chatParticipant!}
                visible={visibleUnfollowModal}
                onClose={onCloseUnfollowModal}
                handleUnfollow={handleUnfollow}
            />
            <BlockUserModal
                username={chatParticipant?.username!}
                isUserBlocked={isUserBlocked}
                visible={visibleBlockUserModal}
                onClose={onCloseBlockUserModal}
                onBlockUser={onBlockUser}
            />
            <ActionSnackbar
                snackBarMessage={snackBarMessage!}
                openSnackBar={openSnackBar!}
                onCloseSnackBar={onCloseSnackBar!}
            />
        </div>
    );
};

export default withSnackbar(ConversationInfo);
