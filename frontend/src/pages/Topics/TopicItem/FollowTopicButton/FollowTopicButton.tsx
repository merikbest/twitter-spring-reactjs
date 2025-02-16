import React, { FC, ReactElement } from "react";
import Button from "@material-ui/core/Button/Button";
import { useTranslation } from "react-i18next";

import { useFollowTopicButtonStyles } from "./FollowTopicButtonStyles";

interface FollowTopicButtonProps {
    onClickButton: () => void;
}

const FollowTopicButton: FC<FollowTopicButtonProps> = ({ onClickButton }): ReactElement => {
    const classes = useFollowTopicButtonStyles();
    const { t } = useTranslation();

    return (
        <Button
            className={classes.outlinedButton}
            onClick={onClickButton}
            color="primary"
            variant="outlined"
            size="small"
        >
            {t("FOLLOW", { defaultValue: "Follow" })}
        </Button>
    );
};

export default FollowTopicButton;
