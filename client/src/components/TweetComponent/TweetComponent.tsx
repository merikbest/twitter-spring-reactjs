import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useLocation} from 'react-router-dom';
import {Avatar, IconButton, Paper, Typography} from '@material-ui/core';

import {
    FollowReplyIcon,
    LikeIcon,
    LikeOutlinedIcon,
    PinOutlinedIcon,
    ReplyIcon,
    RetweetOutlinedIconSm
} from "../../icons";
import {useTweetComponentStyles} from "./TweetComponentStyles";
import {formatDate} from '../../util/formatDate';
import {fetchLikeTweet, fetchRetweet} from "../../store/ducks/tweets/actionCreators";
import {ReplyType, Tweet} from "../../store/ducks/tweets/contracts/state";
import {selectUserData} from "../../store/ducks/user/selectors";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import ReplyModal from "../ReplyModal/ReplyModal";
import {textFormatter} from "../../util/textFormatter";
import {selectUserProfile} from "../../store/ducks/userProfile/selectors";
import TweetComponentActions from "../TweetComponentActions/TweetComponentActions";
import ShareTweet from "../ShareTweet/ShareTweet";
import VoteComponent from "../VoteComponent/VoteComponent";
import QuoteTweet from "../QuoteTweet/QuoteTweet";
import Quote from "../Quote/Quote";
import PopperUserWindow from "../PopperUserWindow/PopperUserWindow";
import {withHover} from "../../hoc/withHover";
import YouTubeVideoPreview from "./YouTubeVideoPreview/YouTubeVideoPreview";
import YouTubeVideo from "./YouTubeVideo/YouTubeVideo";
import LinkPreview from "./LinkPreview/LinkPreview";

interface TweetComponentProps<T> {
    item?: T;
    activeTab?: number;
    userProfileId?: number;
    visiblePopperWindow?: boolean;
    handleHover?: () => void;
    handleLeave?: () => void;
}

