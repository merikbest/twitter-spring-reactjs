import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';
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
import {fetchLikeTweet} from "../../store/ducks/tweets/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import UsersListModal from "../../components/UsersListModal/UsersListModal";
import {AddTweetForm} from "../../components/AddTweetForm/AddTweetForm";
import {useHomeStyles} from './HomeStyles';
import Tweet from "../../components/Tweet/Tweet";

export const FullTweet: FC = (): ReactElement | null => {
    const classes = useHomeStyles();
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
            <div className={classes.tweetsCentred}>
                <CircularProgress/>
            </div>
        );
    }

    if (tweetData) {
        return (
            <>
                {isTweetRetweeted ?
                    <div className={classes.fullTweetRetweetWrapper}>
                        <RepostIcon style={{fontSize: 16}}/>
                        <Typography>
                            You Retweeted
                        </Typography>
                    </div> : null}
                <Paper className={classes.fullTweet}>
                    <div className={classNames(classes.tweetsHeaderUser)}>
                        <Avatar
                            className={classes.tweetAvatar}
                            alt={`avatar ${tweetData.user.id}`}
                            src={tweetData.user.avatar?.src ? tweetData.user.avatar?.src :
                                "https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png"}
                        />
                        <Typography>
                            <Link to={`/user/${tweetData.user.id}`}>
                                <b>{tweetData.user.fullName}</b>&nbsp;
                            </Link>
                            <div>
                                <span className={classes.tweetUserName}>@{tweetData.user.username}</span>&nbsp;
                            </div>
                        </Typography>
                    </div>
                    <Typography className={classes.fullTweetText} gutterBottom>
                        {tweetData.text}
                        <div className="tweet-images">
                            {tweetData.images && <ImageList classes={classes} images={tweetData.images}/>}
                        </div>
                    </Typography>
                    <Typography style={{marginBottom: 16}}>
                        <span className={classes.tweetUserName}>
                            {format(new Date(tweetData.dateTime), 'H:mm', {locale: ruLang})} ·
                        </span>
                        <span className={classes.tweetUserName}>
                            {format(new Date(tweetData.dateTime), 'dd MMM. yyyy')}
                        </span>
                    </Typography>
                    <Divider/>
                    {tweetData.retweets.length !== 0 || tweetData.likes.length !== 0 ? (
                        <div className={classes.fullTweetInfo}>
                            {tweetData.retweets.length !== 0 ? (
                                <a href={"javascript:void(0);"} onClick={onOpenRetweetsModalWindow}>
                                    <span style={{marginRight: 20}}>
                                        <b>{tweetData.retweets.length}</b>
                                        <span style={{marginLeft: 5, color: "rgb(83, 100, 113)"}}>
                                            Retweets
                                        </span>
                                    </span>
                                </a>
                            ) : null}
                            {tweetData.likes.length !== 0 ? (
                                <a href={"javascript:void(0);"} onClick={onOpenLikesModalWindow}>
                                    <span style={{marginRight: 20}}>
                                        <b>{tweetData.likes.length}</b>
                                        <span style={{marginLeft: 5, color: "rgb(83, 100, 113)"}}>
                                            Likes
                                        </span>
                                    </span>
                                </a>
                            ) : null}
                        </div>
                    ) : null}
                    <div className={classNames(classes.tweetFooter, classes.fullTweetFooter)}>
                        <IconButton>
                            <CommentIcon style={{fontSize: 25}}/>
                        </IconButton>
                        <IconButton>
                            {isTweetRetweeted ? (
                                <RepostIcon style={{fontSize: 25, color: green[500]}}/>
                            ) : (
                                <RepostIcon style={{fontSize: 25}}/>
                            )}
                        </IconButton>
                        <IconButton onClick={handleLike}>
                            {isTweetLiked ? (
                                <LikeIcon style={{fontSize: 25, color: pink[500]}}/>
                            ) : (
                                <LikeIconOutlined style={{fontSize: 25}}/>
                            )}
                        </IconButton>
                        <IconButton>
                            <ShareIcon style={{fontSize: 25}}/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <Typography style={{margin: "16px 60px", color: "rgb(83, 100, 113)", fontSize: 15}}>
                        Replying to <Link to={`/user/${tweetData.user.id}`}
                                          style={{textDecoration: "none", color: "rgb(27, 149, 224)"}}>
                        @{tweetData.user.username}
                    </Link>
                    </Typography>
                    <AddTweetForm
                        tweetId={tweetData?.id}
                        addressedUsername={tweetData.user.username}
                        maxRows={15}
                        classes={classes}
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
                <div className={classes.addFormBottomLine}/>
                {tweetData.replies.map((tweet) =>
                    <Tweet
                        key={tweet.id}
                        classes={classes}
                        images={tweet.images}
                        addressedUser={tweetData.user.username}
                        addressedId={tweetData.user.id}
                        {...tweet} />)}
            </>
        );
    }
    return null;
};
