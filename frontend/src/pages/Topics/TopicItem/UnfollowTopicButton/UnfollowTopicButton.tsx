import React, {FC, ReactElement, useState} from "react";
import Button from "@material-ui/core/Button/Button";

import {useUnfollowTopicButtonStyles} from "./UnfollowTopicButtonStyles";
import UnfollowModal from "../../../../components/UnfollowModal/UnfollowModal";

interface UnfollowTopicButtonProps {
    topicName: string;
    onClickFollowTopic: () => void;
}

const UnfollowTopicButton: FC<UnfollowTopicButtonProps> = ({topicName, onClickFollowTopic}): ReactElement => {
    const classes = useUnfollowTopicButtonStyles();
    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);
    const infoText = "Even if you unfollow this Topic, you could still see Tweets about it depending on which accounts you’re following.";

    const handleClickOpenUnfollowModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setVisibleUnfollowModal(true);
    };

    const onCloseUnfollowModal = (): void => {
        setVisibleUnfollowModal(false);
    };

    return (
        <>
            <Button
                className={classes.containedButton}
                onClick={handleClickOpenUnfollowModal}
                onMouseOver={() => setBtnText("Unfollow")}
                onMouseLeave={() => setBtnText("Following")}
                color="primary"
                variant="contained"
                size="small"
            >
                {btnText}
            </Button>
            <UnfollowModal
                fullName={topicName}
                infoText={infoText}
                visible={visibleUnfollowModal}
                onClose={onCloseUnfollowModal}
                handleUnfollow={onClickFollowTopic}
            />
        </>
    );
};

export default UnfollowTopicButton;
