import React, {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useParams} from "react-router-dom";
import {Avatar, Divider, IconButton} from '@material-ui/core';
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";
import usLang from "date-fns/locale/en-US/index";
import {compose} from "recompose";
import {CompatClient, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import classnames from "classnames";

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
import UsersListModal from "../UsersListModal/UsersListModal";
import TweetComponent from '../TweetComponent/TweetComponent';
import {likeTweet, retweet} from "../../store/ducks/tweets/actionCreators";
import {useTweetImageStyles} from "./TweetImageModalStyles";
import {fetchTweetData, setTweetData} from "../../store/ducks/tweet/actionCreators";
import {selectTweetData} from "../../store/ducks/tweet/selectors";
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
    const myProfile = useSelector(selectUserData);
    const params: { id: string } = useParams();
    const history = useHistory();
    const [visibleTweetImageModalWindow, setVisibleTweetImageModalWindow] = useState<boolean>(false);
    const [visibleUsersListModalWindow, setVisibleUsersListModalWindow] = useState<boolean>(false);
    const [visibleReplyModalWindow, setVisibleReplyModalWindow] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");
    const isUserCanReply = (tweetData?.replyType === ReplyType.MENTION) && (myProfile?.id !== tweetData?.user.id);
    const isTweetLiked = tweetData?.likedTweets.findIndex((like) => like.user.id === myProfile?.id) !== -1;
    const isTweetRetweeted = tweetData?.retweets.findIndex((retweet) => retweet.user.id === myProfile?.id) !== -1;
    const classes = useTweetImageStyles({isUserCanReply, isTweetRetweeted, isTweetLiked});

    useEffect(() => {
        dispatch(fetchTweetData(params.id));
        setVisibleTweetImageModalWindow(true);
        document.body.style.overflow = 'hidden';

        stompClient = Stomp.over(new SockJS(WS_URL));
        stompClient.connect({}, () => {
            stompClient?.subscribe("/topic/tweet/" + params.id, (response) => {
                dispatch(setTweetData(JSON.parse(response.body)));
            });
        });
    }, []);

    const onCloseImageModalWindow = (event: any): void => {
        console.log(event)
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
        document.body.style.overflow = 'unset';
        history.goBack();
    };

    const onOpenLikesModalWindow = (): void => {
        setVisibleUsersListModalWindow(true);
        setModalWindowTitle("Liked by");
    };

    const onOpenRetweetsModalWindow = (): void => {
        setVisibleUsersListModalWindow(true);
        setModalWindowTitle("Retweeted by");
    };

    const onCloseUsersListModalWindow = (): void => {
        setVisibleUsersListModalWindow(false);
        setModalWindowTitle("");
    };

    const onOpenReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(true);
    };

    const onCloseReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(false);
    };

    const handleLike = (): void => {
        dispatch(likeTweet(params.id));
    };

    const handleRetweet = (): void => {
        dispatch(retweet(params.id));
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
                            <Link to={`/user/${tweetData?.user.id}`}>
                                <Avatar
                                    className={classnames(globalClasses.avatar, classes.avatar)}
                                    alt={`avatar ${tweetData.user.id}`}
                                    src={tweetData.user.avatar?.src ? tweetData.user.avatar?.src : DEFAULT_PROFILE_IMG}
                                />
                            </Link>
                            <Link to={`/user/${tweetData?.user.id}`}>
                                <div onMouseEnter={handleHoverPopper} onMouseLeave={handleLeavePopper}>
                                    <Typography variant={"h6"} component={"div"} id={"link"}>
                                        {tweetData.user.fullName}
                                    </Typography>
                                    <Typography variant={"subtitle1"} component={"div"}>
                                        @{tweetData.user.username}
                                    </Typography>
                                    <PopperUserWindow
                                        visible={visiblePopperWindow}
                                        user={tweetData!.user}
                                        isTweetImageModal={true}
                                    />
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
                        {(tweetData.retweets.length !== 0 || tweetData.likedTweets.length !== 0) && (
                            <div className={classes.content}>
                                {(tweetData.retweets.length !== 0) && (
                                    <a href={"javascript:void(0);"} onClick={onOpenRetweetsModalWindow}>
                                        <span style={{marginRight: 20}}>
                                            <Typography variant={"h6"} component={"span"}>
                                                {tweetData.retweets.length}
                                            </Typography>
                                            <Typography variant={"subtitle1"} component={"span"}>
                                                Retweets
                                            </Typography>
                                        </span>
                                    </a>
                                )}
                                {(tweetData.likedTweets.length !== 0) && (
                                    <a href={"javascript:void(0);"} onClick={onOpenLikesModalWindow}>
                                        <span style={{marginRight: 20}}>
                                            <Typography variant={"h6"} component={"span"}>
                                                {tweetData.likedTweets.length}
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
                                    {isTweetRetweeted ? (
                                        <>{RetweetIcon}</>
                                    ) : (
                                        <>{RetweetOutlinedIcon}</>
                                    )}
                                    <HoverAction
                                        visible={visibleHoverAction?.visibleRetweetAction}
                                        actionText={isTweetRetweeted ? "Undo Retweet" : "Retweet"}
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
                                    {isTweetLiked ? (
                                        <>{LikeIcon}</>
                                    ) : (
                                        <>{LikeOutlinedIcon}</>
                                    )}
                                    <HoverAction
                                        visible={visibleHoverAction?.visibleLikeAction}
                                        actionText={isTweetLiked ? "Unlike" : "Like"}
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
                            <Link to={`/user/${tweetData.user.id}`}>
                                @{tweetData.user.username}
                            </Link>
                        </Typography>
                        <AddTweetForm
                            tweetId={params.id}
                            addressedUsername={tweetData.user.username}
                            maxRows={15}
                            title={"Tweet your reply"}
                            buttonName={"Reply"}
                        />
                    </div>
                    <Divider/>
                    <UsersListModal
                        users={(modalWindowTitle === "Liked by") ? tweetData.likedTweets : tweetData.retweets}
                        title={(modalWindowTitle === "Liked by") ? "Liked by" : "Retweeted by"}
                        visible={visibleUsersListModalWindow}
                        onClose={onCloseUsersListModalWindow}
                    />
                    {tweetData.replies.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)}
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
                            {(tweetData.replies?.length === 0 || tweetData.replies === null) ? null : (
                                <Typography variant={"body1"} component={"span"}>
                                    {tweetData.replies?.length}
                                </Typography>
                            )}
                        </div>
                        <div className={classes.imageFooterIcon}>
                            <IconButton onClick={handleRetweet} size="small">
                                {isTweetRetweeted ? (
                                    <>{RetweetIcon}</>
                                ) : (
                                    <>{RetweetOutlinedIcon}</>
                                )}
                            </IconButton>
                            {(tweetData.retweets.length === 0 || tweetData.retweets === null) ? null : (
                                isTweetRetweeted && (
                                    <Typography variant={"body1"} component={"span"}>
                                        {tweetData.retweets.length}
                                    </Typography>
                                )
                            )}
                        </div>
                        <div className={classes.imageFooterIcon}>
                            <IconButton onClick={handleLike} size="small">
                                {isTweetLiked ? (
                                    <>{LikeIcon}</>
                                ) : (
                                    <>{LikeOutlinedIcon}</>
                                )}
                            </IconButton>
                            {(tweetData.likedTweets.length === 0 || tweetData.likedTweets === null) ? null : (
                                isTweetLiked && (
                                    <Typography variant={"body1"} component={"span"}>
                                        {tweetData.likedTweets.length}
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
