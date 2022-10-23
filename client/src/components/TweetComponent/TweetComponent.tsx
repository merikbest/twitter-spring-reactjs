import React, {ComponentType, FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useLocation} from 'react-router-dom';
import {Avatar, IconButton, Link as MuiLink, Paper, Typography} from '@material-ui/core';
import {compose} from "recompose";

import {AnalyticsIcon, FollowReplyIcon, LikeIcon, LikeOutlinedIcon, LockIcon, ReplyIcon} from "../../icons";
import {useTweetComponentStyles} from "./TweetComponentStyles";
import {formatDate} from '../../util/formatDate';
import {likeTweet, retweet} from "../../store/ducks/tweets/actionCreators";
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
import YouTubeVideo from "../YouTubeVideo/YouTubeVideo";
import LargeLinkPreview from "../LargeLinkPreview/LargeLinkPreview";
import SmallLinkPreview from "../SmallLinkPreview/SmallLinkPreview";
import HoverAction from "../HoverAction/HoverAction";
import {HoverActionProps, HoverActions, withHoverAction} from "../../hoc/withHoverAction";
import TweetAnalyticsModal from "../TweetAnalyticsModal/TweetAnalyticsModal";
import {HoverUserProps, withHoverUser} from "../../hoc/withHoverUser";
import {useGlobalStyles} from "../../util/globalClasses";
import TweetActionResult, {TweetActionResults} from "../TweetActionResult/TweetActionResult";
import {TweetResponse} from "../../store/types/tweet";
import {HOME_TWEET, MODAL, PROFILE} from "../../util/pathConstants";
import {LinkCoverSize, ReplyType} from "../../store/types/common";
import TweetDeleted from "../TweetDeleted/TweetDeleted";

export interface TweetComponentProps<T> {
    item?: T;
    activeTab?: number;
    userProfileId?: number;
    isTweetImageModal?: boolean;
}

