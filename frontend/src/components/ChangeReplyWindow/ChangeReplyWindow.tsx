import React, { FC, memo, ReactElement } from "react";
import { List, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useChangeReplyWindowStyles } from "./ChangeReplyWindowStyles";
import { EveryoneReplyOutlinedIcon, FollowReplyOutlinedIcon, MentionReplyOutlinedIcon } from "../../icons";
import { ReplyType } from "../../types/common";
import ChangeReplyWindowComponent from "./ChangeReplyWindowComponent/ChangeReplyWindowComponent";

interface ChangeReplyWindowProps {
    replyType: ReplyType;
    onChangeTweetReplyType: (replyType: ReplyType) => void;
}

const ChangeReplyWindow: FC<ChangeReplyWindowProps> = memo(({ replyType, onChangeTweetReplyType }): ReactElement => {
    const classes = useChangeReplyWindowStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.dropdown}>
            <div className={classes.infoWrapper}>
                <Typography variant="h6" component="div">
                    {t("WHO_CAN_REPLY", { defaultValue: "Who can reply?" })}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {t("WHO_CAN_REPLY_DESCRIPTION", {
                        defaultValue: "Choose who can reply to this Tweet. Anyone mentioned can always reply."
                    })}
                </Typography>
            </div>
            <List component="nav">
                <ChangeReplyWindowComponent
                    replyType={replyType}
                    replyTypeIcon={EveryoneReplyOutlinedIcon}
                    replyTypeTitle={t("EVERYONE", { defaultValue: "Everyone" })}
                    currentReplyType={ReplyType.EVERYONE}
                    onChangeTweetReplyType={onChangeTweetReplyType}
                />
                <ChangeReplyWindowComponent
                    replyType={replyType}
                    replyTypeIcon={FollowReplyOutlinedIcon}
                    replyTypeTitle={t("PEOPLE_YOU_FOLLOW", { defaultValue: "People you follow" })}
                    currentReplyType={ReplyType.FOLLOW}
                    onChangeTweetReplyType={onChangeTweetReplyType}
                />
                <ChangeReplyWindowComponent
                    id="lastItem"
                    replyType={replyType}
                    replyTypeIcon={MentionReplyOutlinedIcon}
                    replyTypeTitle={t("ONLY_PEOPLE_YOU_MENTION", { defaultValue: "Only people you mention" })}
                    currentReplyType={ReplyType.MENTION}
                    onChangeTweetReplyType={onChangeTweetReplyType}
                />
            </List>
        </div>
    );
});

export default ChangeReplyWindow;
