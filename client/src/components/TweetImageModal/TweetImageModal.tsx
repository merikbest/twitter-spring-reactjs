import React, {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useParams} from "react-router-dom";
import {Avatar, Divider, IconButton} from '@material-ui/core';
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";
import usLang from "date-fns/locale/en-US/index";
import {compose} from "recompose";

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
import {AddTweetForm} from "../AddTweetForm/AddTweetForm";
import UsersListModal from "../UsersListModal/UsersListModal";
import TweetComponent, {TweetActions} from '../TweetComponent/TweetComponent';
import {fetchLikeTweet, fetchRetweet} from "../../store/ducks/tweets/actionCreators";
import {useTweetImageStyles} from "./TweetImageModalStyles";
import {fetchTweetData} from "../../store/ducks/tweet/actionCreators";
import {selectTweetData} from "../../store/ducks/tweet/selectors";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {textFormatter} from "../../util/textFormatter";
import {HoverProps, withHoverUser} from "../../hoc/withHoverUser";
import {HoverActionProps, withHoverAction} from "../../hoc/withHoverAction";
import {Tweet} from "../../store/ducks/tweets/contracts/state";
import HoverAction from "../HoverAction/HoverAction";
import PopperUserWindow from "../PopperUserWindow/PopperUserWindow";
import ShareTweet from "../ShareTweet/ShareTweet";

