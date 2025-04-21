import React, { FC, memo, ReactElement, useEffect } from "react";
import { ClickAwayListener, List } from "@material-ui/core";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useShareTweetModalStyles } from "./ShareTweetStyles";
import { ShareIcon } from "../../icons";
import { useGlobalStyles } from "../../util/globalClasses";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import SendViaDirectMessageButton from "./SendViaDirectMessageButton/SendViaDirectMessageButton";
import AddTweetToBookmarksButton from "./AddTweetToBookmarksButton/AddTweetToBookmarksButton";
import CopyLinkToTweetButton from "./CopyLinkToTweetButton/CopyLinkToTweetButton";
import {
    fetchIsTweetBookmarkedAdditionalInfo,
    resetTweetAdditionalInfo
} from "../../store/ducks/tweetAdditionalInfo/actionCreators";
import { selectIsTweetAdditionalInfoLoading } from "../../store/ducks/tweetAdditionalInfo/selectors";
import Spinner from "../Spinner/Spinner";
import { useClickAway } from "../../hook/useClickAway";
import ShareTweet from "./ShareTweet/ShareTweet";

interface ShareTweetProps {
    tweetId: number;
    isFullTweet?: boolean;
}

const ShareTweetIconButton: FC<ShareTweetProps> = memo(({ tweetId, isFullTweet }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useShareTweetModalStyles({ isFullTweet });
    const dispatch = useDispatch();
    const isTweetAdditionalInfoLoading = useSelector(selectIsTweetAdditionalInfoLoading);
    const { open, onClickOpen, onClickClose } = useClickAway();
    const { t } = useTranslation();

    useEffect(() => {
        if (open) {
            dispatch(fetchIsTweetBookmarkedAdditionalInfo(tweetId));
        }
        return () => {
            dispatch(resetTweetAdditionalInfo());
        };
    }, [tweetId, open]);

    return (
        <ClickAwayListener onClickAway={onClickClose}>
            <div className={classes.root}>
                <ActionIconButton
                    actionText={t("SHARE", { defaultValue: "Share" })}
                    onClick={onClickOpen}
                    size={isFullTweet ? "medium" : "small"}
                    icon={ShareIcon}
                />
                {open && (
                    <div className={classnames(classes.dropdown, globalClasses.svg)}>
                        {isTweetAdditionalInfoLoading ? (
                            <Spinner paddingTop={90} />
                        ) : (
                            <List>
                                <SendViaDirectMessageButton tweetId={tweetId} />
                                <AddTweetToBookmarksButton tweetId={tweetId} closeShareTweet={onClickClose} />
                                <CopyLinkToTweetButton closeShareTweet={onClickClose} />
                                <ShareTweet />
                            </List>
                        )}
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
});

export default ShareTweetIconButton;