const TweetComponent: FC<TweetComponentProps<Tweet>> = (
    {
        item: tweet,
        activeTab,
        visiblePopperWindow,
        handleHover,
        handleLeave
    }
): ReactElement => {
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const history = useHistory();
    const location = useLocation();

    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [openYouTubeVideo, setOpenYouTubeVideo] = useState<boolean>(false);

    const isTweetLiked = tweet?.likedTweets.find((like) => like.user.id === myProfile?.id);
    const isTweetRetweetedByMe = tweet?.retweets.find((retweet) => retweet.user.id === myProfile?.id);
    const isTweetRetweetedByUser = tweet?.retweets.find((retweet) => retweet.user.id === userProfile?.id);
    const isFollower = myProfile?.following?.find((follower) => follower.id === tweet?.user?.id);
    const isUserCanReply = (tweet?.replyType === ReplyType.MENTION) && (myProfile?.id !== tweet?.user.id);
    const isYouTubeLink = tweet?.link && tweet?.link.includes("youtu");
    const isModal = location.pathname.includes("/modal");
    const classes = useTweetComponentStyles({isTweetLiked, isUserCanReply});
    const image = tweet?.images?.[0];

    const handleClickTweet = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`/home/tweet/${tweet?.id}`);
    }

    const handleClickUser = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.stopPropagation();
        history.push(`/user/${tweet?.user.id}`);
    }

    const onOpenReplyModalWindow = (): void => {
        setVisibleModalWindow(true);
    };

    const onCloseReplyModalWindow = (): void => {
        setVisibleModalWindow(false);
    };

    const handleLike = (): void => {
        dispatch(fetchLikeTweet(tweet!.id));
    };

    const handleRetweet = (): void => {
        if (tweet?.user.id !== myProfile?.id) {
            dispatch(fetchRetweet(tweet!.id));
        }
    };

    const onOpenYouTubeVideo = (): void => {
        setOpenYouTubeVideo(true)
    };

    return (
        <>
            {isTweetRetweetedByUser && (
                <div className={classes.retweetWrapper}>
                    <span>{RetweetOutlinedIconSm}</span>
                    <Typography>
                        {(myProfile?.id === userProfile?.id) ? ("You") : (userProfile?.fullName)} Retweeted
                    </Typography>
                </div>
            )}
            {((myProfile?.id === userProfile?.id && activeTab === 0) && myProfile?.pinnedTweet?.id === tweet?.id) && (
                <div className={classes.retweetWrapper}>
                    <span>{PinOutlinedIcon}</span>
                    <Typography>
                        Pinned Tweet
                    </Typography>
                </div>
            )}
            <Paper className={classes.container} variant="outlined">
                <a onClick={handleClickUser}>
                    <Avatar
                        className={classes.avatar}
                        alt={`avatar ${tweet?.user.id}`}
                        src={tweet?.user.avatar?.src ? tweet?.user.avatar?.src : DEFAULT_PROFILE_IMG}/>
                </a>
                <div style={{flex: 1}}>
                    <div className={classes.header}>
                        <a onClick={handleClickUser}
                           onMouseEnter={handleHover}
                           onMouseLeave={handleLeave}
                        >
                            <b>{tweet?.user.fullName}</b>&nbsp;
                            <span className={classes.headerText}>@{tweet?.user.username}</span>&nbsp;
                            <span className={classes.headerText}>·</span>&nbsp;
                            <span className={classes.headerText}>{formatDate(new Date(tweet!.dateTime))}</span>
                        </a>
                        <TweetComponentActions
                            tweet={tweet!}
                            isFullTweet={false}
                            activeTab={activeTab}
                        />
                        {visiblePopperWindow && <PopperUserWindow user={tweet!.user} isTweetComponent={true}/>}
                    </div>
                    <Typography
                        style={tweet?.addressedUsername ? {width: 250, marginBottom: 0} : {width: 500, marginBottom: 0}}
                        variant="body1" gutterBottom
                    >
                        {tweet?.addressedUsername && (
                            <object>
                                <Typography className={classes.replyWrapper}>
                                    Replying to <Link to={`/user/${tweet?.addressedId}`} className={classes.replyLink}>
                                    @{tweet?.addressedUsername}
                                </Link>
                                </Typography>
                            </object>
                        )}
                        <div className={classes.text}>
                            <a onClick={handleClickTweet} href={`/home/tweet/${tweet?.id}`}>
                                {textFormatter(tweet!.text)}
                            </a>
                        </div>
                        {(tweet?.images?.length !== 0) && (
                            <Link to={{pathname: `/modal/${tweet?.id}`, state: {background: location}}}>
                                <div className={classes.image}>
                                    <img className={isModal ? "small" : ""} src={image?.src} alt={image?.src}/>
                                </div>
                            </Link>
                        )}
                        {tweet?.poll && <VoteComponent tweetId={tweet?.id} poll={tweet?.poll}/>}
                        {(isFollower && tweet?.replyType === ReplyType.FOLLOW) && (
                            <>
                                <div className={classes.iconWrapper}>
                                    <div className={classes.iconCircle}>
                                        <span className={classes.icon}>
                                            {FollowReplyIcon}
                                        </span>
                                    </div>
                                </div>
                                <div className={classes.replyText}>You can reply to this conversation</div>
                            </>
                        )}
                        {tweet?.quoteTweet && (<Quote quoteTweet={tweet?.quoteTweet} isTweetQuoted={true}/>)}
                        {tweet?.link ? (
                            isYouTubeLink ? (
                                openYouTubeVideo ? (
                                    <YouTubeVideo tweet={tweet!}/>
                                ) : (
                                    <YouTubeVideoPreview tweet={tweet!} onOpenYouTubeVideo={onOpenYouTubeVideo}/>
                                )
                            ) : (
                                <LinkPreview tweet={tweet!}/>
                            )
                        ) : null}
                    </Typography>
                    <div className={classes.footer}>
                        <div className={classes.replyIcon}>
                            <IconButton disabled={isUserCanReply} onClick={onOpenReplyModalWindow}>
                                <>{ReplyIcon}</>
                            </IconButton>
                            {(tweet?.replies?.length === 0 || tweet?.replies === null) ? null : (
                                <span>{tweet?.replies?.length}</span>
                            )}
                        </div>
                        <QuoteTweet
                            quoteTweet={tweet!}
                            retweets={tweet!.retweets}
                            isTweetRetweetedByMe={isTweetRetweetedByMe}
                            handleRetweet={handleRetweet}
                        />
                        <div className={classes.likeIcon}>
                            <IconButton onClick={handleLike}>
                                {isTweetLiked ? (
                                    <>{LikeIcon}</>
                                ) : (
                                    <>{LikeOutlinedIcon}</>
                                )}
                            </IconButton>
                            {(tweet?.likedTweets.length === 0 || tweet?.likedTweets === null) ? null : (
                                isTweetLiked ? (
                                    <span>{tweet?.likedTweets.length}</span>
                                ) : (
                                    <span>{tweet?.likedTweets.length}</span>)
                            )}
                        </div>
                        <ShareTweet
                            tweetId={tweet!.id}
                            isFullTweet={false}
                        />
                    </div>
                </div>
                <div className={classes.bottomLine}/>
                <ReplyModal
                    user={tweet!.user}
                    tweetId={tweet!.id}
                    text={tweet!.text}
                    image={image}
                    dateTime={tweet!.dateTime}
                    visible={visibleModalWindow}
                    onClose={onCloseReplyModalWindow}/>
            </Paper>
        </>
    );
};

export default withHover(TweetComponent);
