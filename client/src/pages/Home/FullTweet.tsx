import React, {FC, ReactElement, useEffect} from 'react';
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
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import format from 'date-fns/format';
import ruLang from 'date-fns/locale/ru';
import mediumZoom from "medium-zoom";

import {useHomeStyles} from './HomeStyles';
import {selectIsTweetLoading, selectTweetData} from '../../store/ducks/tweet/selectors';
import {fetchTweetData, setTweetData} from '../../store/ducks/tweet/actionCreators';
import Tweet from "../../components/Tweet/Tweet";
import ImageList from "../../components/ImageList/ImageList";

export const FullTweet: FC = (): ReactElement | null => {
    const classes = useHomeStyles();
    const dispatch = useDispatch();
    const tweetData = useSelector(selectTweetData);
    const isLoading = useSelector(selectIsTweetLoading);
    const params: { id?: string } = useParams();
    const id = params.id;

    useEffect(() => {
        if (id) {
            dispatch(fetchTweetData(id));
        }
        return () => {
            dispatch(setTweetData(undefined));
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (!isLoading) {
            mediumZoom('.tweet-images img');
        }
    }, [isLoading]);

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
                <Paper className={classes.fullTweet}>
                    <div className={classNames(classes.tweetsHeaderUser)}>
                        <Avatar
                            className={classes.tweetAvatar}
                            // alt={`Аватарка пользователя ${tweetData.user.fullName}`}
                            // src={tweetData.user.avatarUrl}
                            alt={`Аватарка пользователя`}
                            src={"https://avatars.githubusercontent.com/u/56604599?v=4"}
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
                            {tweetData.images && <ImageList classes={classes} images={tweetData.images} />}
                        </div>
                    </Typography>
                    <Typography>
                        <span
                            className={classes.tweetUserName}>{format(new Date(tweetData.dateTime), 'H:mm', {locale: ruLang})} · </span>
                        <span
                            className={classes.tweetUserName}>{format(new Date(tweetData.dateTime), 'dd MMM. yyyy г.')}</span>
                    </Typography>
                    <div className={classNames(classes.tweetFooter, classes.fullTweetFooter)}>
                        <IconButton>
                            <CommentIcon style={{fontSize: 25}}/>
                        </IconButton>
                        <IconButton>
                            <RepostIcon style={{fontSize: 25}}/>
                        </IconButton>
                        <IconButton>
                            <LikeIcon style={{fontSize: 25}}/>
                        </IconButton>
                        <IconButton>
                            <ShareIcon style={{fontSize: 25}}/>
                        </IconButton>
                    </div>
                </Paper>
                <Divider/>
                {/*<Tweet*/}
                {/*    id="1"*/}
                {/*    text="Any more to move? You might need to adjust your stretching routines!"*/}
                {/*    dateTime={new Date().toString()}*/}
                {/*    user={{*/}
                {/*        fullName: 'Arlene Andrews',*/}
                {/*        username: 'ArleneAndrews_1',*/}
                {/*        avatar: 'https://avatars.githubusercontent.com/u/56604599?v=4',*/}
                {/*    }}*/}
                {/*    classes={classes}/>*/}
                {/*<Tweet*/}
                {/*    id="1"*/}
                {/*    text="Any more to move? You might need to adjust your stretching routines!"*/}
                {/*    dateTime={new Date().toString()}*/}
                {/*    user={{*/}
                {/*        fullName: 'Arlene Andrews',*/}
                {/*        username: 'ArleneAndrews_1',*/}
                {/*        avatar: 'https://avatars.githubusercontent.com/u/56604599?v=4',*/}
                {/*    }}*/}
                {/*    classes={classes}/>*/}
                {/*<Tweet*/}
                {/*    id="1"*/}
                {/*    text="Any more to move? You might need to adjust your stretching routines!"*/}
                {/*    dateTime={new Date().toString()}*/}
                {/*    user={{*/}
                {/*        fullName: 'Arlene Andrews',*/}
                {/*        username: 'ArleneAndrews_1',*/}
                {/*        avatar: 'https://avatars.githubusercontent.com/u/56604599?v=4',*/}
                {/*    }}*/}
                {/*    classes={classes}/>*/}
            </>
        );
    }
    return null;
};
