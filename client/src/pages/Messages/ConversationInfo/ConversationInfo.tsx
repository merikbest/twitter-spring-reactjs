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
import {
    followUser,
    processFollowRequest,
    processUserToBlocklist,
    unfollowUser
} from "../../../store/ducks/user/actionCreators";
import LeaveFromConversationModal from "./LeaveFromConversationModal/LeaveFromConversationModal";
import {leaveFromConversation} from "../../../store/ducks/chats/actionCreators";
import BlockUserModal from "../../../components/BlockUserModal/BlockUserModal";
import {SnackbarProps, withSnackbar} from "../../../hoc/withSnackbar";
import ActionSnackbar from "../../../components/ActionSnackbar/ActionSnackbar";
import UnfollowModal from "../../../components/UnfollowModal/UnfollowModal";
import {fetchChatParticipant, resetUserProfileState} from "../../../store/ducks/userProfile/actionCreators";
import {useGlobalStyles} from "../../../util/globalClasses";
import {selectUserProfile, selectUsersIsLoading} from "../../../store/ducks/userProfile/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import {UserResponse} from "../../../store/types/user";

interface ConversationInfoProps {
    participantId?: number;
    chatId?: number;
    onBlockParticipant: () => void;
}

const ConversationInfo: FC<ConversationInfoProps & SnackbarProps> = (
    {
        participantId,
        chatId,
        onBlockParticipant,
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

    useEffect(() => {
        dispatch(fetchChatParticipant({participantId: participantId!, chatId: chatId!}));

        return () => {
            dispatch(resetUserProfileState());
        };
    }, []);

    useEffect(() => {
        setBtnText(chatParticipant?.isWaitingForApprove ? ("Pending") : (chatParticipant?.isUserBlocked ? "Blocked" : "Following"));
    }, [chatParticipant, myProfile]);

    const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>, callback: () => void): void => {
        event.preventDefault();
        callback();
    };

    const handleFollow = (): void => {
        if (chatParticipant?.isPrivateProfile) {
            handleProcessFollowRequest();
        } else {
            dispatch(followUser({userId: chatParticipant?.id!}));
        }
    };

    const handleUnfollow = (): void => {
        if (chatParticipant?.isPrivateProfile) {
            handleProcessFollowRequest();
        } else {
            dispatch(unfollowUser({userId: chatParticipant?.id!}));
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
        dispatch(processUserToBlocklist({userId: chatParticipant?.id!}));
        onBlockParticipant();
        setVisibleBlockUserModal(false);
        setSnackBarMessage!(`@${chatParticipant?.username!} has been ${chatParticipant?.isUserBlocked ? "unblocked" : "blocked"}.`);
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
                    <Spinner paddingTop={200}/>
                ) : (
                    <>
                        <Link to={`/profile/${chatParticipant?.id}`} className={globalClasses.link}>
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
                                            {chatParticipant?.isPrivateProfile && (
                                                <span className={classes.lockIcon}>
                                                    {LockIcon}
                                                </span>
                                            )}
                                            <Typography variant={"subtitle1"} component={"div"}>
                                                @{chatParticipant?.username}
                                            </Typography>
                                        </div>
                                        <div className={classes.buttonWrapper}>
                                            {(!chatParticipant?.isFollower) ? (
                                                (chatParticipant?.isUserBlocked) ? (
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
                                                    (chatParticipant?.isWaitingForApprove) ? (
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
                                {chatParticipant?.isUserBlocked ? "Unblock " : "Block "} @{chatParticipant?.username}
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
                user={chatParticipant! as unknown as UserResponse}
                visible={visibleUnfollowModal}
                onClose={onCloseUnfollowModal}
                handleUnfollow={handleUnfollow}
            />
            <BlockUserModal
                username={chatParticipant?.username!}
                isUserBlocked={chatParticipant?.isUserBlocked!}
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
