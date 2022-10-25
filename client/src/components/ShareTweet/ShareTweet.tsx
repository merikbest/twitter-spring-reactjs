import React, {FC, memo, ReactElement, useEffect, useState} from 'react';
import {ClickAwayListener, List, ListItem, Typography} from "@material-ui/core";
import classnames from "classnames";
import {useDispatch, useSelector} from "react-redux";

import {useShareTweetModalStyles} from "./ShareTweetStyles";
import {ShareIcon} from "../../icons";
import {useGlobalStyles} from "../../util/globalClasses";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import SendViaDirectMessageButton from "./SendViaDirectMessageButton/SendViaDirectMessageButton";
import AddTweetToBookmarksButton from "./AddTweetToBookmarksButton/AddTweetToBookmarksButton";
import CopyLinkToTweetButton from "./CopyLinkToTweetButton/CopyLinkToTweetButton";
import {
    fetchIsTweetBookmarkedAdditionalInfo,
    resetTweetAdditionalInfo
} from "../../store/ducks/tweetAdditionalInfo/actionCreators";
import {
    selectIsTweetAdditionalInfoLoading,
    selectIsTweetBookmarkedAdditionalInfo,
} from "../../store/ducks/tweetAdditionalInfo/selectors";
import Spinner from "../Spinner/Spinner";
import SendDirectTweetModal from "./SendDirectTweetModal/SendDirectTweetModal";

interface ShareTweetProps {
    tweetId: number;
    isFullTweet: boolean;
}

const ShareTweet: FC<ShareTweetProps> = memo(({tweetId, isFullTweet}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useShareTweetModalStyles({isFullTweet});
    const dispatch = useDispatch();
    const isTweetAdditionalInfoLoading = useSelector(selectIsTweetAdditionalInfoLoading);
    const isTweetBookmarked = useSelector(selectIsTweetBookmarkedAdditionalInfo);
    const [shareTweetOpen, setShareTweetOpen] = useState<boolean>(false);
    const [visibleSendDirectTweetModal, setVisibleSendDirectTweetModal] = useState<boolean>(false);

    useEffect(() => {
        if (shareTweetOpen) {
            dispatch(fetchIsTweetBookmarkedAdditionalInfo(tweetId));
        }
        return () => {
            dispatch(resetTweetAdditionalInfo())
        };
    }, [tweetId, shareTweetOpen]);

    const handleClick = (): void => {
        setShareTweetOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setShareTweetOpen(false);
    };

    const onClickSendViaDirectMessage = (): void => {
        setVisibleSendDirectTweetModal(true);
    };

    const onCloseSendViaDirectMessage = (): void => {
        setVisibleSendDirectTweetModal(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
                <ActionIconButton
                    actionText={"Share"}
                    onClick={handleClick}
                    size={isFullTweet ? "medium" : "small"}
                    icon={ShareIcon}
                />
                {shareTweetOpen && (
                    <div className={classnames(classes.dropdown, globalClasses.svg)}>
                        {isTweetAdditionalInfoLoading ? (
                            <Spinner paddingTop={90}/>
                        ) : (
                            <List>
                                <SendViaDirectMessageButton onClickSendViaDirectMessage={onClickSendViaDirectMessage}/>
                                <AddTweetToBookmarksButton
                                    tweetId={tweetId}
                                    isTweetBookmarked={isTweetBookmarked}
                                    closeShareTweet={handleClickAway}
                                />
                                <CopyLinkToTweetButton closeShareTweet={handleClickAway}/>
                                <ListItem>
                                    <>{ShareIcon}</>
                                    <Typography variant={"body1"} component={"span"}>
                                        Share Tweet via ...
                                    </Typography>
                                </ListItem>
                            </List>
                        )}
                    </div>
                )}
                <SendDirectTweetModal
                    tweetId={tweetId}
                    visible={visibleSendDirectTweetModal}
                    onClose={onCloseSendViaDirectMessage}
                />
            </div>
        </ClickAwayListener>
    );
});

export default ShareTweet;
