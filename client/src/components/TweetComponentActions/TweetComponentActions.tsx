import React, {FC, ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ClickAwayListener, List, ListItem, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useTweetComponentMoreStyles} from "./TweetComponentActionsStyles";
import {EditIcon, EmbedTweetIcon, ReportIcon} from "../../icons";
import {selectUserDataId} from "../../store/ducks/user/selectors";
import {useGlobalStyles} from "../../util/globalClasses";
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
import {fetchTweetAdditionalInfo, resetTweetAdditionalInfo} from "../../store/ducks/tweetAdditionalInfo/actionCreators";
import {
    selectIsTweetAdditionalInfoLoading,
    selectTweetInfoAddressedTweetId,
    selectTweetInfoReplyType,
    selectTweetInfoText,
    selectTweetInfoUserFullName,
    selectTweetInfoUserId,
    selectTweetInfoUserIsFollower,
    selectTweetInfoUserIsMyProfileBlocked,
    selectTweetInfoUserIsUserBlocked,
    selectTweetInfoUserIsUserMuted,
    selectTweetInfoUserUsername
} from "../../store/ducks/tweetAdditionalInfo/selectors";
import Spinner from "../Spinner/Spinner";

interface TweetComponentActionsProps {
    tweetId: number;
    isFullTweet: boolean;
    onOpenTweetAnalytics?: () => void;
}
const TweetComponentActions: FC<TweetComponentActionsProps> = ({tweetId, isFullTweet}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useTweetComponentMoreStyles({isFullTweet});
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);
    const isTweetAdditionalInfoLoading = useSelector(selectIsTweetAdditionalInfoLoading);
    const tweetText = useSelector(selectTweetInfoText);
    const tweetReplyType = useSelector(selectTweetInfoReplyType);
    const addressedTweetId = useSelector(selectTweetInfoAddressedTweetId);
    const tweetUserId = useSelector(selectTweetInfoUserId);
    const tweetUserFullName = useSelector(selectTweetInfoUserFullName);
    const tweetUserUsername = useSelector(selectTweetInfoUserUsername);
    const tweetUserIsFollower = useSelector(selectTweetInfoUserIsFollower);
    const tweetUserIsUserMuted = useSelector(selectTweetInfoUserIsUserMuted);
    const tweetUserIsUserBlocked = useSelector(selectTweetInfoUserIsUserBlocked);
    const tweetUserIsMyProfileBlocked = useSelector(selectTweetInfoUserIsMyProfileBlocked);
    const [openActionsDropdown, setOpenActionsDropdown] = useState<boolean>(false);
    const [openChangeReplyDropdown, setChangeReplyDropdown] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (openActionsDropdown) {
            dispatch(fetchTweetAdditionalInfo(tweetId));
        }
        return () => {
            dispatch(resetTweetAdditionalInfo());
        }
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

    return (
        <div ref={ref}>
            <ClickAwayListener onClickAway={handleClickAwayActionsDropdown}>
                <div className={classes.root}>
                    <ActionIconButton actionText={"More"} onClick={handleClickActionsDropdown} icon={EditIcon}/>
                    {openActionsDropdown && (
                        <div className={classnames(classes.dropdown, globalClasses.svg)}>
                            {isTweetAdditionalInfoLoading ? (
                                <Spinner paddingTop={95}/>
                            ) : (
                                <List>
                                    {(myProfileId === tweetUserId) ? (
                                        <>
                                            <DeleteTweetButton
                                                tweetId={tweetId}
                                                addressedTweetId={addressedTweetId!}
                                                onCloseActionsDropdown={handleClickAwayActionsDropdown}
                                            />
                                            <PinTweetButton
                                                tweetId={tweetId}
                                                onCloseActionsDropdown={handleClickAwayActionsDropdown}
                                            />
                                            <AddToListButton userId={tweetUserId!} username={tweetUserUsername!}/>
                                            <ChangeReplyButton handleClickReplyDropdown={handleClickReplyDropdown}/>
                                            <ListItem>
                                                <>{EmbedTweetIcon}</>
                                                <Typography variant={"body1"} component={"span"}>
                                                    Embed Tweet
                                                </Typography>
                                            </ListItem>
                                            <TweetActivityButton
                                                fullName={tweetUserFullName!}
                                                username={tweetUserUsername!}
                                                text={tweetText!}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {!tweetUserIsMyProfileBlocked && (
                                                <>
                                                    <FollowUserButton
                                                        tweetId={tweetId}
                                                        userId={tweetUserId!}
                                                        username={tweetUserUsername!}
                                                        isFollower={tweetUserIsFollower!}
                                                    />
                                                    <AddToListButton
                                                        userId={tweetUserId!}
                                                        username={tweetUserUsername!}
                                                    />
                                                </>
                                            )}
                                            <MuteUserButton
                                                tweetId={tweetId}
                                                userId={tweetUserId!}
                                                username={tweetUserUsername!}
                                                isUserMuted={tweetUserIsUserMuted!}
                                            />
                                            <BlockUserButton
                                                tweetId={tweetId}
                                                userId={tweetUserId!}
                                                username={tweetUserUsername!}
                                                isUserBlocked={tweetUserIsUserBlocked!}
                                            />
                                            <ListItem>
                                                <>{EmbedTweetIcon}</>
                                                <Typography variant={"body1"} component={"span"}>
                                                    Embed Tweet
                                                </Typography>
                                            </ListItem>
                                            <ListItem>
                                                <>{ReportIcon}</>
                                                <Typography variant={"body1"} component={"span"}>
                                                    Report Tweet
                                                </Typography>
                                            </ListItem>
                                        </>
                                    )}
                                </List>
                            )}
                        </div>
                    )}
                    {openChangeReplyDropdown && (
                        <div className={classes.replyWindowWrapper}>
                            <ChangeReplyWindow
                                tweetId={tweetId}
                                replyType={tweetReplyType!}
                                handleClickReplyDropdown={handleClickReplyDropdown}
                                onCloseActionsDropdown={handleClickAwayActionsDropdown}
                            />
                        </div>
                    )}
                </div>
            </ClickAwayListener>
        </div>
    );
};

export default TweetComponentActions;
