import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import {Avatar, Divider, IconButton} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import ShareIcon from "@material-ui/icons/ReplyOutlined";
import RepostIcon from "@material-ui/icons/RepeatOutlined";
import CommentIcon from "@material-ui/icons/ModeCommentOutlined";
import LikeIcon from '@material-ui/icons/Favorite';
import LikeIconOutlined from "@material-ui/icons/FavoriteBorderOutlined";
import format from 'date-fns/format';
import ruLang from 'date-fns/locale/ru';
import mediumZoom from "medium-zoom";
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';

import {selectIsTweetLoading, selectTweetData} from '../../store/ducks/tweet/selectors';
import {fetchTweetData, setTweetData} from '../../store/ducks/tweet/actionCreators';
import ImageList from "../../components/ImageList/ImageList";
import {fetchLikeTweet, fetchRetweet} from "../../store/ducks/tweets/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import UsersListModal from "../../components/UsersListModal/UsersListModal";
import {AddTweetForm} from "../../components/AddTweetForm/AddTweetForm";
import Tweet from "../../components/Tweet/Tweet";
import {useFullTweetStyles} from "./FullTweetStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";

export const FullTweet: FC = (): ReactElement | null => {
    const classes2 = useFullTweetStyles();
    const dispatch = useDispatch();
    const tweetData = useSelector(selectTweetData);
    const myProfile = useSelector(selectUserData);
    const isLoading = useSelector(selectIsTweetLoading);
    const params: { id: string } = useParams();
    const isTweetLiked = tweetData?.likes.find((user) => user.id === myProfile?.user.id);
    const isTweetRetweeted = tweetData?.retweets.find((user) => user.id === myProfile?.user?.id);
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");

    useEffect(() => {
        if (params.id) {
            dispatch(fetchTweetData(params.id));
        }
        return () => {
            dispatch(setTweetData(undefined));
        };
    }, [dispatch, params.id]);

    useEffect(() => {
        if (!isLoading) {
            mediumZoom('.tweet-images img');
        }
    }, [isLoading]);

    const handleLike = (): void => {
        dispatch(fetchLikeTweet(params.id));
    };

    const handleRetweet = (): void => {
        dispatch(fetchRetweet(params.id));
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

    if (isLoading) {
        return (
            <div className={classes2.loading}>
                <CircularProgress/>
            </div>
        );
    }

    if (tweetData) {
        return (
            <div style={{paddingTop: 48}}>
                {isTweetRetweeted ?
                    <div className={classes2.retweetWrapper}>
                        <RepostIcon style={{fontSize: 16}}/>
                        <Typography>
                            You Retweeted
                        </Typography>
                    </div> : null}
                <Paper className={classes2.container}>
                    <div className={classes2.header}>
                        <Avatar
                            className={classes2.avatar}
                            alt={`avatar ${tweetData.user.id}`}
                            src={tweetData.user.avatar?.src ? tweetData.user.avatar?.src : DEFAULT_PROFILE_IMG}
                        />
                        <Typography>
                            <Link to={`/user/${tweetData.user.id}`}>
                                <b>{tweetData.user.fullName}</b>&nbsp;
                            </Link>
                            <div>
                                <span className={classes2.username}>@{tweetData.user.username}</span>&nbsp;
                            </div>
                        </Typography>
                    </div>
                    <Typography className={classes2.textWrapper} gutterBottom>
                        <div dangerouslySetInnerHTML={{__html: tweetData.text}}></div>
                        <div>
                            {tweetData.images && <ImageList images={tweetData.images}/>}
                        </div>
                    </Typography>
                    <Typography style={{marginBottom: 16}}>
                        <span className={classes2.date}>
                            {format(new Date(tweetData.dateTime), 'H:mm', {locale: ruLang})} ·
                        </span>
                        <span className={classes2.date}>
                            {format(new Date(tweetData.dateTime), 'dd MMM. yyyy')}
                        </span>
                    </Typography>
                    <Divider/>
                    {(tweetData.retweets.length !== 0 || tweetData.likes.length !== 0) && (
                        <div className={classes2.content}>
                            {(tweetData.retweets.length !== 0) && (
                                <a href={"javascript:void(0);"} onClick={onOpenRetweetsModalWindow}>
                                    <span style={{marginRight: 20}}>
                                        <b>{tweetData.retweets.length}</b>
                                        <span className={classes2.contentItem}>
                                            Retweets
                                        </span>
                                    </span>
                                </a>)
                            }
                            {(tweetData.likes.length !== 0) && (
                                <a href={"javascript:void(0);"} onClick={onOpenLikesModalWindow}>
                                    <span style={{marginRight: 20}}>
                                        <b>{tweetData.likes.length}</b>
                                        <span className={classes2.contentItem}>
                                            Likes
                                        </span>
                                    </span>
                                </a>)
                            }
                        </div>)
                    }
                    <div className={classes2.info}>
                        <IconButton>
                            <CommentIcon/>
                        </IconButton>
                        <IconButton onClick={handleRetweet}>
                            {isTweetRetweeted ? (
                                <RepostIcon style={{color: green[500]}}/>
                            ) : (
                                <RepostIcon/>
                            )}
                        </IconButton>
                        <IconButton onClick={handleLike}>
                            {isTweetLiked ? (
                                <LikeIcon style={{color: pink[500]}}/>
                            ) : (
                                <LikeIconOutlined/>
                            )}
                        </IconButton>
                        <IconButton>
                            <ShareIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <Typography className={classes2.replyWrapper}>
                        Replying to <Link to={`/user/${tweetData.user.id}`}>
                        @{tweetData.user.username}
                    </Link>
                    </Typography>
                    <AddTweetForm
                        tweetId={tweetData?.id}
                        addressedUsername={tweetData.user.username}
                        maxRows={15}
                        title={"Tweet your reply"}
                        buttonName={"Reply"}/>
                    {(visibleModalWindow && modalWindowTitle === "Liked by") ? (
                        <UsersListModal
                            users={tweetData.likes}
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
                </Paper>
                <div className={classes2.divider}/>
                {tweetData.replies.map((tweet) =>
                    <Tweet
                        key={tweet.id}
                        images={tweet.images}
                        addressedUser={tweetData.user.username}
                        addressedId={tweetData.user.id}
                        {...tweet} />)}
            </div>
        );
    }
    return null;
};
