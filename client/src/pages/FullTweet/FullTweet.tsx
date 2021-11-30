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
    selectIsTweetError,
    selectIsTweetLoadedSuccess,
    selectIsTweetLoading,
    selectTweetData
} from '../../store/ducks/tweet/selectors';
import {fetchTweetData, setTweetData, setTweetLoadingState} from '../../store/ducks/tweet/actionCreators';
import {likeTweet, retweet} from "../../store/ducks/tweets/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import UsersListModal from "../../components/UsersListModal/UsersListModal";
import AddTweetForm from "../../components/AddTweetForm/AddTweetForm";
import TweetComponent from "../../components/TweetComponent/TweetComponent";
import {useFullTweetStyles} from "./FullTweetStyles";
import {DEFAULT_PROFILE_IMG, WS_URL} from "../../util/url";
import {
    FollowReplyIcon,
    LikeIcon,
    LikeOutlinedIcon,
    MentionReplyIcon,
    PinOutlinedIcon,
    ReplyIcon,
    RetweetIcon,
    RetweetOutlinedIcon,
    RetweetOutlinedIconSm,
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
import {LoadingStatus} from "../../store/types";

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
    const dispatch = useDispatch();
    const location = useLocation();
    const tweetData = useSelector(selectTweetData);
    const myProfile = useSelector(selectUserData);
    const isLoading = useSelector(selectIsTweetLoading);
    const isLoadedSuccess = useSelector(selectIsTweetLoadedSuccess);
    const isError = useSelector(selectIsTweetError);
    const params = useParams<{ id: string }>();
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [visibleAnalyticsModalWindow, setVisibleAnalyticsModalWindow] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");
    const [openYouTubeVideo, setOpenYouTubeVideo] = useState<boolean>(false);

    const isTweetLiked = tweetData?.likedTweets.find((like) => like.user.id === myProfile?.id);
    const isTweetRetweeted = tweetData?.retweets.find((retweet) => retweet.user.id === myProfile?.id);
    const isFollower = myProfile?.followers?.findIndex((follower) => follower.id === tweetData?.user.id);
    const isYouTubeLink = tweetData?.link && tweetData?.link.includes("youtu");
    const image = tweetData?.images?.[0];
    const classes = useFullTweetStyles({isTweetRetweeted, isTweetLiked});

    useEffect(() => {
        window.scrollTo(0, 0);
        if (params.id) {
            dispatch(fetchTweetData(params.id));

            stompClient = Stomp.over(new SockJS(WS_URL));
            stompClient.connect({}, () => {
                stompClient?.subscribe("/topic/tweet/" + params.id, (response) => {
                    dispatch(setTweetData(JSON.parse(response.body)));
                });
            });
        }

        return () => {
            stompClient?.disconnect();
            dispatch(setTweetData(undefined));
            dispatch(setTweetLoadingState(LoadingStatus.NEVER));
        };
    }, [dispatch, params.id]);

    const handleLike = (): void => {
        dispatch(likeTweet(params.id));
    };

    const handleRetweet = (): void => {
        dispatch(retweet(params.id));
    };

    const onOpenLikesModalWindow = (): void => {
        setVisibleModalWindow(true);
        setModalWindowTitle("Liked by");
    };

    const onOpenRetweetsModalWindow = (): void => {
        setVisibleModalWindow(true);
        setModalWindowTitle("Retweeted by");
    };

    const onCloseModalWindow = (): void => {
        setVisibleModalWindow(false);
        setModalWindowTitle("");
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

    if (isLoading) {
        return <Spinner paddingTop={200}/>;
    } else if (tweetData !== undefined && isLoadedSuccess) {
        return (
            <div style={{paddingTop: 48}}>
                {isTweetRetweeted && (
                    <div className={classes.retweetWrapper}>
                        <span>{RetweetOutlinedIconSm}</span>
                        <Typography>
                            You Retweeted
                        </Typography>
                    </div>
                )}
                {(myProfile?.pinnedTweet?.id === tweetData.id) && (
                    <div className={classes.retweetWrapper}>
                        <span>{PinOutlinedIcon}</span>
                        <Typography>
                            Pinned Tweet
                        </Typography>
                    </div>
                )}
                <Paper className={classes.container}>
                    <div className={classes.header}>
                        <div className={classes.headerWrapper}>
                            <Avatar
                                className={classes.avatar}
                                alt={`avatar ${tweetData.user.id}`}
                                src={tweetData.user.avatar?.src ? tweetData.user.avatar?.src : DEFAULT_PROFILE_IMG}
                            />
                            <div
                                className={classes.headerUserInfo}
                                onMouseEnter={handleHoverPopper}
                                onMouseLeave={handleLeavePopper}
                            >
                                <Link to={`/user/${tweetData.user.id}`}>
                                    <b>{tweetData.user.fullName}</b>&nbsp;
                                </Link>
                                <div>
                                    <Typography component={"span"} className={classes.username}>
                                        @{tweetData.user.username}
                                    </Typography>&nbsp;
                                </div>
                                <PopperUserWindow visible={visiblePopperWindow} user={tweetData.user}/>
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
                    <Typography className={classes.textWrapper} gutterBottom>
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
                        <Typography component={"span"} className={classes.date}>
                            {format(new Date(tweetData.dateTime), 'hh:mm a', {locale: usLang})} ·
                        </Typography>
                        <Typography component={"span"} className={classes.date}>
                            {format(new Date(tweetData.dateTime), ' MMM dd, yyyy')} · Twitter Web App
                        </Typography>
                    </div>
                    {(tweetData.retweets.length !== 0 || tweetData.likedTweets.length !== 0) && (
                        <>
                            <Divider/>
                            <div className={classes.content}>
                                {(tweetData.retweets.length !== 0) && (
                                    <a href={"javascript:void(0);"} onClick={onOpenRetweetsModalWindow}>
                                        <div className={classes.contentItem}>
                                            <b>{tweetData.retweets.length}</b>
                                            <Typography component={"span"}>
                                                Retweets
                                            </Typography>
                                        </div>
                                    </a>
                                )}
                                {(tweetData.likedTweets.length !== 0) && (
                                    <a href={"javascript:void(0);"} onClick={onOpenLikesModalWindow}>
                                        <div className={classes.contentItem}>
                                            <b>{tweetData.likedTweets.length}</b>
                                            <Typography component={"span"}>
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
                        <div className={classes.retweetIcon}>
                            <IconButton
                                onClick={handleRetweet}
                                onMouseEnter={() => handleHoverAction?.(HoverActions.RETWEET)}
                                onMouseLeave={handleLeaveAction}
                            >
                                {isTweetRetweeted ? (
                                    <>{RetweetIcon}</>
                                ) : (
                                    <>{RetweetOutlinedIcon}</>
                                )}
                                <HoverAction visible={visibleHoverAction?.visibleRetweetAction}
                                             actionText={isTweetRetweeted ? "Undo Retweet" : "Retweet"}/>
                            </IconButton>
                        </div>
                        <div className={classes.likeIcon}>
                            <IconButton
                                onClick={handleLike}
                                onMouseEnter={() => handleHoverAction?.(HoverActions.LIKE)}
                                onMouseLeave={handleLeaveAction}
                            >
                                {isTweetLiked ? (
                                    <>{LikeIcon}</>
                                ) : (
                                    <>{LikeOutlinedIcon}</>
                                )}
                                <HoverAction visible={visibleHoverAction?.visibleLikeAction}
                                             actionText={isTweetLiked ? "Unlike" : "Like"}/>
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
                                    <Typography component={"div"} className={classes.replyInfoTitle}>
                                        Who can reply?
                                    </Typography>
                                    <Typography component={"div"} className={classes.replyInfoText}>
                                        People @{tweetData.user.fullName}
                                        {(tweetData.replyType === ReplyType.FOLLOW) ? (" follows or ") : (" ")}
                                        mentioned can reply
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    )}
                    {((tweetData.replyType !== ReplyType.FOLLOW) && (tweetData.replyType !== ReplyType.MENTION) ||
                        (myProfile?.id === tweetData?.user.id) || (isFollower && tweetData.replyType === ReplyType.FOLLOW)
                    ) ? (
                        <>
                            <Typography className={classes.replyWrapper}>
                                {"Replying to "}
                                <Link to={`/user/${tweetData.user.id}`}>
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
                        users={(modalWindowTitle === "Liked by") ? tweetData.likedTweets : tweetData.retweets}
                        title={(modalWindowTitle === "Liked by") ? "Liked by" : "Retweeted by"}
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
                {tweetData.replies.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)}
            </div>
        );
    } else if (tweetData === undefined && isError) {
        return (
            <Typography component={"div"} className={classes.error}>
                Hmm...this page doesn’t exist. <br/>
                Try searching for something else.
            </Typography>
        );
    } else {
        return null;
    }
};

export default compose(withHoverUser, withHoverAction)(FullTweet) as ComponentType<HoverUserProps & FullTweetProps>;
