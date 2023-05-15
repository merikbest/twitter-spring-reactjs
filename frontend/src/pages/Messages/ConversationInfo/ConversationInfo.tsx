import React, { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Paper } from "@material-ui/core";
import classnames from "classnames";

import { useConversationInfoStyles } from "./ConversationInfoStyles";
import { processUserToBlocklist } from "../../../store/ducks/user/actionCreators";
import BlockUserModal from "../../../components/BlockUserModal/BlockUserModal";
import { fetchChatParticipant, resetUserProfileState } from "../../../store/ducks/userProfile/actionCreators";
import { useGlobalStyles } from "../../../util/globalClasses";
import { selectUserProfile, selectUsersIsLoading } from "../../../store/ducks/userProfile/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import { PROFILE } from "../../../constants/path-constants";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import ConversationHeader from "./ConversationHeader/ConversationHeader";
import SnoozeNotifications from "./SnoozeNotifications/SnoozeNotifications";
import BlockUserComponent from "./BlockUserComponent/BlockUserComponent";
import ReportUserComponent from "./ReportUserComponent/ReportUserComponent";
import LeaveConversationComponent from "./LeaveConversationComponent/LeaveConversationComponent";
import FollowButton from "../../../components/Buttons/FollowButton/FollowButton";
import PendingButton from "../../../components/Buttons/PendingButton/PendingButton";
import UnfollowButton from "../../../components/Buttons/UnfollowButton/UnfollowButton";
import BlockButton from "./BlockButton/BlockButton";
import ConversationUserAvatar from "./ConversationUserAvatar/ConversationUserAvatar";
import ConversationUserInfo from "./ConversationUserInfo/ConversationUserInfo";
import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";

interface ConversationInfoProps {
    participantId?: number;
    chatId?: number;
}

const ConversationInfo: FC<ConversationInfoProps> = ({ participantId, chatId }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useConversationInfoStyles();
    const dispatch = useDispatch();
    const chatParticipant = useSelector(selectUserProfile);
    const isChatParticipantLoading = useSelector(selectUsersIsLoading);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchChatParticipant({ participantId: participantId!, chatId: chatId! }));

        return () => {
            dispatch(resetUserProfileState());
        };
    }, []);

    const onBlockUser = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(processUserToBlocklist({ userId: chatParticipant?.id! }));
        setVisibleBlockUserModal(false);
        dispatch(setOpenSnackBar(`@${chatParticipant?.username!} has been ${chatParticipant?.isUserBlocked ? "unblocked" : "blocked"}.`));
    }, [chatParticipant?.id]);

    const onOpenBlockUserModal = useCallback((): void => {
        setVisibleBlockUserModal(true);
    }, []);

    const onCloseBlockUserModal = useCallback((): void => {
        setVisibleBlockUserModal(false);
    }, []);

    return (
        <div>
            <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant="outlined">
                <ConversationHeader />
                {isChatParticipantLoading ? (
                    <Spinner paddingTop={200} />
                ) : (
                    <>
                        <Link to={`${PROFILE}/${chatParticipant?.id}`} className={globalClasses.link}>
                            <div className={classes.pageInfoWrapper}>
                                <ConversationUserAvatar avatar={chatParticipant?.avatar ?? DEFAULT_PROFILE_IMG} />
                                <div style={{ flex: 1 }}>
                                    <div className={classes.participantInfoWrapper}>
                                        <ConversationUserInfo
                                            username={chatParticipant?.username}
                                            fullName={chatParticipant?.fullName}
                                            isPrivateProfile={chatParticipant?.isPrivateProfile}
                                        />
                                        <div className={classes.buttonWrapper}>
                                            {(!chatParticipant?.isFollower) ? (
                                                (chatParticipant?.isUserBlocked) ? (
                                                    <BlockButton onBlockUser={onBlockUser} />
                                                ) : (
                                                    (chatParticipant?.isWaitingForApprove) ? (
                                                        <PendingButton userId={chatParticipant?.id!} />
                                                    ) : (
                                                        <FollowButton
                                                            isPrivateProfile={chatParticipant?.isPrivateProfile!}
                                                            userId={chatParticipant?.id!}
                                                        />
                                                    )
                                                )
                                            ) : (
                                                <UnfollowButton
                                                    userId={chatParticipant?.id!}
                                                    isPrivateProfile={chatParticipant?.isPrivateProfile!}
                                                    fullName={chatParticipant?.fullName!}
                                                    isOpenUnfollowModal
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Divider />
                        <SnoozeNotifications fullName={chatParticipant?.fullName} />
                        <Divider />
                        <BlockUserComponent
                            onOpenBlockUserModal={onOpenBlockUserModal}
                            isUserBlocked={chatParticipant?.isUserBlocked}
                            username={chatParticipant?.username}
                        />
                        <ReportUserComponent username={chatParticipant?.username} />
                        <LeaveConversationComponent participantId={participantId} chatId={participantId} />
                    </>
                )}
            </Paper>
            <BlockUserModal
                username={chatParticipant?.username!}
                isUserBlocked={chatParticipant?.isUserBlocked!}
                visible={visibleBlockUserModal}
                onClose={onCloseBlockUserModal}
                onBlockUser={onBlockUser}
            />
        </div>
    );
};

export default ConversationInfo;
