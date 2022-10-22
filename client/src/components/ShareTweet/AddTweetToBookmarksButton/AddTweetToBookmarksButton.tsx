import React, {FC, ReactElement} from "react";
import {useDispatch} from "react-redux";
import {ListItem, Typography} from "@material-ui/core";

import {AddBookmarksIcon} from "../../../icons";
import {addTweetToBookmarks} from "../../../store/ducks/tweet/actionCreators";
import {BOOKMARKS} from "../../../util/pathConstants";
import {removeTweetFromBookmarks} from "../../../store/ducks/tweets/actionCreators";
import {useSnackbar} from "../../../hook/useSnackbar";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";
import {useLocation} from "react-router-dom";

interface AddTweetToBookmarksButtonProps {
    tweetId: number;
    isTweetBookmarked: boolean;
    closeShareTweet: () => void;
}

const AddTweetToBookmarksButton: FC<AddTweetToBookmarksButtonProps> = (
    {
        tweetId,
        isTweetBookmarked,
        closeShareTweet
    }
): ReactElement => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {snackBarMessage, openSnackBar, setSnackBarMessage, setOpenSnackBar, onCloseSnackBar} = useSnackbar();

    const onClickAddTweetToBookmarks = (): void => {
        dispatch(addTweetToBookmarks(tweetId));

        if (location.pathname.includes(BOOKMARKS)) {
            dispatch(removeTweetFromBookmarks(tweetId));
        }
        setOpenSnackBar(true);
        setSnackBarMessage(isTweetBookmarked ? "Tweet removed to your Bookmarks" : "Tweet added to your Bookmarks");
        closeShareTweet();
    };

    return (
        <>
            <ListItem id={"clickAddTweetToBookmarks"} onClick={onClickAddTweetToBookmarks}>
                <>{AddBookmarksIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    {isTweetBookmarked ? "Remove Tweet from Bookmarks" : "Add Tweet to Bookmarks"}
                </Typography>
            </ListItem>
            <ActionSnackbar
                snackBarMessage={snackBarMessage}
                openSnackBar={openSnackBar}
                onCloseSnackBar={onCloseSnackBar}
            />
        </>
    );
};

export default AddTweetToBookmarksButton;
