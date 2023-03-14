import React, { ReactElement } from "react";
import { Link as MuiLink, Typography } from "@material-ui/core";

import { useChatUserBlockedStyles } from "./ChatUserBlockedStyles";
import { DIRECT_MESSAGES } from "../../../../constants/url-constants";

const ChatUserBlocked = (): ReactElement => {
    const classes = useChatUserBlockedStyles();

    return (
        <Typography variant={"subtitle2"} component={"div"} className={classes.blockedInfoText}>
            You can no longer send messages to this person.
            {" "}
            <MuiLink href={DIRECT_MESSAGES} variant="subtitle2" target="_blank" rel="noopener">
                Learn more
            </MuiLink>
        </Typography>
    );
};

export default ChatUserBlocked;
