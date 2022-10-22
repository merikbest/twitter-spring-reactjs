import React, {FC, memo, ReactElement, useState} from "react";
import {useDispatch} from "react-redux";
import {ListItem, Typography} from "@material-ui/core";

import {DeleteIcon} from "../../../icons";
import TweetComponentActionsModal from "../TweetComponentActionsModal/TweetComponentActionsModal";
import {deleteTweetReply} from "../../../store/ducks/tweet/actionCreators";
import {fetchDeleteTweet} from "../../../store/ducks/tweets/actionCreators";
import {useSnackbar} from "../../../hook/useSnackbar";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";

interface DeleteTweetButtonProps {
    tweetId: number;
    addressedTweetId: number;
    onCloseActionsDropdown: () => void;
}

const DeleteTweetButton: FC<DeleteTweetButtonProps> = memo((
    {
        tweetId,
        addressedTweetId,
        onCloseActionsDropdown
    }
): ReactElement => {
    const dispatch = useDispatch();
    const {snackBarMessage, openSnackBar, setSnackBarMessage, setOpenSnackBar, onCloseSnackBar} = useSnackbar();
    const [visibleDeleteTweetModal, setVisibleDeleteTweetModal] = useState<boolean>(false);

    const onDeleteUserTweet = (): void => {
        if (addressedTweetId !== null) {
            dispatch(deleteTweetReply(tweetId));
        } else {
            dispatch(fetchDeleteTweet(tweetId));
        }
        setSnackBarMessage("Your Tweet was deleted");
        setOpenSnackBar(true);
        setVisibleDeleteTweetModal(false);
        onCloseActionsDropdown();
    };

    const onOpenTweetComponentActionsModal = (): void => {
        setVisibleDeleteTweetModal(true);
    };

    const onCloseTweetComponentActionsModal = (): void => {
        setVisibleDeleteTweetModal(false);
    };

    return (
        <>
            <ListItem id={"delete"} onClick={onOpenTweetComponentActionsModal}>
                <>{DeleteIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    Delete
                </Typography>
            </ListItem>
            <TweetComponentActionsModal
                modalTitle={"Delete"}
                visibleTweetComponentActionsModal={visibleDeleteTweetModal}
                onCloseTweetComponentActionsModal={onCloseTweetComponentActionsModal}
                onClick={onDeleteUserTweet}
            />
            <ActionSnackbar
                snackBarMessage={snackBarMessage}
                openSnackBar={openSnackBar}
                onCloseSnackBar={onCloseSnackBar}
            />
        </>
    );
});

export default DeleteTweetButton;
