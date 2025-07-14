import React, { memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { useRetweetIconButtonStyles } from "./RetweetIconButtonStyles";
import { RetweetIcon, RetweetOutlinedIcon } from "../../../icons";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useRetweetIconButton } from "./useRetweetIconButton";

const RetweetIconButton = memo((): ReactElement => {
    const { isTweetRetweeted, handleRetweet } = useRetweetIconButton();
    const classes = useRetweetIconButtonStyles({ isTweetRetweeted });
    const { t } = useTranslation();

    return (
        <div className={classes.retweetIcon}>
            <ActionIconButton
                actionText={isTweetRetweeted
                    ? t("UNDO_RETWEET", { defaultValue: "Undo Retweet" })
                    : t("RETWEET", { defaultValue: "Retweet" })}
                onClick={handleRetweet}
                icon={isTweetRetweeted ? RetweetIcon : RetweetOutlinedIcon}
            />
        </div>
    );
});

export default RetweetIconButton;
