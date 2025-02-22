import React, { FC, memo, ReactElement } from "react";
import classnames from "classnames";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useConversationInfoStyles } from "../ConversationInfoStyles";

interface ReportUserComponentProps {
    username?: string;
}

const ReportUserComponent: FC<ReportUserComponentProps> = memo(({ username }): ReactElement => {
    const { t } = useTranslation();
    const classes = useConversationInfoStyles();

    return (
        <div className={classnames(classes.conversationInfoButton, classes.blockUser)}>
            <Typography variant={"body1"} component={"span"}>
                {t("REPORT", { defaultValue: "Report" })}
                {` @${username}`}
            </Typography>
        </div>
    );
});

export default ReportUserComponent;
