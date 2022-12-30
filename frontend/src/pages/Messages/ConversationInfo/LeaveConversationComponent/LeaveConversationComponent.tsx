import React, {FC, memo, ReactElement, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import classnames from "classnames";
import {Typography} from "@material-ui/core";

import {useConversationInfoStyles} from "../ConversationInfoStyles";
import {leaveFromConversation} from "../../../../store/ducks/chats/actionCreators";
import {MESSAGES} from "../../../../util/pathConstants";
import LeaveFromConversationModal from "../LeaveFromConversationModal/LeaveFromConversationModal";

interface LeaveConversationComponentProps {
    participantId?: number;
    chatId?: number;
}

const LeaveConversationComponent: FC<LeaveConversationComponentProps> = memo((
    {
        participantId,
        chatId
    }
): ReactElement => {
    const classes = useConversationInfoStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [visibleLeaveFromConversationModal, setVisibleLeaveFromConversationModal] = useState<boolean>(false);

    const handleLeaveFromConversation = (): void => {
        dispatch(leaveFromConversation({participantId: participantId!, chatId: chatId!}));
        history.push({pathname: MESSAGES, state: {removeParticipant: true}});
        setVisibleLeaveFromConversationModal(false);
    };

    const handleClickOpenLeaveFromConversationModal = (): void => {
        setVisibleLeaveFromConversationModal(true);
    };

    const onCloseLeaveFromConversationModal = (): void => {
        setVisibleLeaveFromConversationModal(false);
    };

    return (
        <>
            <div
                id={"leaveFromConversation"}
                className={classnames(classes.conversationInfoButton, classes.leaveConversation)}
                onClick={handleClickOpenLeaveFromConversationModal}
            >
                <Typography variant={"body1"} component={"span"}>
                    Leave conversation
                </Typography>
            </div>
            <LeaveFromConversationModal
                handleLeaveFromConversation={handleLeaveFromConversation}
                visible={visibleLeaveFromConversationModal}
                onClose={onCloseLeaveFromConversationModal}
            />
        </>
    );
});

export default LeaveConversationComponent;
