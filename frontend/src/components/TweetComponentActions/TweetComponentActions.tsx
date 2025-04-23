import React, { FC, memo, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClickAwayListener, List } from "@material-ui/core";
import classnames from "classnames";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useTweetComponentMoreStyles } from "./TweetComponentActionsStyles";
import { EditIcon } from "../../icons";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { useGlobalStyles } from "../../util/globalClasses";
import ChangeReplyWindow from "../ChangeReplyWindow/ChangeReplyWindow";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import TweetActivityButton from "./TweetActivityButton/TweetActivityButton";
import BlockUserButton from "./BlockUserButton/BlockUserButton";
import MuteUserButton from "./MuteUserButton/MuteUserButton";
import AddToListButton from "./AddToListButton/AddToListButton";
import PinTweetButton from "./PinTweetButton/PinTweetButton";
import DeleteTweetButton from "./DeleteTweetButton/DeleteTweetButton";
import FollowUserButton from "./FollowUserButton/FollowUserButton";
import ChangeReplyButton from "./ChangeReplyButton/ChangeReplyButton";
import {
    fetchTweetAdditionalInfo,
    resetTweetAdditionalInfo
} from "../../store/ducks/tweetAdditionalInfo/actionCreators";
import {
    selectIsTweetAdditionalInfoLoading,
    selectTweetInfoReplyType,
    selectTweetInfoUserId,
    selectTweetInfoUserIsMyProfileBlocked
} from "../../store/ducks/tweetAdditionalInfo/selectors";
import Spinner from "../Spinner/Spinner";
import { ReplyType } from "../../types/common";
import { changeReplyType } from "../../store/ducks/tweets/actionCreators";
import { setOpenSnackBar } from "../../store/ducks/actionSnackbar/actionCreators";
import EmbedTweet from "./EmbedTweet/EmbedTweet";
import ReportTweet from "./ReportTweet/ReportTweet";

interface TweetComponentActionsProps {
    tweetId: number;
    isFullTweet?: boolean;
    onOpenTweetAnalytics?: () => void;
}

const TweetComponentActions: FC<TweetComponentActionsProps> = memo(({ tweetId, isFullTweet }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useTweetComponentMoreStyles({ isFullTweet });
    const dispatch = useDispatch();
    const { userId } = useParams<{ userId: string }>();
    const myProfileId = useSelector(selectUserDataId);
    const isTweetAdditionalInfoLoading = useSelector(selectIsTweetAdditionalInfoLoading);
    const tweetReplyType = useSelector(selectTweetInfoReplyType);
    const tweetUserId = useSelector(selectTweetInfoUserId);
    const tweetUserIsMyProfileBlocked = useSelector(selectTweetInfoUserIsMyProfileBlocked);
    const [openActionsDropdown, setOpenActionsDropdown] = useState<boolean>(false);
    const [openChangeReplyDropdown, setChangeReplyDropdown] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (openActionsDropdown) {
            dispatch(fetchTweetAdditionalInfo(tweetId));
        }
        return () => {
            dispatch(resetTweetAdditionalInfo());
        };
    }, [tweetId, openActionsDropdown]);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);

        return () => document.removeEventListener("click", handleClickOutside, true);
    }, []);

    const handleClickOutside = (event: any): void => {
        if (ref.current && !ref.current.contains(event.target)) {
            setChangeReplyDropdown(false);
        }
    };

    const handleClickReplyDropdown = (): void => {
        setChangeReplyDropdown((prev) => !prev);
    };

    const handleClickActionsDropdown = (): void => {
        setOpenActionsDropdown((prev) => !prev);
    };

    const handleClickAwayActionsDropdown = useCallback((): void => {
        setOpenActionsDropdown(false);
    }, []);

    const onChangeTweetReplyType = (replyType: ReplyType): void => {
        dispatch(changeReplyType({ tweetId, userId, replyType }));
        let snackBarMessage;

        if (replyType === ReplyType.EVERYONE) {
            snackBarMessage = t("EVERYONE_CAN_REPLY_NOW", { defaultValue: "Everyone can reply now" });
        } else if (replyType === ReplyType.FOLLOW) {
            snackBarMessage = t("PEOPLE_YOU_FOLLOW_CAN_REPLY_NOW", { defaultValue: "People you follow can reply now" });
        } else {
            snackBarMessage = t("ONLY_YOU_CAN_REPLY_NOW", { defaultValue: "Only you can reply now" });
        }
        dispatch(setOpenSnackBar(snackBarMessage));
        handleClickReplyDropdown();
        setOpenActionsDropdown(false);
    };

    return (
        <div ref={ref}>
            <ClickAwayListener onClickAway={handleClickAwayActionsDropdown}>
                <div className={classes.root}>
                    <ActionIconButton
                        actionText={t("MORE", { defaultValue: "More" })}
                        onClick={handleClickActionsDropdown}
                        icon={EditIcon}
                    />
                    {openActionsDropdown && (
                        <div className={classnames(classes.dropdown, globalClasses.svg)}>
                            {isTweetAdditionalInfoLoading ? (
                                <Spinner paddingTop={95} />
                            ) : (
                                <List>
                                    {(myProfileId === tweetUserId) ? (
                                        <>
                                            <DeleteTweetButton
                                                tweetId={tweetId}
                                                onCloseActionsDropdown={handleClickAwayActionsDropdown}
                                            />
                                            <PinTweetButton
                                                tweetId={tweetId}
                                                onCloseActionsDropdown={handleClickAwayActionsDropdown}
                                            />
                                            <AddToListButton />
                                            <ChangeReplyButton handleClickReplyDropdown={handleClickReplyDropdown} />
                                            <EmbedTweet />
                                            <TweetActivityButton />
                                        </>
                                    ) : (
                                        <>
                                            {!tweetUserIsMyProfileBlocked && (
                                                <>
                                                    <FollowUserButton tweetId={tweetId} />
                                                    <AddToListButton />
                                                </>
                                            )}
                                            <MuteUserButton tweetId={tweetId} />
                                            <BlockUserButton tweetId={tweetId} />
                                            <EmbedTweet />
                                            <ReportTweet />
                                        </>
                                    )}
                                </List>
                            )}
                        </div>
                    )}
                    {openChangeReplyDropdown && (
                        <div className={classes.replyWindowWrapper}>
                            <ChangeReplyWindow
                                replyType={tweetReplyType!}
                                onChangeTweetReplyType={onChangeTweetReplyType}
                            />
                        </div>
                    )}
                </div>
            </ClickAwayListener>
        </div>
    );
});

export default TweetComponentActions;
