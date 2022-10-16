import React, {FC, ReactElement} from "react";
import classnames from "classnames";
import {Avatar, IconButton, Paper, Typography} from "@material-ui/core";
import {DEFAULT_PROFILE_IMG} from "../../../../util/url";
import {Link} from "react-router-dom";
import {MESSAGES} from "../../../../util/pathConstants";
import {MessagesAction, VisibleActions} from "../../Messages";
import {DetailsIcon} from "../../../../icons";
import HoverAction from "../../../../components/HoverAction/HoverAction";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {useChatHeaderStyles} from "./ChatHeaderStyles";
import {ParticipantResponse} from "../../../../store/types/chat";

interface ChatHeaderProps {
    participant: ParticipantResponse;
    handleHoverAction: (action: MessagesAction) => void;
    handleLeaveAction: () => void;
    visibleHoverAction: VisibleActions;
}

const ChatHeader: FC<ChatHeaderProps> = (
    {
        participant,
        handleHoverAction,
        handleLeaveAction,
        visibleHoverAction
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useChatHeaderStyles();

    return (
        <Paper className={classnames(globalClasses.pageHeader, classes.chatHeader)}>
            <Avatar
                className={classes.chatAvatar}
                src={participant.user.avatar?.src ? participant.user.avatar.src : DEFAULT_PROFILE_IMG}
            />
            <div style={{flex: 1}}>
                <Typography variant="h5">
                    {participant.user.fullName}
                </Typography>
                <Typography variant="subtitle2" component={"div"}>
                    @{participant.user.username}
                </Typography>
            </div>
            <div className={classes.iconGroup}>
                <div className={classes.icon}>
                    <Link to={`${MESSAGES}/${participant.user.id}/info`}>
                        <IconButton
                            onMouseEnter={() => handleHoverAction(MessagesAction.DETAILS)}
                            onMouseLeave={handleLeaveAction}
                            color="primary"
                        >
                            <>{DetailsIcon}</>
                            <HoverAction
                                visible={visibleHoverAction.visibleDetailsAction}
                                actionText={"Details"}
                            />
                        </IconButton>
                    </Link>
                </div>
            </div>
        </Paper>
    );
};

export default ChatHeader;
