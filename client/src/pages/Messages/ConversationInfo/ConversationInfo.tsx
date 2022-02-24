import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Divider, Paper, Switch, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useConversationInfoStyles} from "./ConversationInfoStyles";
import BackButton from "../../../components/BackButton/BackButton";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {LockIcon} from "../../../icons";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {addUserToBlocklist, followUser, unfollowUser} from "../../../store/ducks/user/actionCreators";
import LeaveFromConversationModal from "./LeaveFromConversationModal/LeaveFromConversationModal";
import {leaveFromConversation} from "../../../store/ducks/chats/actionCreators";
import BlockUserModal from "../../../components/BlockUserModal/BlockUserModal";
import {SnackbarProps, withSnackbar} from "../../../hoc/withSnackbar";
import ActionSnackbar from "../../../components/ActionSnackbar/ActionSnackbar";
import UnfollowModal from "../../../components/UnfollowModal/UnfollowModal";
import {
    fetchChatParticipant,
    processFollowRequest,
    resetUserProfileStateAction,
    unfollowProfile
} from "../../../store/ducks/userProfile/actionCreators";
import {useGlobalStyles} from "../../../util/globalClasses";
import {selectUserProfile, selectUsersIsLoading} from "../../../store/ducks/userProfile/selectors";
import Spinner from "../../../components/Spinner/Spinner";

interface ConversationInfoProps {
    participantId?: number;
    chatId?: number;
}

const ConversationInfo: FC<ConversationInfoProps & SnackbarProps> = (
    {
        participantId,
        chatId,
        snackBarMessage,
        openSnackBar,
        setSnackBarMessage,
        setOpenSnackBar,
        onCloseSnackBar
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useConversationInfoStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const myProfile = useSelector(selectUserData);
    const chatParticipant = useSelector(selectUserProfile);
    const isChatParticipantLoading = useSelector(selectUsersIsLoading);
    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);
    const [visibleLeaveFromConversationModal, setVisibleLeaveFromConversationModal] = useState<boolean>(false);
    const [isUserBlocked, setIsUserBlocked] = useState<boolean>(false);
    const [isWaitingForApprove, setIsWaitingForApprove] = useState<boolean>(false);

    const isFollower = myProfile?.followers?.findIndex(follower => follower.id === chatParticipant?.id) !== -1;

    useEffect(() => {
        dispatch(fetchChatParticipant({participantId: participantId!, chatId: chatId!}));

        return () => {
            dispatch(resetUserProfileStateAction());
        };
    }, []);

    useEffect(() => {
        const userBlocked = myProfile?.userBlockedList?.findIndex(blockedUser => blockedUser.id === chatParticipant?.id) !== -1;
        const waitingForApprove = chatParticipant?.followerRequests?.findIndex(blockedUser => blockedUser.id === myProfile?.id) !== -1;
        setBtnText(waitingForApprove ? ("Pending") : (userBlocked ? "Blocked" : "Following"));
        setIsUserBlocked(userBlocked);
        setIsWaitingForApprove(waitingForApprove);
    }, [chatParticipant, myProfile]);

    const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>, callback: () => void): void => {
        event.preventDefault();
        callback();
    };

    const handleFollow = (): void => {
        if (chatParticipant?.privateProfile) {
            handleProcessFollowRequest();
        } else {
            dispatch(followUser({userId: chatParticipant?.id!}));
            // dispatch(followProfile(chatParticipant!));
        }
    };

    const handleUnfollow = (): void => {
        if (chatParticipant?.privateProfile) {
            handleProcessFollowRequest();
        } else {
            dispatch(unfollowUser({userId: chatParticipant?.id!}));
            // dispatch(unfollowProfile(chatParticipant!));
            setVisibleUnfollowModal(false);
        }
    };

    const handleProcessFollowRequest = (): void => {
        dispatch(processFollowRequest(chatParticipant?.id!));
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
        dispatch(addUserToBlocklist({userId: chatParticipant?.id!}));
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
        <div>
            <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant="outlined">
                <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                    <BackButton/>
                    <Typography variant="h5">
                        Conversation info
                    </Typography>
                </Paper>
                {isChatParticipantLoading ? (
                    <Spinner paddingTop={200} />
                ) : (
                    <>
                        <Link to={`/user/${chatParticipant?.id}`} className={globalClasses.link}>
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
                                                        onClick={(event) => handleClickButton(event, onOpenBlockUserModal)}
                                                        className={classnames(classes.containedButton, classes.blockButton)}
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
                                                            onClick={(event) => handleClickButton(event, handleProcessFollowRequest)}
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
                                                            onClick={(event) => handleClickButton(event, handleFollow)}
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
                                                    onClick={(event) => handleClickButton(event, handleClickOpenUnfollowModal)}
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
                        </Link>
                        <Divider/>
                        <div className={globalClasses.itemInfoWrapper}>
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
                            className={classnames(classes.conversationInfoButton, classes.blockUser)}
                            onClick={onOpenBlockUserModal}
                        >
                            <Typography variant={"body1"} component={"span"}>
                                {isUserBlocked ? "Unblock " : "Block "} @{chatParticipant?.username}
                            </Typography>
                        </div>
                        <div className={classnames(classes.conversationInfoButton, classes.blockUser)}>
                            <Typography variant={"body1"} component={"span"}>
                                Report @{chatParticipant?.username}
                            </Typography>
                        </div>
                        <div
                            className={classnames(classes.conversationInfoButton, classes.leaveConversation)}
                            onClick={handleClickOpenLeaveFromConversationModal}
                        >
                            <Typography variant={"body1"} component={"span"}>
                                Leave conversation
                            </Typography>
                        </div>
                    </>
                )}
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
