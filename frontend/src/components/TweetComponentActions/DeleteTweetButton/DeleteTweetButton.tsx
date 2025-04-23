import React, { FC, memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { DeleteIcon } from "../../../icons";
import TweetComponentActionsModal from "../TweetComponentActionsModal/TweetComponentActionsModal";
import { deleteTweetReply } from "../../../store/ducks/tweet/actionCreators";
import { fetchDeleteTweet } from "../../../store/ducks/tweets/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import { useModalWindow } from "../../../hook/useModalWindow";
import { selectTweetInfoAddressedTweetId } from "../../../store/ducks/tweetAdditionalInfo/selectors";

interface DeleteTweetButtonProps {
    tweetId: number;
    onCloseActionsDropdown: () => void;
}

const DeleteTweetButton: FC<DeleteTweetButtonProps> = memo(({ tweetId, onCloseActionsDropdown }): ReactElement => {
    const dispatch = useDispatch();
    const addressedTweetId = useSelector(selectTweetInfoAddressedTweetId);
    const { t } = useTranslation();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const onDeleteUserTweet = (): void => {
        if (addressedTweetId) {
            dispatch(deleteTweetReply(tweetId));
        } else {
            dispatch(fetchDeleteTweet(tweetId));
        }
        dispatch(setOpenSnackBar(t("YOUR_TWEET_WAS_DELETED", { defaultValue: "Your Tweet was deleted" })));
        onCloseModalWindow();
        onCloseActionsDropdown();
    };

    return (
        <>
            <ListItem id="delete" onClick={onOpenModalWindow}>
                <>{DeleteIcon}</>
                <Typography variant="body1" component="span">
                    {t("DELETE", { defaultValue: "Delete" })}
                </Typography>
            </ListItem>
            <TweetComponentActionsModal
                visibleTweetComponentActionsModal={visibleModalWindow}
                onCloseTweetComponentActionsModal={onCloseModalWindow}
                onClick={onDeleteUserTweet}
                isDeleteModal
            />
        </>
    );
});

export default DeleteTweetButton;
