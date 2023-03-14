import React, { FC, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";

import { AddBookmarksIcon } from "../../../icons";
import { addTweetToBookmarks } from "../../../store/ducks/tweet/actionCreators";
import { BOOKMARKS } from "../../../constants/path-constants";
import { removeTweetFromBookmarks } from "../../../store/ducks/tweets/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";

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

    const onClickAddTweetToBookmarks = (): void => {
        if (location.pathname.includes(BOOKMARKS)) {
            dispatch(removeTweetFromBookmarks(tweetId));
        } else {
            dispatch(addTweetToBookmarks(tweetId));
        }
        dispatch(setOpenSnackBar(isTweetBookmarked ? "Tweet removed to your Bookmarks" : "Tweet added to your Bookmarks"));
        closeShareTweet();
    };

    return (
        <ListItem id={"clickAddTweetToBookmarks"} onClick={onClickAddTweetToBookmarks}>
            <>{AddBookmarksIcon}</>
            <Typography variant={"body1"} component={"span"}>
                {isTweetBookmarked ? "Remove Tweet from Bookmarks" : "Add Tweet to Bookmarks"}
            </Typography>
        </ListItem>
    );
};

export default AddTweetToBookmarksButton;
