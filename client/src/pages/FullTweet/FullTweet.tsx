import React, {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {Link, useHistory, useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {Avatar, Divider, IconButton} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import usLang from 'date-fns/locale/en-US/index';
import SockJS from "sockjs-client";
import {CompatClient, Stomp} from "@stomp/stompjs";
import {compose} from "redux";
import classnames from "classnames";

import {
    selectIsRepliesLoading,
    selectIsTweetError, selectIsTweetLiked,
    selectIsTweetLoadedSuccess,
    selectIsTweetLoading, selectLikedTweetsCount,
    selectReplies, selectRetweetsCount,
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
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {WS_URL} from "../../util/endpoints";
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
import TweetActionResult, {TweetActionResults} from "../../components/TweetActionResult/TweetActionResult";
import {MODAL, PROFILE, QUOTES} from "../../util/pathConstants";
import {LinkCoverSize, ReplyType} from "../../store/types/common";
import TweetDeleted from "../../components/TweetDeleted/TweetDeleted";
import TweetErrorPage from "./TweetErrorPage/TweetErrorPage";
import LikeIconButton from "./LikeIconButton/LikeIconButton";
import RetweetIconButton from "./RetweetIconButton/RetweetIconButton";
import ReplyIconButton from "./ReplyIconButton/ReplyIconButton";
import RetweetsCount from "./RetweetsCount/RetweetsCount";
import QuotesCount from "./QuotesCount/QuotesCount";
import LikesCount from "./LikesCount/LikesCount";
import {RootState} from "../../store/store";
import TweetDateTime from "./TweetDateTime/TweetDateTime";

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
    const classes = useFullTweetStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    // const history = useHistory();
    const tweetData = useSelector(selectTweetData);
    // const fullName = useSelector((state: RootState) => state.tweet.tweet?.user.fullName);
    // const username = useSelector((state: RootState) => state.tweet.tweet?.user.username);
    const likedTweetsCount = useSelector(selectLikedTweetsCount);
    const retweetsCount = useSelector(selectRetweetsCount);



    const replies = useSelector(selectReplies);
    const myProfile = useSelector(selectUserData);
    const isTweetLoading = useSelector(selectIsTweetLoading);
    const isTweetLoadedSuccess = useSelector(selectIsTweetLoadedSuccess);
    const isRepliesLoading = useSelector(selectIsRepliesLoading);
    const isError = useSelector(selectIsTweetError);
    const params = useParams<{ id: string }>();
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [usersListModalAction, setUsersListModalAction] = useState<UsersListModalAction>(UsersListModalAction.LIKED);
    const [openYouTubeVideo, setOpenYouTubeVideo] = useState<boolean>(false);
    const isYouTubeLink = tweetData?.link && tweetData?.link.includes("youtu");
    const image = tweetData?.images?.[0];

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
        if (isTweetLoadedSuccess) {
            dispatch(fetchReplies(parseInt(params.id)));
            document.title = `${tweetData?.user.fullName} on Twitter: "${tweetData?.text}"`;
        }
        return () => {
            dispatch(resetRepliesState());
        };
    }, [isTweetLoadedSuccess]);

    // const handleLike = (): void => {
    //     dispatch(likeTweet(parseInt(params.id)));
    // };

    // const handleRetweet = (): void => {
    //     dispatch(retweet(parseInt(params.id)));
    // };

    // const onClickQuotes = (): void => {
    //     history.push(`${QUOTES}/${params.id}`);
    // };
    
    const onOpenUsersListModal = (modalAction: UsersListModalAction): void => {
        setVisibleModalWindow(true);
        setUsersListModalAction(modalAction);
    };

    const onCloseModalWindow = (): void => {
        setVisibleModalWindow(false);
    };

    const onOpenYouTubeVideo = (): void => {
        setOpenYouTubeVideo(true);
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
                                id={"userInfo"}
                                className={classes.headerUserInfo}
                                onMouseEnter={() => handleHoverPopper!(tweetData.user.id)}
                                onMouseLeave={handleLeavePopper}
                            >
                                <Link to={`${PROFILE}/${tweetData.user.id}`}>
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
                        <TweetComponentActions tweet={tweetData} isFullTweet/>
                    </div>
                    <Typography variant={"h3"} className={classes.textWrapper}>
                        {textFormatter(tweetData.text)}
                        {(tweetData.images?.length !== 0) && (
                            <Link to={{pathname: `${MODAL}/${params.id}`, state: {background: location}}}>
                                <div className={classes.image}>
                                    <img src={image?.src} alt={image?.src}/>
                                </div>
                            </Link>
                        )}
                        {tweetData.poll && <VoteComponent tweetId={tweetData.id} poll={tweetData.poll}/>}
                        {tweetData.quoteTweet && (
                            tweetData.quoteTweet.isDeleted ? (
                                <TweetDeleted/>
                            ) : (
                                <Quote quoteTweet={tweetData.quoteTweet} isTweetQuoted isFullTweet/>
                            ))
                        }
                        {tweetData.link ? (
                            isYouTubeLink ? (
                                openYouTubeVideo ? (
                                    <YouTubeVideo tweet={tweetData}/>
                                ) : (
                                    <SmallLinkPreview
                                        tweet={tweetData}
                                        onOpenYouTubeVideo={onOpenYouTubeVideo}
                                        isFullTweet
                                    />
                                )
                            ) : (
                                (tweetData.linkCoverSize === LinkCoverSize.LARGE) ? (
                                    <LargeLinkPreview tweet={tweetData} isFullTweet/>
                                ) : (
                                    <SmallLinkPreview tweet={tweetData}/>
                                )
                            )
                        ) : null}
                    </Typography>
                    <TweetDateTime/>
                    {(retweetsCount !== 0 || likedTweetsCount !== 0) && (
                        <>
                            <Divider/>
                            <div className={classes.content}>
                                <RetweetsCount/>
                                <QuotesCount/>
                                <LikesCount/>
                            </div>
                        </>
                    )}
                    <div className={classes.info}>
                        <ReplyIconButton/>
                        <RetweetIconButton/>
                        <LikeIconButton/>
                        <ShareTweet tweetId={tweetData.id} isTweetBookmarked={tweetData.isTweetBookmarked} isFullTweet/>
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
                                <Link to={`${PROFILE}/${tweetData.user.id}`}>
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
                </Paper>
                <div className={classes.divider}/>
                {isRepliesLoading ? <Spinner/> : (
                    replies.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)
                )}
            </div>
        );
    } else if (tweetData === undefined && isError) {
        return <TweetErrorPage/>;
    } else {
        return null;
    }
};

export default compose(withHoverUser, withHoverAction)(FullTweet) as ComponentType<HoverUserProps & FullTweetProps>;
