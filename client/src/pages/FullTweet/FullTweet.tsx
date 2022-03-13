import React, {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {Avatar, Divider, IconButton} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import usLang from 'date-fns/locale/en-US/index';
import SockJS from "sockjs-client";
import {CompatClient, Stomp} from "@stomp/stompjs";
import {compose} from "redux";

import {
    selectIsRepliesLoading,
    selectIsTweetError,
    selectIsTweetLoadedSuccess,
    selectIsTweetLoading,
    selectReplies,
    selectTweetData
} from '../../store/ducks/tweet/selectors';
import {
    fetchReplies,
    fetchTweetData,
    resetRepliesState,
    resetTweetState,
    updateTweetData,
} from '../../store/ducks/tweet/actionCreators';
import {likeTweet, retweet} from "../../store/ducks/tweets/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import UsersListModal, {UsersListModalAction} from "../../components/UsersListModal/UsersListModal";
import AddTweetForm from "../../components/AddTweetForm/AddTweetForm";
import TweetComponent from "../../components/TweetComponent/TweetComponent";
import {useFullTweetStyles} from "./FullTweetStyles";
import {DEFAULT_PROFILE_IMG, WS_URL} from "../../util/url";
import {
    FollowReplyIcon,
    LikeIcon,
    LikeOutlinedIcon,
    MentionReplyIcon,
    ReplyIcon,
    RetweetIcon,
    RetweetOutlinedIcon,
} from "../../icons";
import {textFormatter} from "../../util/textFormatter";
import VoteComponent from "../../components/VoteComponent/VoteComponent";
import {LinkCoverSize, ReplyType} from "../../store/ducks/tweets/contracts/state";
import ShareTweet from "../../components/ShareTweet/ShareTweet";
import TweetComponentActions from "../../components/TweetComponentActions/TweetComponentActions";
import Quote from "../../components/Quote/Quote";
import PopperUserWindow from "../../components/PopperUserWindow/PopperUserWindow";
import YouTubeVideo from "../../components/YouTubeVideo/YouTubeVideo";
import SmallLinkPreview from "../../components/SmallLinkPreview/SmallLinkPreview";
import LargeLinkPreview from "../../components/LargeLinkPreview/LargeLinkPreview";
import HoverAction from "../../components/HoverAction/HoverAction";
import {HoverActionProps, HoverActions, withHoverAction} from "../../hoc/withHoverAction";
import TweetAnalyticsModal from "../../components/TweetAnalyticsModal/TweetAnalyticsModal";
import Spinner from "../../components/Spinner/Spinner";
import {HoverUserProps, withHoverUser} from "../../hoc/withHoverUser";
import {useGlobalStyles} from "../../util/globalClasses";
import classnames from "classnames";
import TweetActionResult, {TweetActionResults} from "../../components/TweetActionResult/TweetActionResult";

let stompClient: CompatClient | null = null;

interface FullTweetProps {
    visiblePopperWindow?: boolean;
    handleHover?: () => void;
    handleLeave?: () => void;
}

const FullTweet: FC<HoverUserProps & FullTweetProps & HoverActionProps> = (
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
    const location = useLocation();
    const tweetData = useSelector(selectTweetData);
    const replies = useSelector(selectReplies);
    const myProfile = useSelector(selectUserData);
    const isTweetLoading = useSelector(selectIsTweetLoading);
    const isTweetLoadedSuccess = useSelector(selectIsTweetLoadedSuccess);
    const isRepliesLoading = useSelector(selectIsRepliesLoading);
    const isError = useSelector(selectIsTweetError);
    const params = useParams<{ id: string }>();
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [visibleAnalyticsModalWindow, setVisibleAnalyticsModalWindow] = useState<boolean>(false);
    const [usersListModalAction, setUsersListModalAction] = useState<UsersListModalAction>(UsersListModalAction.LIKED);
    const [openYouTubeVideo, setOpenYouTubeVideo] = useState<boolean>(false);
    const isYouTubeLink = tweetData?.link && tweetData?.link.includes("youtu");
    const image = tweetData?.images?.[0];
    const classes = useFullTweetStyles({isTweetRetweeted: tweetData?.isTweetRetweeted!, isTweetLiked: tweetData?.isTweetLiked!});

    useEffect(() => {
        window.scrollTo(0, 0);
        if (params.id) {
            dispatch(fetchTweetData(parseInt(params.id)));

            stompClient = Stomp.over(new SockJS(WS_URL));
            stompClient.connect({}, () => {
                stompClient?.subscribe("/topic/tweet/" + params.id, (response) => {
                    dispatch(updateTweetData(JSON.parse(response.body)));
                });
            });
        }

        return () => {
            stompClient?.disconnect();
            dispatch(resetTweetState());
        };
    }, [params.id]);

    useEffect(() => {
        dispatch(fetchReplies(parseInt(params.id)));

        if (isTweetLoadedSuccess) {
            document.title = `${tweetData?.user.fullName} on Twitter: "${tweetData?.text}"`;
        }
        return () => {
            dispatch(resetRepliesState());
        };
    }, [isTweetLoadedSuccess]);

    const handleLike = (): void => {
        dispatch(likeTweet(parseInt(params.id)));
    };

    const handleRetweet = (): void => {
        dispatch(retweet(parseInt(params.id)));
    };

    const onOpenLikesModalWindow = (): void => {
        setVisibleModalWindow(true);
        setUsersListModalAction(UsersListModalAction.LIKED);
    };

    const onOpenRetweetsModalWindow = (): void => {
        setVisibleModalWindow(true);
        setUsersListModalAction(UsersListModalAction.RETWEETED);
    };

    const onCloseModalWindow = (): void => {
        setVisibleModalWindow(false);
    };

    const onOpenYouTubeVideo = (): void => {
        setOpenYouTubeVideo(true);
    };

    const onOpenTweetAnalyticsModalWindow = (): void => {
        setVisibleAnalyticsModalWindow(true);
    };

    const onCloseTweetAnalyticsModalWindow = (): void => {
        setVisibleAnalyticsModalWindow(false);
    };

    if (isTweetLoading) {
        return <Spinner paddingTop={200}/>;
    } else if (tweetData !== undefined && isTweetLoadedSuccess) {
        return (
            <div className={globalClasses.contentWrapper}>
                <Paper className={classes.container}>
                    {tweetData.isTweetRetweeted && (
                        <TweetActionResult action={TweetActionResults.RETWEET} text={"You Retweeted"}/>
                    )}
                    {(myProfile?.pinnedTweetId === tweetData.id) && (
                        <TweetActionResult action={TweetActionResults.PIN} text={"Pinned Tweet"}/>
                    )}
                    <div className={classes.header}>
                        <div className={classes.headerWrapper}>
                            <Avatar
                                className={globalClasses.avatar}
                                alt={`avatar ${tweetData.user.id}`}
                                src={tweetData.user.avatar?.src ? tweetData.user.avatar?.src : DEFAULT_PROFILE_IMG}
                            />
                            <div
                                className={classes.headerUserInfo}
                                onMouseEnter={() => handleHoverPopper!(tweetData.user.id)}
                                onMouseLeave={handleLeavePopper}
                            >
                                <Link to={`/profile/${tweetData.user.id}`}>
                                    <Typography variant={"h6"} component={"div"}>
                                        {tweetData.user.fullName}
                                    </Typography>
                                </Link>
                                <div>
                                    <Typography variant={"subtitle1"} component={"span"}>
                                        @{tweetData.user.username}
                                    </Typography>
                                </div>
                                <PopperUserWindow visible={visiblePopperWindow}/>
                            </div>
                        </div>
                        <TweetComponentActions
                            tweet={tweetData}
                            isFullTweet={true}
                            visibleMoreAction={visibleHoverAction?.visibleMoreAction}
                            handleHoverAction={handleHoverAction}
                            handleLeaveAction={handleLeaveAction}
                            onOpenTweetAnalytics={onOpenTweetAnalyticsModalWindow}
                        />
                    </div>
                    <Typography variant={"h3"} className={classes.textWrapper}>
                        {textFormatter(tweetData.text)}
                        {(tweetData.images?.length !== 0) && (
                            <Link to={{pathname: `/modal/${params.id}`, state: {background: location}}}>
                                <div className={classes.image}>
                                    <img src={image?.src} alt={image?.src}/>
                                </div>
                            </Link>
                        )}
                        {tweetData.poll && <VoteComponent tweetId={tweetData.id} poll={tweetData.poll}/>}
                        {tweetData.quoteTweet && (
                            <Quote
                                quoteTweet={tweetData.quoteTweet}
                                isTweetQuoted={true}
                                isFullTweet={true}
                            />
                        )}
                        {tweetData.link ? (
                            isYouTubeLink ? (
                                openYouTubeVideo ? (
                                    <YouTubeVideo tweet={tweetData}/>
                                ) : (
                                    <SmallLinkPreview
                                        tweet={tweetData}
                                        isFullTweet={true}
                                        onOpenYouTubeVideo={onOpenYouTubeVideo}
                                    />
                                )
                            ) : (
                                (tweetData.linkCoverSize === LinkCoverSize.LARGE) ? (
                                    <LargeLinkPreview tweet={tweetData} isFullTweet={true}/>
                                ) : (
                                    <SmallLinkPreview tweet={tweetData}/>
                                )
                            )
                        ) : null}
                    </Typography>
                    <div className={classes.dateWrapper}>
                        <Typography variant={"subtitle1"} component={"span"}>
                            {format(new Date(tweetData.dateTime), 'hh:mm a', {locale: usLang})} ·
                        </Typography>
                        <Typography variant={"subtitle1"} component={"span"}>
                            {format(new Date(tweetData.dateTime), ' MMM dd, yyyy')} · Twitter Web App
                        </Typography>
                    </div>
                    {(tweetData.retweetsCount !== 0 || tweetData.likedTweetsCount !== 0) && (
                        <>
                            <Divider/>
                            <div className={classes.content}>
                                {(tweetData.retweetsCount !== 0) && (
                                    <a href={"javascript:void(0);"} onClick={onOpenRetweetsModalWindow}>
                                        <div className={classes.contentItem}>
                                            <Typography variant={"h6"} component={"span"}>
                                                {tweetData.retweetsCount}
                                            </Typography>
                                            <Typography variant={"subtitle1"} component={"span"}>
                                                Retweets
                                            </Typography>
                                        </div>
                                    </a>
                                )}
                                {(tweetData.likedTweetsCount !== 0) && (
                                    <a href={"javascript:void(0);"} onClick={onOpenLikesModalWindow}>
                                        <div className={classes.contentItem}>
                                            <Typography variant={"h6"} component={"span"}>
                                                {tweetData.likedTweetsCount}
                                            </Typography>
                                            <Typography variant={"subtitle1"} component={"span"}>
                                                Likes
                                            </Typography>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </>
                    )}
                    <div className={classes.info}>
                        <div className={classes.infoIcon}>
                            <IconButton
                                onMouseEnter={() => handleHoverAction?.(HoverActions.REPLY)}
                                onMouseLeave={handleLeaveAction}
                            >
                                <>{ReplyIcon}</>
                                <HoverAction visible={visibleHoverAction?.visibleReplyAction} actionText={"Reply"}/>
                            </IconButton>
                        </div>
                        <div className={classnames(globalClasses.svgLarge, classes.retweetIcon)}>
                            <IconButton
                                onClick={handleRetweet}
                                onMouseEnter={() => handleHoverAction?.(HoverActions.RETWEET)}
                                onMouseLeave={handleLeaveAction}
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
                            isFullTweet={true}
                            visibleShareAction={visibleHoverAction?.visibleShareAction}
                            handleHoverAction={handleHoverAction}
                            handleLeaveAction={handleLeaveAction}
                        />
                    </div>
                    <Divider/>
                    {(tweetData.replyType === ReplyType.FOLLOW || tweetData.replyType === ReplyType.MENTION) && (
                        <Paper variant="outlined" className={classes.replyInfoWrapper}>
                            <div className={classes.replyInfo}>
                                <div className={classes.iconWrapper}>
                                    <div className={classes.iconCircle}>
                                        <span className={classes.icon}>
                                            {(tweetData.replyType === ReplyType.FOLLOW) && (FollowReplyIcon)}
                                            {(tweetData.replyType === ReplyType.MENTION) && (MentionReplyIcon)}
                                        </span>
                                    </div>
                                </div>
                                <div className={classes.replyTextInfoWrapper}>
                                    <Typography variant={"h6"} component={"div"}>
                                        Who can reply?
                                    </Typography>
                                    <Typography variant={"body1"} component={"div"}>
                                        People @{tweetData.user.fullName}
                                        {(tweetData.replyType === ReplyType.FOLLOW) ? (" follows or ") : (" ")}
                                        mentioned can reply
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    )}
                    {((tweetData.replyType !== ReplyType.FOLLOW) && (tweetData.replyType !== ReplyType.MENTION) ||
                        (myProfile?.id === tweetData?.user.id) || (tweetData.user.isFollower && tweetData.replyType === ReplyType.FOLLOW)
                    ) ? (
                        <>
                            <Typography variant={"subtitle1"} className={classes.replyWrapper}>
                                {"Replying to "}
                                <Link to={`/profile/${tweetData.user.id}`}>
                                    @{tweetData.user.username}
                                </Link>
                            </Typography>
                            <AddTweetForm
                                tweetId={tweetData.id}
                                addressedUsername={tweetData.user.username}
                                addressedId={tweetData.user.id}
                                maxRows={15}
                                title={"Tweet your reply"}
                                buttonName={"Reply"}
                            />
                        </>
                    ) : null}
                    <UsersListModal
                        tweetId={tweetData.id}
                        usersListModalAction={usersListModalAction}
                        visible={visibleModalWindow}
                        onClose={onCloseModalWindow}
                    />
                    <TweetAnalyticsModal
                        tweet={tweetData}
                        visible={visibleAnalyticsModalWindow}
                        onClose={onCloseTweetAnalyticsModalWindow}
                    />
                </Paper>
                <div className={classes.divider}/>
                {isRepliesLoading ? <Spinner/> : (
                    replies.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)
                )}
            </div>
        );
    } else if (tweetData === undefined && isError) {
        return (
            <Typography variant={"h5"} component={"div"} className={classes.error}>
                Hmm...this page doesn’t exist. <br/>
                Try searching for something else.
            </Typography>
        );
    } else {
        return null;
    }
};

export default compose(withHoverUser, withHoverAction)(FullTweet) as ComponentType<HoverUserProps & FullTweetProps>;
