import React, { memo, ReactElement } from "react";

import { ReplyIcon } from "../../../icons";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useReplyIconButtonStyles } from "./ReplyIconButtonStyles";

const ReplyIconButton = memo((): ReactElement => {
    const classes = useReplyIconButtonStyles();

    return (
        <div className={classes.infoIcon}>
            <ActionIconButton actionText={"Reply"} icon={ReplyIcon} />
        </div>
    );
});

export default ReplyIconButton;
