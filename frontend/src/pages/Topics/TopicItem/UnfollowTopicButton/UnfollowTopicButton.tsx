import React, { FC, ReactElement, useState } from "react";
import Button from "@material-ui/core/Button/Button";
import { useTranslation } from "react-i18next";

import { useUnfollowTopicButtonStyles } from "./UnfollowTopicButtonStyles";
import UnfollowModal from "../../../../components/UnfollowModal/UnfollowModal";
import { useModalWindow } from "../../../../hook/useModalWindow";

interface UnfollowTopicButtonProps {
    topicName: string;
    onClickFollowTopic: () => void;
}

const UnfollowTopicButton: FC<UnfollowTopicButtonProps> = ({ topicName, onClickFollowTopic }): ReactElement => {
    const classes = useUnfollowTopicButtonStyles();
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState<string>(t("FOLLOWING", { defaultValue: "Following" }));
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const handleClickOpenUnfollowModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        onOpenModalWindow();
    };

    return (
        <>
            <Button
                className={classes.containedButton}
                onClick={handleClickOpenUnfollowModal}
                onMouseOver={() => setBtnText(t("UNFOLLOW", { defaultValue: "Unfollow" }))}
                onMouseLeave={() => setBtnText(t("FOLLOWING", { defaultValue: "Following" }))}
                color="primary"
                variant="contained"
                size="small"
            >
                {btnText}
            </Button>
            <UnfollowModal
                fullName={topicName}
                unfollowTopic
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
                handleUnfollow={onClickFollowTopic}
            />
        </>
    );
};

export default UnfollowTopicButton;