const TweetImageModal: FC<HoverProps<Tweet> & HoverActionProps> = (
    {
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper,
        visibleReplyAction,
        visibleRetweetAction,
        visibleLikeAction,
        visibleShareAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement | null => {
    const dispatch = useDispatch();
    const tweetData = useSelector(selectTweetData);
    const myProfile = useSelector(selectUserData);
    const params: { id: string } = useParams();
    const history = useHistory();
    const isTweetLiked = tweetData?.likedTweets.find((like) => like.user.id === myProfile?.id);
    const isTweetRetweeted = tweetData?.retweets.find((retweet) => retweet.user.id === myProfile?.id);
    const [visibleTweetImageModalWindow, setVisibleTweetImageModalWindow] = useState<boolean>(false);
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");
    const classes = useTweetImageStyles({isTweetRetweeted, isTweetLiked});

    useEffect(() => {
        dispatch(fetchTweetData(params.id));
        setVisibleTweetImageModalWindow(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const onCloseImageModalWindow = (event: any): void => {
        if (event.target.classList[0]) {
            if (event.target.classList[0].includes('container')) {
                setVisibleTweetImageModalWindow(false);
                document.body.style.overflow = 'unset';
                history.goBack();
            }
        }
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

    const handleLike = (): void => {
        dispatch(fetchLikeTweet(params.id));
    };

    const handleRetweet = (): void => {
        dispatch(fetchRetweet(params.id));
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
                            <Link to={`/user/${tweetData?.user.id}`} className={classes.link}>
                                <Avatar
                                    className={classes.avatar}
                                    alt={`avatar ${tweetData.user.id}`}
                                    src={tweetData.user.avatar?.src ? tweetData.user.avatar?.src : DEFAULT_PROFILE_IMG}
                                />
                            </Link>
                            <Link to={`/user/${tweetData?.user.id}`} className={classes.link}>
                                <Typography
                                    className={classes.userInfo}
                                    onMouseEnter={handleHoverPopper}
                                    onMouseLeave={handleLeavePopper}
                                >
                                    <b id={"link"}>{tweetData.user.fullName}</b>&nbsp;
                                    <div>
                                        <span className={classes.grey}>@{tweetData.user.username}</span>&nbsp;
                                    </div>
                                    {visiblePopperWindow &&
                                    <PopperUserWindow user={tweetData!.user} isTweetImageModal={true}/>}
                                </Typography>
                            </Link>
                        </div>
                        <Typography className={classes.text} gutterBottom>
                            {textFormatter(tweetData.text)}
                        </Typography>
                        <Typography style={{marginBottom: 16}}>
                            <span className={classes.grey}>
                                {format(new Date(tweetData.dateTime), 'hh:mm a', {locale: usLang})} ·
                            </span>
                            <span className={classes.grey}>
                                {format(new Date(tweetData.dateTime), ' MMM dd, yyyy')} · Twitter Web App
                            </span>
                        </Typography>
                        <Divider/>
                        {(tweetData.retweets.length !== 0 || tweetData.likedTweets.length !== 0) && (
                            <div className={classes.content}>
                                {(tweetData.retweets.length !== 0) && (
                                    <a href={"javascript:void(0);"} onClick={onOpenRetweetsModalWindow}>
                                        <span style={{marginRight: 20}}>
                                            <b>{tweetData.retweets.length}</b>
                                            <span className={classes.contentItem}>
                                                Retweets
                                            </span>
                                        </span>
                                    </a>
                                )}
                                {(tweetData.likedTweets.length !== 0) && (
                                    <a href={"javascript:void(0);"} onClick={onOpenLikesModalWindow}>
                                        <span style={{marginRight: 20}}>
                                            <b>{tweetData.likedTweets.length}</b>
                                            <span className={classes.contentItem}>
                                                Likes
                                            </span>
                                        </span>
                                    </a>
                                )}
                            </div>
                        )}
                        <div className={classes.tweetFooter}>
                            <div className={classes.tweetIcon}>
                                <IconButton
                                    onMouseEnter={() => handleHoverAction?.(TweetActions.REPLY)}
                                    onMouseLeave={handleLeaveAction}
                                >
                                    <>{ReplyIcon}</>
                                    {visibleReplyAction && <HoverAction actionText={"Reply"}/>}
                                </IconButton>
                            </div>
                            <div className={classes.retweetIcon}>
                                <IconButton
                                    onClick={handleRetweet}
                                    onMouseEnter={() => handleHoverAction?.(TweetActions.RETWEET)}
                                    onMouseLeave={handleLeaveAction}
                                >
                                    {isTweetRetweeted ? (
                                        <>{RetweetIcon}</>
                                    ) : (
                                        <>{RetweetOutlinedIcon}</>
                                    )}
                                    {visibleRetweetAction &&
                                    <HoverAction actionText={isTweetRetweeted ? "Undo Retweet" : "Retweet"}/>}
                                </IconButton>
                            </div>
                            <div className={classes.likeIcon}>
                                <IconButton
                                    onClick={handleLike}
                                    onMouseEnter={() => handleHoverAction?.(TweetActions.LIKE)}
                                    onMouseLeave={handleLeaveAction}
                                >
                                    {isTweetLiked ? (
                                        <>{LikeIcon}</>
                                    ) : (
                                        <>{LikeOutlinedIcon}</>
                                    )}
                                    {visibleLikeAction && <HoverAction actionText={isTweetLiked ? "Unlike" : "Like"}/>}
                                </IconButton>
                            </div>
                            <ShareTweet
                                tweetId={tweetData!.id}
                                isFullTweet={false}
                                visibleShareAction={visibleShareAction}
                                handleHoverAction={handleHoverAction}
                                handleLeaveAction={handleLeaveAction}
                            />
                        </div>
                        <Divider/>
                        <Typography className={classes.replyWrapper}>
                            Replying to <Link to={`/user/${tweetData.user.id}`}>@{tweetData.user.username}</Link>
                        </Typography>
                        <AddTweetForm
                            tweetId={params.id}
                            addressedUsername={tweetData.user.username}
                            maxRows={15}
                            title={"Tweet your reply"}
                            buttonName={"Reply"}/>
                    </div>
                    <div className={classes.divider}/>
                    {(visibleModalWindow && modalWindowTitle === "Liked by") ? (
                        <UsersListModal
                            users={tweetData.likedTweets}
                            title={modalWindowTitle}
                            visible={visibleModalWindow}
                            onClose={onCloseModalWindow}/>
                    ) : (
                        <UsersListModal
                            users={tweetData.retweets}
                            title={modalWindowTitle}
                            visible={visibleModalWindow}
                            onClose={onCloseModalWindow}/>
                    )}
                    {tweetData.replies.map((tweet: any) =>
                        <TweetComponent
                            key={tweet.id}
                            images={tweet.images}
                            addressedUser={tweetData.user.username}
                            addressedId={tweetData.user.id}
                            {...tweet} />)
                    }
                </div>
                <div className={classes.imageFooterContainer}>
                    <div className={classNames(classes.imageFooterWrapper)}>
                        <div className={classes.imageFooterIcon}>
                            <IconButton>
                                <>{ReplyIcon}</>
                            </IconButton>
                            {(tweetData.replies?.length === 0 || tweetData.replies === null) ? null : (
                                <span>{tweetData.replies?.length}</span>
                            )}
                        </div>
                        <div className={classes.imageFooterIcon}>
                            <IconButton onClick={handleRetweet}>
                                {isTweetRetweeted ? (
                                    <>{RetweetIcon}</>
                                ) : (
                                    <>{RetweetOutlinedIcon}</>
                                )}
                            </IconButton>
                            {(tweetData.retweets.length === 0 || tweetData.retweets === null) ? null : (
                                isTweetRetweeted ? (
                                    <span>{tweetData.retweets.length}</span>
                                ) : (
                                    <span>{tweetData.retweets.length}</span>)
                            )}
                        </div>
                        <div className={classes.imageFooterIcon}>
                            <IconButton onClick={handleLike}>
                                {isTweetLiked ? (
                                    <>{LikeIcon}</>
                                ) : (
                                    <>{LikeOutlinedIcon}</>
                                )}
                            </IconButton>
                            {(tweetData.likedTweets.length === 0 || tweetData.likedTweets === null) ? null : (
                                isTweetLiked && (
                                    <span>{tweetData.likedTweets.length}</span>
                                )
                            )}
                        </div>
                        <div className={classes.imageFooterIcon}>
                            <IconButton>
                                <>{ShareIcon}</>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className={classes.imageModalClose}>
                    <IconButton>
                        {CloseIcon}
                    </IconButton>
                </div>
            </div>
        );
    }
    return null;
};

export default compose(withHoverUser, withHoverAction)(TweetImageModal) as ComponentType<HoverProps<Tweet> & HoverActionProps>;
