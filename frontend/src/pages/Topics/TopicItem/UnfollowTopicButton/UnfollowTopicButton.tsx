import React, { FC, ReactElement } from "react";
import Button from "@material-ui/core/Button/Button";

import { useUnfollowTopicButtonStyles } from "./UnfollowTopicButtonStyles";
import UnfollowModal from "../../../../components/UnfollowModal/UnfollowModal";
import { useUnfollowTopicButton } from "./useUnfollowTopicButton";
import { useModalWindow } from "../../../../hook/useModalWindow";

interface UnfollowTopicButtonProps {
    topicName: string;
    onClickFollowTopic: () => void;
}

const UnfollowTopicButton: FC<UnfollowTopicButtonProps> = ({ topicName, onClickFollowTopic }): ReactElement => {
    const classes = useUnfollowTopicButtonStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const {
        btnText,
        handleMouseOver,
        handleMouseLeave,
        handleClickOpenUnfollowModal,
    } = useUnfollowTopicButton(onClickFollowTopic, onOpenModalWindow);

    return (
        <>
            <Button
                className={classes.containedButton}
                onClick={handleClickOpenUnfollowModal}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
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
