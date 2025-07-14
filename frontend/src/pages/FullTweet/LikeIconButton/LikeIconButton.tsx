import React, { memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { LikeIcon, LikeOutlinedIcon } from "../../../icons";
import { useLikeIconButtonStyles } from "./LikeIconButtonStyles";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useLikeIconButton } from "./useLikeIconButton";

const LikeIconButton = memo((): ReactElement => {
    const { isTweetLiked, handleLike } = useLikeIconButton();
    const classes = useLikeIconButtonStyles({ isTweetLiked });
    const { t } = useTranslation();

    return (
        <div className={classes.likeIcon}>
            <ActionIconButton
                actionText={isTweetLiked
                    ? t("UNLIKE", { defaultValue: "Unlike" })
                    : t("LIKE", { defaultValue: "Like" })}
                onClick={handleLike}
                icon={isTweetLiked ? LikeIcon : LikeOutlinedIcon}
            />
        </div>
    );
});

export default LikeIconButton;
