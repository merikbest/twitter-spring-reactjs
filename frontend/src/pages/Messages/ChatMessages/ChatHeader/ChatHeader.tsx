import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import { Avatar, Paper, Typography } from "@material-ui/core";

import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import { MESSAGES } from "../../../../constants/path-constants";
import { DetailsIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { useChatHeaderStyles } from "./ChatHeaderStyles";
import ActionIcon from "../../ActionIcon/ActionIcon";
import { selectUserProfile } from "../../../../store/ducks/userProfile/selectors";

const ChatHeader = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useChatHeaderStyles();
    const chatParticipant = useSelector(selectUserProfile);

    return (
        <Paper className={classnames(globalClasses.pageHeader, classes.chatHeader)}>
            <Avatar className={classes.chatAvatar} src={chatParticipant?.avatar ?? DEFAULT_PROFILE_IMG} />
            <div style={{ flex: 1 }}>
                <Typography variant="h5">
                    {chatParticipant?.fullName}
                </Typography>
                <Typography variant="subtitle2" component={"div"}>
                    @{chatParticipant?.username}
                </Typography>
            </div>
            <div className={classes.iconGroup}>
                <ActionIcon
                    path={`${MESSAGES}/${chatParticipant?.id}/info`}
                    actionText={"Details"}
                    className={"icon"}
                    icon={DetailsIcon}
                />
            </div>
        </Paper>
    );
});

export default ChatHeader;
