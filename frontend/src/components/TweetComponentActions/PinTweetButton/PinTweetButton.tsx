import React, { FC, memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const isTweetPinned = pinnedTweetId === tweetId;

    const onPinUserTweet = (): void => {
        dispatch(fetchPinTweet(tweetId));
        if (isTweetPinned) {
            dispatch(setOpenSnackBar(t("YOUR_TWEET_WAS_UNPINNED", {
                defaultValue: "Your Tweet was unpinned from your profile."
            })));
        } else {
            dispatch(setOpenSnackBar(t("YOUR_TWEET_WAS_PINNED", {
                defaultValue: "Your Tweet was pinned to your profile."
            })));
        }
        onCloseModalWindow();
        onCloseActionsDropdown();
    };

    return (
        <>
            <ListItem id="pin" onClick={onOpenModalWindow}>
                <>{PinIcon}</>
                <Typography variant="body1" component="span">
                    {isTweetPinned
                        ? t("UNPIN_FROM_PROFILE", { defaultValue: "Unpin from profile" })
                        : t("PIN_TO_YOUR_PROFILE", { defaultValue: "Pin to your profile" })}
                </Typography>
            </ListItem>
            <TweetComponentActionsModal
                isTweetPinned={isTweetPinned}
                visibleTweetComponentActionsModal={visibleModalWindow}
                onCloseTweetComponentActionsModal={onCloseModalWindow}
                onClick={onPinUserTweet}
            />
        </>
    );
});

export default PinTweetButton;
