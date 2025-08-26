import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { processUserToBlocklist } from "../../../store/ducks/user/actionCreators";
import { fetchChatParticipant, resetUserProfileState } from "../../../store/ducks/userProfile/actionCreators";
import { selectUserProfile, selectUsersIsLoading } from "../../../store/ducks/userProfile/selectors";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";

export const useConversationInfo = (participantId?: number, chatId?: number) => {
    const dispatch = useDispatch();
    const chatParticipant = useSelector(selectUserProfile);
    const isChatParticipantLoading = useSelector(selectUsersIsLoading);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);

    useEffect(() => {
        if (participantId && chatId) {
            dispatch(fetchChatParticipant({ participantId, chatId }));
        }

        return () => {
            dispatch(resetUserProfileState());
        };
    }, [dispatch, participantId, chatId]);

    const onBlockUser = useCallback((): void => {
        dispatch(processUserToBlocklist({ userId: chatParticipant?.id! }));
        setVisibleBlockUserModal(false);
        dispatch(setOpenSnackBar(`@${chatParticipant?.username!} has been ${chatParticipant?.isUserBlocked ? "unblocked" : "blocked"}.`));
    }, [dispatch, chatParticipant]);

    const onOpenBlockUserModal = useCallback((): void => {
        setVisibleBlockUserModal(true);
    }, []);

    const onCloseBlockUserModal = useCallback((): void => {
        setVisibleBlockUserModal(false);
    }, []);

    return {
        chatParticipant,
        isChatParticipantLoading,
        visibleBlockUserModal,
        onBlockUser,
        onOpenBlockUserModal,
        onCloseBlockUserModal,
    };
};
