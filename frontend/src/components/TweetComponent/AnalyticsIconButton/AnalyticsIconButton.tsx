import React, { FC, memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { AnalyticsIcon } from "../../../icons";
import TweetAnalyticsModal from "../../TweetAnalyticsModal/TweetAnalyticsModal";
import { useAnalyticsIconButtonStyles } from "./AnalyticsIconButtonStyles";
import { useModalWindow } from "../../../hook/useModalWindow";

interface AnalyticsIconButtonProps {
    tweetUserFullName?: string;
    tweetUserName?: string;
    tweetText?: string;
    isUserCanReply: boolean;
}

const AnalyticsIconButton: FC<AnalyticsIconButtonProps> = memo((
    {
        tweetUserFullName,
        tweetUserName,
        tweetText,
        isUserCanReply
    }
): ReactElement => {
    const classes = useAnalyticsIconButtonStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();

    return (
        <div id="analytics" className={classes.replyIcon}>
            <ActionIconButton
                actionText={t("ANALYTICS", { defaultValue: "Analytics" })}
                icon={AnalyticsIcon}
                onClick={onOpenModalWindow}
                disabled={isUserCanReply}
            />
            <TweetAnalyticsModal
                fullName={tweetUserFullName!}
                username={tweetUserName!}
                text={tweetText!}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </div>
    );
});

export default AnalyticsIconButton;
