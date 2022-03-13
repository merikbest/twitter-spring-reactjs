import React, {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useParams} from "react-router-dom";
import {Avatar, Divider, IconButton} from '@material-ui/core';
import classNames from "classnames";
import classnames from "classnames";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";
import usLang from "date-fns/locale/en-US/index";
import {compose} from "recompose";
import {CompatClient, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

import {
    CloseIcon,
    LikeIcon,
    LikeOutlinedIcon,
    ReplyIcon,
    RetweetIcon,
    RetweetOutlinedIcon,
    ShareIcon
} from "../../icons";
import {selectUserData} from "../../store/ducks/user/selectors";
import AddTweetForm from "../AddTweetForm/AddTweetForm";
import UsersListModal, {UsersListModalAction} from "../UsersListModal/UsersListModal";
import TweetComponent from '../TweetComponent/TweetComponent';
import {likeTweet, retweet} from "../../store/ducks/tweets/actionCreators";
import {useTweetImageStyles} from "./TweetImageModalStyles";
import {
    fetchReplies,
    fetchTweetData,
    resetRepliesState,
    resetTweetState,
    updateTweetData
} from "../../store/ducks/tweet/actionCreators";
import {
    selectIsRepliesLoading,
    selectIsTweetLoadedSuccess,
    selectIsTweetLoading,
    selectReplies,
    selectTweetData
} from "../../store/ducks/tweet/selectors";
import {DEFAULT_PROFILE_IMG, WS_URL} from "../../util/url";
import {textFormatter} from "../../util/textFormatter";
import {HoverActionProps, HoverActions, withHoverAction} from "../../hoc/withHoverAction";
import HoverAction from "../HoverAction/HoverAction";
import PopperUserWindow from "../PopperUserWindow/PopperUserWindow";
import ShareTweet from "../ShareTweet/ShareTweet";
import ReplyModal from "../ReplyModal/ReplyModal";
import {HoverUserProps, withHoverUser} from "../../hoc/withHoverUser";
import {ReplyType} from "../../store/ducks/tweets/contracts/state";
import {useGlobalStyles} from "../../util/globalClasses";
import Spinner from "../Spinner/Spinner";

let stompClient: CompatClient | null = null;

const TweetImageModal: FC<HoverUserProps & HoverActionProps> = (
    {
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper,
        visibleHoverAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement | null => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const tweetData = useSelector(selectTweetData);
    const replies = useSelector(selectReplies);
    const myProfile = useSelector(selectUserData);
    const isTweetLoading = useSelector(selectIsTweetLoading);
    const isTweetLoadedSuccess = useSelector(selectIsTweetLoadedSuccess);
    const isRepliesLoading = useSelector(selectIsRepliesLoading);
    const params: { id: string } = useParams();
    const history = useHistory();
    const [visibleTweetImageModalWindow, setVisibleTweetImageModalWindow] = useState<boolean>(false);
    const [visibleUsersListModalWindow, setVisibleUsersListModalWindow] = useState<boolean>(false);
    const [visibleReplyModalWindow, setVisibleReplyModalWindow] = useState<boolean>(false);
    const [usersListModalAction, setUsersListModalAction] = useState<UsersListModalAction>(UsersListModalAction.LIKED);
    const isUserCanReply = (tweetData?.replyType === ReplyType.MENTION) && (myProfile?.id !== tweetData?.user.id);
    const classes = useTweetImageStyles({
        isUserCanReply: isUserCanReply,
        isTweetRetweeted: tweetData?.isTweetRetweeted!,
        isTweetLiked: tweetData?.isTweetLiked!
    });

    useEffect(() => {
        dispatch(fetchTweetData(parseInt(params.id)));
        setVisibleTweetImageModalWindow(true);
        document.body.style.marginRight = "15px";
        document.body.style.overflow = 'hidden';

        stompClient = Stomp.over(new SockJS(WS_URL));
        stompClient.connect({}, () => {
            stompClient?.subscribe("/topic/tweet/" + params.id, (response) => {
                dispatch(updateTweetData(JSON.parse(response.body)));
            });
        });

        return () => {
            stompClient?.disconnect();
            dispatch(resetTweetState());
        };
    }, []);

    useEffect(() => {
        dispatch(fetchReplies(parseInt(params.id)));

        return () => {
            dispatch(resetRepliesState());
        };
    }, [isTweetLoadedSuccess]);

    const onCloseImageModalWindow = (event: any): void => {
        if (event.target.classList[0]) {
            if (event.target.classList[0].includes('container')) {
                onClose();
            }
        }
    };

    const onCloseModalWindow  = (): void => {
        onClose();
    };

    const onClose = (): void => {
        setVisibleTweetImageModalWindow(false);
        document.body.style.marginRight = "0px";
        document.body.style.overflow = 'unset';
        history.goBack();
    };

    const onOpenLikesModalWindow = (): void => {
        setVisibleUsersListModalWindow(true);
        setUsersListModalAction(UsersListModalAction.LIKED);
    };

    const onOpenRetweetsModalWindow = (): void => {
        setVisibleUsersListModalWindow(true);
        setUsersListModalAction(UsersListModalAction.RETWEETED);
    };

    const onCloseUsersListModalWindow = (): void => {
        setVisibleUsersListModalWindow(false);
    };

    const onOpenReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(true);
    };

    const onCloseReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(false);
    };

    const handleLike = (): void => {
        dispatch(likeTweet(parseInt(params.id)));
    };

    const handleRetweet = (): void => {
        dispatch(retweet(parseInt(params.id)));
    };

    if (!visibleTweetImageModalWindow) {
        return null;
    }

    if (tweetData) {
        return (
            <div className={classes.container} onClick={onCloseImageModalWindow}>
                <div className={classes.modalWrapper}>
                    <img
                        className={classes.imageModal}
                        alt={tweetData?.images?.[0]?.src}
                        src={tweetData?.images?.[0]?.src}
                    />
                    <div className={classes.tweetInfo}>
                        <div className={classes.header}>
                            <Link to={`/profile/${tweetData?.user.id}`}>
                                <Avatar
                                    className={classnames(globalClasses.avatar, classes.avatar)}
                                    alt={`avatar ${tweetData.user.id}`}
                                    src={tweetData.user.avatar?.src ? tweetData.user.avatar?.src : DEFAULT_PROFILE_IMG}
                                />
                            </Link>
                            <Link to={`/profile/${tweetData?.user.id}`}>
                                <div
                                    onMouseEnter={() => handleHoverPopper!(tweetData.user.id)}
                                    onMouseLeave={handleLeavePopper}
                                >
                                    <Typography variant={"h6"} component={"div"} id={"link"}>
                                        {tweetData.user.fullName}
                                    </Typography>
                                    <Typography variant={"subtitle1"} component={"div"}>
                                        @{tweetData.user.username}
                                    </Typography>
                                    <PopperUserWindow visible={visiblePopperWindow} isTweetImageModal={true}/>
                                </div>
                            </Link>
                        </div>
                        <Typography variant={"h3"} className={classes.text}>
                            {textFormatter(tweetData.text)}
                        </Typography>
                        <Typography style={{marginBottom: 16}}>
                            <Typography variant={"subtitle1"} component={"span"}>
                                {format(new Date(tweetData.dateTime), 'hh:mm a', {locale: usLang})} ·
                            </Typography>
                            <Typography variant={"subtitle1"} component={"span"}>
                                {format(new Date(tweetData.dateTime), ' MMM dd, yyyy')} · Twitter Web App
                            </Typography>
                        </Typography>
                        <Divider/>
                        {(tweetData.retweetsCount !== 0 || tweetData.likedTweetsCount !== 0) && (
                            <div className={classes.content}>
                                {(tweetData.retweetsCount !== 0) && (
                                    <a href={"javascript:void(0);"} onClick={onOpenRetweetsModalWindow}>
                                        <span style={{marginRight: 20}}>
                                            <Typography variant={"h6"} component={"span"}>
                                                {tweetData.retweetsCount}
                                            </Typography>
                                            <Typography variant={"subtitle1"} component={"span"}>
                                                Retweets
                                            </Typography>
                                        </span>
                                    </a>
                                )}
                                {(tweetData.likedTweetsCount !== 0) && (
                                    <a href={"javascript:void(0);"} onClick={onOpenLikesModalWindow}>
                                        <span style={{marginRight: 20}}>
                                            <Typography variant={"h6"} component={"span"}>
                                                {tweetData.likedTweetsCount}
                                            </Typography>
                                            <Typography variant={"subtitle1"} component={"span"}>
                                                Likes
                                            </Typography>
                                        </span>
                                    </a>
                                )}
                            </div>
                        )}
                        <div className={classes.tweetFooter}>
                            <div className={classes.tweetIcon}>
                                <IconButton
                                    onClick={onOpenReplyModalWindow}
                                    onMouseEnter={() => handleHoverAction?.(HoverActions.REPLY)}
                                    onMouseLeave={handleLeaveAction}
                                    size="small"
                                >
                                    <>{ReplyIcon}</>
                                    <HoverAction visible={visibleHoverAction?.visibleReplyAction} actionText={"Reply"}/>
                                </IconButton>
                            </div>
                            <div className={classes.retweetIcon}>
                                <IconButton
                                    onClick={handleRetweet}
                                    onMouseEnter={() => handleHoverAction?.(HoverActions.RETWEET)}
                                    onMouseLeave={handleLeaveAction}
                                    size="small"
                                >
                                    {tweetData.isTweetRetweeted ? (
                                        <>{RetweetIcon}</>
                                    ) : (
                                        <>{RetweetOutlinedIcon}</>
                                    )}
                                    <HoverAction
                                        visible={visibleHoverAction?.visibleRetweetAction}
                                        actionText={tweetData.isTweetRetweeted ? "Undo Retweet" : "Retweet"}
                                    />
                                </IconButton>
                            </div>
                            <div className={classes.likeIcon}>
                                <IconButton
                                    onClick={handleLike}
                                    onMouseEnter={() => handleHoverAction?.(HoverActions.LIKE)}
                                    onMouseLeave={handleLeaveAction}
                                    size="small"
                                >
                                    {tweetData.isTweetLiked ? (
                                        <>{LikeIcon}</>
                                    ) : (
                                        <>{LikeOutlinedIcon}</>
                                    )}
                                    <HoverAction
                                        visible={visibleHoverAction?.visibleLikeAction}
                                        actionText={tweetData.isTweetLiked ? "Unlike" : "Like"}
                                    />
                                </IconButton>
                            </div>
                            <ShareTweet
                                tweet={tweetData}
                                isFullTweet={false}
                                visibleShareAction={visibleHoverAction?.visibleShareAction}
                                handleHoverAction={handleHoverAction}
                                handleLeaveAction={handleLeaveAction}
                            />
                        </div>
                        <Divider/>
                        <Typography variant={"subtitle1"} component={"div"} className={classes.replyWrapper}>
                            {"Replying to "}
                            <Link to={`/profile/${tweetData.user.id}`}>
                                @{tweetData.user.username}
                            </Link>
                        </Typography>
                        <AddTweetForm
                            tweetId={tweetData.id}
                            addressedUsername={tweetData.user.username}
                            maxRows={15}
                            title={"Tweet your reply"}
                            buttonName={"Reply"}
                        />
                    </div>
                    <Divider/>
                    <UsersListModal
                        tweetId={tweetData.id}
                        usersListModalAction={usersListModalAction}
                        visible={visibleUsersListModalWindow}
                        onClose={onCloseUsersListModalWindow}
                    />
                    {isRepliesLoading ? <Spinner/> : (
                        replies.map((tweet) => <TweetComponent isTweetImageModal={true} key={tweet.id} item={tweet}/>)
                    )}
                    <ReplyModal
                        user={tweetData.user}
                        tweetId={tweetData.id}
                        text={tweetData.text}
                        image={tweetData?.images?.[0]}
                        dateTime={tweetData.dateTime}
                        visible={visibleReplyModalWindow}
                        onClose={onCloseReplyModalWindow}
                    />
                </div>
                <div className={classes.imageFooterContainer}>
                    <div className={classNames(classes.imageFooterWrapper)}>
                        <div className={classes.imageFooterIcon}>
                            <IconButton size="small">
                                <>{ReplyIcon}</>
                            </IconButton>
                            {(tweetData.repliesCount === 0 || tweetData.repliesCount === null) ? null : (
                                <Typography variant={"body1"} component={"span"}>
                                    {tweetData.repliesCount}
                                </Typography>
                            )}
                        </div>
                        <div className={classes.imageFooterIcon}>
                            <IconButton onClick={handleRetweet} size="small">
                                {tweetData.isTweetRetweeted ? (
                                    <>{RetweetIcon}</>
                                ) : (
                                    <>{RetweetOutlinedIcon}</>
                                )}
                            </IconButton>
                            {(tweetData.retweetsCount === 0 || tweetData.retweetsCount === null) ? null : (
                                tweetData.isTweetRetweeted && (
                                    <Typography variant={"body1"} component={"span"}>
                                        {tweetData.retweetsCount}
                                    </Typography>
                                )
                            )}
                        </div>
                        <div className={classes.imageFooterIcon}>
                            <IconButton onClick={handleLike} size="small">
                                {tweetData.isTweetLiked ? (
                                    <>{LikeIcon}</>
                                ) : (
                                    <>{LikeOutlinedIcon}</>
                                )}
                            </IconButton>
                            {(tweetData.likedTweetsCount === 0 || tweetData.likedTweetsCount === null) ? null : (
                                tweetData.isTweetLiked && (
                                    <Typography variant={"body1"} component={"span"}>
                                        {tweetData.likedTweetsCount}
                                    </Typography>
                                )
                            )}
                        </div>
                        <div className={classes.imageFooterIcon}>
                            <IconButton size="small">
                                <>{ShareIcon}</>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className={classes.imageModalClose}>
                    <IconButton onClick={onCloseModalWindow} size="small">
                        {CloseIcon}
                    </IconButton>
                </div>
            </div>
        );
    }
    return null;
};

export default compose(withHoverUser, withHoverAction)(TweetImageModal) as ComponentType<HoverUserProps & HoverActionProps>;
