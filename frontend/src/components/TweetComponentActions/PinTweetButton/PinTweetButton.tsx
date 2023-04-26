import React, { FC, memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";

import TweetComponentActionsModal from "../TweetComponentActionsModal/TweetComponentActionsModal";
import { selectUserPinnedTweetId } from "../../../store/ducks/user/selectors";
import { fetchPinTweet } from "../../../store/ducks/user/actionCreators";
import { PinIcon } from "../../../icons";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import { useModalWindow } from "../../../hook/useModalWindow";

interface PinTweetButtonProps {
    tweetId: number;
    onCloseActionsDropdown: () => void;
}

const PinTweetButton: FC<PinTweetButtonProps> = memo(({ tweetId, onCloseActionsDropdown }): ReactElement => {
    const dispatch = useDispatch();
    const pinnedTweetId = useSelector(selectUserPinnedTweetId);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const isTweetPinned = pinnedTweetId === tweetId;

    const onPinUserTweet = (): void => {
        dispatch(fetchPinTweet(tweetId));
        if (isTweetPinned) {
            dispatch(setOpenSnackBar("Your Tweet was unpinned from your profile."));
        } else {
            dispatch(setOpenSnackBar("Your Tweet was pinned to your profile."));
        }
        onCloseModalWindow();
        onCloseActionsDropdown();
    };

    return (
        <>
            <ListItem id={"pin"} onClick={onOpenModalWindow}>
                <>{PinIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    {(isTweetPinned) ? (
                        "Unpin from profile"
                    ) : (
                        "Pin to your profile"
                    )}
                </Typography>
            </ListItem>
            <TweetComponentActionsModal
                modalTitle={"Pin"}
                isTweetPinned={isTweetPinned}
                visibleTweetComponentActionsModal={visibleModalWindow}
                onCloseTweetComponentActionsModal={onCloseModalWindow}
                onClick={onPinUserTweet}
            />
        </>
    );
});

export default PinTweetButton;
