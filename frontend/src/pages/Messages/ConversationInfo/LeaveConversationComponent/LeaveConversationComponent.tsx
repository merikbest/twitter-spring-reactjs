import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { Typography } from "@material-ui/core";

import { useConversationInfoStyles } from "../ConversationInfoStyles";
import { leaveFromConversation } from "../../../../store/ducks/chats/actionCreators";
import { MESSAGES } from "../../../../constants/path-constants";
import LeaveFromConversationModal from "../LeaveFromConversationModal/LeaveFromConversationModal";
import { useModalWindow } from "../../../../hook/useModalWindow";

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
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const handleLeaveFromConversation = (): void => {
        dispatch(leaveFromConversation({ participantId: participantId!, chatId: chatId! }));
        history.push({ pathname: MESSAGES, state: { removeParticipant: true } });
        onCloseModalWindow();
    };

    return (
        <>
            <div
                id={"leaveFromConversation"}
                className={classnames(classes.conversationInfoButton, classes.leaveConversation)}
                onClick={onOpenModalWindow}
            >
                <Typography variant={"body1"} component={"span"}>
                    Leave conversation
                </Typography>
            </div>
            <LeaveFromConversationModal
                handleLeaveFromConversation={handleLeaveFromConversation}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </>
    );
});

export default LeaveConversationComponent;