const TweetComponent: FC<HoverUserProps & TweetComponentProps<TweetResponse> & HoverActionProps> = (
    {
        item: tweet,
        activeTab,
        isTweetImageModal,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper,
        visibleHoverAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const history = useHistory();
    const location = useLocation();
    const [visibleReplyModalWindow, setVisibleReplyModalWindow] = useState<boolean>(false);
    const [visibleAnalyticsModalWindow, setVisibleAnalyticsModalWindow] = useState<boolean>(false);
    const [openYouTubeVideo, setOpenYouTubeVideo] = useState<boolean>(false);

    const isTweetRetweetedByUser = tweet?.retweetsUserIds?.findIndex((id) => id === userProfile?.id) !== -1;
    const isUserCanReply = (tweet?.replyType === ReplyType.MENTION) && (myProfile?.id !== tweet?.user.id);
    const isYouTubeLink = tweet?.link && tweet?.link.includes("youtu");
    const isModal = location.pathname.includes(MODAL);
    const classes = useTweetComponentStyles({
        isTweetImageModal: isTweetImageModal,
        isTweetLiked: tweet!.isTweetLiked,
        isUserCanReply: isUserCanReply
    });
    const image = tweet?.images?.[0];

    const handleClickTweet = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`${HOME_TWEET}/${tweet?.id}`);
    };

    const handleClickUser = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.stopPropagation();
        history.push(`${PROFILE}/${tweet?.user.id}`);
    };

    const onOpenReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(true);
    };

    const onCloseReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(false);
    };

    const onOpenTweetAnalyticsModalWindow = (): void => {
        setVisibleAnalyticsModalWindow(true);
    };

    const onCloseTweetAnalyticsModalWindow = (): void => {
        setVisibleAnalyticsModalWindow(false);
    };

    const handleLike = (): void => {
        dispatch(likeTweet(tweet!.id));
    };

    const handleRetweet = (): void => {
        if (tweet?.user.id !== myProfile?.id) {
            dispatch(retweet(tweet!.id));
        }
    };

    const onOpenYouTubeVideo = (): void => {
        setOpenYouTubeVideo(true)
    };

    return (
        <Paper className={classes.container} variant="outlined">
            {isTweetRetweetedByUser && userProfile ? (
                <TweetActionResult
                    action={TweetActionResults.RETWEET}
                    text={((myProfile?.id === userProfile?.id) ? ("You") : (userProfile?.fullName)) + " Retweeted"}
                />
            ) : null}
            {((myProfile?.pinnedTweetId === tweet?.id || userProfile?.pinnedTweetId === tweet?.id) && activeTab === 0) && (
                <TweetActionResult action={TweetActionResults.PIN} text={"Pinned Tweet"}/>
            )}
            <div className={classes.tweetWrapper}>
                <a onClick={handleClickUser}>
                    <Avatar
                        className={globalClasses.avatar}
                        alt={`avatar ${tweet?.user.id}`}
                        src={tweet?.user.avatar?.src ? tweet?.user.avatar?.src : DEFAULT_PROFILE_IMG}
                    />
                </a>
                <div className={classes.tweetContainer}>
                    <div className={classes.header}>
                        <a
                            onClick={handleClickUser}
                            onMouseEnter={() => handleHoverPopper!(tweet?.user.id!)}
                            onMouseLeave={handleLeavePopper}
                        >
                            <Typography variant={"h6"} component={"span"}>
                                {tweet?.user.fullName}
                            </Typography>
                            {tweet?.user.isPrivateProfile && (
                                <span className={classes.lockIcon}>
                                    {LockIcon}
                                </span>
                            )}&nbsp;
                            <Typography variant={"subtitle1"} component={"span"}>
                                @{tweet?.user.username}{" · "}
                            </Typography>
                            <Typography variant={"subtitle1"} component={"span"}>
                                {formatDate(new Date(tweet!.dateTime))}
                            </Typography>
                            <PopperUserWindow visible={visiblePopperWindow} isTweetComponent={true}/>
                        </a>
                        <TweetComponentActions
                            tweetId={tweet!.id}
                            tweetText={tweet!.text}
                            tweetReplyType={tweet!.replyType}
                            addressedTweetId={tweet!.addressedTweetId}
                            tweetUserId={tweet!.user.id}
                            tweetUserFullName={tweet!.user.fullName}
                            tweetUserUsername={tweet!.user.username}
                            tweetUserIsFollower={tweet!.user.isFollower}
                            tweetUserIsUserMuted={tweet!.user.isUserMuted}
                            tweetUserIsUserBlocked={tweet!.user.isUserBlocked}
                            tweetUserIsMyProfileBlocked={tweet!.user.isMyProfileBlocked}
                            isFullTweet={false}
                            onOpenTweetAnalytics={onOpenTweetAnalyticsModalWindow}
                        />
                    </div>
                    <div className={classes.tweetContent}>
                        {tweet?.addressedUsername && (
                            <object>
                                <Typography variant={"subtitle1"} component={"div"}>
                                    {"Replying to "}
                                    <MuiLink variant="subtitle1" to={`${PROFILE}/${tweet?.addressedId}`} component={Link}>
                                        @{tweet?.addressedUsername}
                                    </MuiLink>
                                </Typography>
                            </object>
                        )}
                        <Typography variant={"body1"} className={classes.text}>
                            <a id={"handleClickTweet"} onClick={handleClickTweet} href={`${HOME_TWEET}/${tweet?.id}`}>
                                {textFormatter(tweet!.text)}
                            </a>
                        </Typography>
                        {(tweet?.images?.length !== 0) && (
                            <Link to={{pathname: `${MODAL}/${tweet?.id}`, state: {background: location}}}>
                                <div id={"tweetImage"} className={classes.image}>
                                    <img className={isModal ? "small" : ""} src={image?.src} alt={image?.src}/>
                                </div>
                            </Link>
                        )}
                        {tweet?.poll && <VoteComponent tweetId={tweet?.id} poll={tweet?.poll}/>}
                        {(tweet?.user.isFollower && tweet?.replyType === ReplyType.FOLLOW) && (
                            <>
                                <div className={classes.iconWrapper}>
                                    <div className={classes.iconCircle}>
                                        <span className={classes.icon}>
                                            {FollowReplyIcon}
                                        </span>
                                    </div>
                                </div>
                                <Typography variant={"subtitle2"} component={"span"}>
                                    You can reply to this conversation
                                </Typography>
                            </>
                        )}
                        {tweet?.quoteTweet && (
                            tweet?.quoteTweet.isDeleted ? (
                                <TweetDeleted/>
                            ) : (
                                <Quote quoteTweet={tweet?.quoteTweet} isTweetQuoted={true}/>
                            ))
                        }
                        {tweet?.link ? (
                            isYouTubeLink ? (
                                openYouTubeVideo ? (
                                    <YouTubeVideo
                                        link={tweet.link}
                                        linkTitle={tweet.linkTitle}
                                        linkDescription={tweet.linkDescription}
                                    />
                                ) : (
                                    <SmallLinkPreview
                                        link={tweet.link}
                                        linkTitle={tweet.linkTitle}
                                        linkDescription={tweet.linkDescription}
                                        linkCover={tweet.linkCover}
                                        onOpenYouTubeVideo={onOpenYouTubeVideo}
                                    />
                                )
                            ) : (
                                (tweet?.linkCoverSize === LinkCoverSize.LARGE) ? (
                                    <LargeLinkPreview
                                        link={tweet.link}
                                        linkTitle={tweet.linkTitle}
                                        linkDescription={tweet.linkDescription}
                                        linkCover={tweet.linkCover}
                                    />
                                ) : (
                                    <SmallLinkPreview
                                        link={tweet.link}
                                        linkTitle={tweet.linkTitle}
                                        linkDescription={tweet.linkDescription}
                                        linkCover={tweet.linkCover}
                                    />
                                )
                            )
                        ) : null}
                    </div>
                    <div className={classes.footer}>
                        <div className={classes.replyIcon}>
                            <IconButton
                                disabled={isUserCanReply}
                                onClick={onOpenReplyModalWindow}
                                onMouseEnter={() => handleHoverAction?.(HoverActions.REPLY)}
                                onMouseLeave={handleLeaveAction}
                                size="small"
                            >
                                <>{ReplyIcon}</>
                                <HoverAction visible={visibleHoverAction?.visibleReplyAction} actionText={"Reply"}/>
                            </IconButton>
                            {(tweet?.repliesCount !== 0) && (<span id={"repliesCount"}>{tweet?.repliesCount}</span>)}
                        </div>
                        <QuoteTweet
                            quoteTweet={tweet!}
                            retweetsCount={tweet!.retweetsCount}
                            isTweetRetweetedByMe={tweet?.isTweetRetweeted!}
                            handleRetweet={handleRetweet}
                            visibleRetweetAction={visibleHoverAction?.visibleRetweetAction}
                            handleHoverAction={handleHoverAction}
                            handleLeaveAction={handleLeaveAction}
                        />
                        <div className={classes.likeIcon}>
                            <IconButton
                                onClick={handleLike}
                                onMouseEnter={() => handleHoverAction?.(HoverActions.LIKE)}
                                onMouseLeave={handleLeaveAction}
                                size="small"
                            >
                                {tweet?.isTweetLiked ? (
                                    <>{LikeIcon}</>
                                ) : (
                                    <>{LikeOutlinedIcon}</>
                                )}
                                <HoverAction
                                    visible={visibleHoverAction?.visibleLikeAction}
                                    actionText={tweet?.isTweetLiked ? "Unlike" : "Like"}
                                />
                            </IconButton>
                            {(tweet?.likedTweetsCount !== 0) && (<span id={"likedTweetsCount"}>{tweet?.likedTweetsCount}</span>)}
                        </div>
                        <ShareTweet
                            tweetId={tweet!.id}
                            isTweetBookmarked={tweet!.isTweetBookmarked}
                            isFullTweet={false}
                        />
                        {(myProfile?.id === tweet?.user.id) && (
                            <div id={"analytics"} className={classes.replyIcon}>
                                <IconButton
                                    onClick={onOpenTweetAnalyticsModalWindow}
                                    onMouseEnter={() => handleHoverAction?.(HoverActions.ANALYTICS)}
                                    onMouseLeave={handleLeaveAction}
                                    size="small"
                                >
                                    <>{AnalyticsIcon}</>
                                    <HoverAction visible={visibleHoverAction?.visibleAnalyticsAction}
                                                 actionText={"Analytics"}/>
                                </IconButton>
                            </div>
                        )}
                    </div>
                </div>
                <ReplyModal
                    user={tweet!.user}
                    tweetId={tweet!.id}
                    text={tweet!.text}
                    image={image}
                    dateTime={tweet!.dateTime}
                    visible={visibleReplyModalWindow}
                    onClose={onCloseReplyModalWindow}
                />
                <TweetAnalyticsModal
                    fullName={tweet!.user.fullName}
                    username={tweet!.user.username}
                    text={tweet!.text}
                    visible={visibleAnalyticsModalWindow}
                    onClose={onCloseTweetAnalyticsModalWindow}
                />
            </div>
        </Paper>
    );
};

export default compose(withHoverUser, withHoverAction)(TweetComponent) as ComponentType<HoverUserProps & TweetComponentProps<TweetResponse> & HoverActionProps>;
