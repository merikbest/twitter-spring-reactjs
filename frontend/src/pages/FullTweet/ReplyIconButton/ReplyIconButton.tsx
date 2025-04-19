import React, { memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { ReplyIcon } from "../../../icons";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useReplyIconButtonStyles } from "./ReplyIconButtonStyles";

const ReplyIconButton = memo((): ReactElement => {
    const classes = useReplyIconButtonStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.infoIcon}>
            <ActionIconButton actionText={t("REPLY", { defaultValue: "Reply" })} icon={ReplyIcon} />
        </div>
    );
});

export default ReplyIconButton;
