import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AddBookmarksIcon } from "../../../icons";
import { addTweetToBookmarks } from "../../../store/ducks/tweet/actionCreators";
import { BOOKMARKS } from "../../../constants/path-constants";
import { removeTweetFromBookmarks } from "../../../store/ducks/tweets/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import { selectIsTweetBookmarkedAdditionalInfo } from "../../../store/ducks/tweetAdditionalInfo/selectors";

interface AddTweetToBookmarksButtonProps {
    tweetId: number;
    closeShareTweet: () => void;
}

const AddTweetToBookmarksButton: FC<AddTweetToBookmarksButtonProps> = ({ tweetId, closeShareTweet }): ReactElement => {
    const dispatch = useDispatch();
    const isTweetBookmarked = useSelector(selectIsTweetBookmarkedAdditionalInfo);
    const location = useLocation();
    const { t } = useTranslation();

    const onClickAddTweetToBookmarks = (): void => {
        if (location.pathname.includes(BOOKMARKS)) {
            dispatch(removeTweetFromBookmarks(tweetId));
        } else {
            dispatch(addTweetToBookmarks(tweetId));
        }
        dispatch(setOpenSnackBar(isTweetBookmarked
            ? t("TWEET_REMOVED_TO_YOUR_BOOKMARKS", { defaultValue: "Tweet removed to your Bookmarks" })
            : t("TWEET_ADDED_TO_YOUR_BOOKMARKS", { defaultValue: "Tweet added to your Bookmarks" })));
        closeShareTweet();
    };

    return (
        <ListItem id="clickAddTweetToBookmarks" onClick={onClickAddTweetToBookmarks}>
            <>{AddBookmarksIcon}</>
            <Typography variant="body1" component="span">
                {isTweetBookmarked
                    ? t("REMOVE_TWEET_FROM_BOOKMARKS", { defaultValue: "Remove Tweet from Bookmarks" })
                    : t("ADD_TWEET_TO_BOOKMARKS", { defaultValue: "Add Tweet to Bookmarks" })}
            </Typography>
        </ListItem>
    );
};

export default AddTweetToBookmarksButton;
