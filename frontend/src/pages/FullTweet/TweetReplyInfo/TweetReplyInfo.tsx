import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";

import { ReplyType } from "../../../types/common";
import { FollowReplyIcon, MentionReplyIcon } from "../../../icons";
import {
    selectTweetReplyType,
    selectTweetAuthorUsername
} from "../../../store/ducks/tweet/selectors";
import { useFullTweetStyles } from "../FullTweetStyles";

const TweetReplyInfo = (): ReactElement | null => {
    const classes = useFullTweetStyles();
    const replyType = useSelector(selectTweetReplyType);
    const userName = useSelector(selectTweetAuthorUsername);
    const { t } = useTranslation();

    if (replyType !== ReplyType.FOLLOW && replyType !== ReplyType.MENTION) {
        return null;
    }

    return (
        <Paper variant="outlined" className={classes.replyInfoWrapper}>
            <div className={classes.replyInfo}>
                <div className={classes.iconWrapper}>
                    <div className={classes.iconCircle}>
                        <span className={classes.icon}>
                            {(replyType === ReplyType.FOLLOW) && (FollowReplyIcon)}
                            {(replyType === ReplyType.MENTION) && (MentionReplyIcon)}
                        </span>
                    </div>
                </div>
                <div className={classes.replyTextInfoWrapper}>
                    <Typography variant="h6" component="div">
                        {t("WHO_CAN_REPLY", { defaultValue: "Who can reply?" })}
                    </Typography>
                    <Typography variant="body1" component="div">
                        {(replyType === ReplyType.FOLLOW)
                            ? t("FOLLOWS_OR_MENTIONED_CAN_REPLY", {
                                userName,
                                defaultValue: `People @${userName} follows or mentioned can reply`
                            })
                            : t("MENTIONED_CAN_REPLY", {
                                userName,
                                defaultValue: `People @${userName} mentioned can reply`
                            })
                        }
                    </Typography>
                </div>
            </div>
        </Paper>
    );
};

export default TweetReplyInfo;
