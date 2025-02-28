import React, { ReactElement } from "react";
import { Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useChatUserBlockedStyles } from "./ChatUserBlockedStyles";
import { DIRECT_MESSAGES } from "../../../../constants/url-constants";

const ChatUserBlocked = (): ReactElement => {
    const classes = useChatUserBlockedStyles();
    const { t } = useTranslation();

    return (
        <Typography variant={"subtitle2"} component={"div"} className={classes.blockedInfoText}>
            {t("CAN_NO_LONGER_SEND_MESSAGES", { defaultValue: "You can no longer send messages to this person." })}
            {" "}
            <MuiLink href={DIRECT_MESSAGES} variant="subtitle2" target="_blank" rel="noopener">
                {t("LEARN_MORE", { defaultValue: "Learn more" })}
            </MuiLink>
        </Typography>
    );
};

export default ChatUserBlocked;
