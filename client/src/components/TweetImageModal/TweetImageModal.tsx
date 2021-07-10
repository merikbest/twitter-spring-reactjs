import React, {FC, ReactElement, useEffect} from 'react';
import {Avatar, Divider, IconButton, makeStyles, Menu, MenuItem, Paper, Theme} from '@material-ui/core';
import classNames from "classnames";
import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {formatDate} from "../../util/formatDate";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {Link, useParams} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import format from "date-fns/format";
import ruLang from "date-fns/locale/ru";
import {useDispatch, useSelector} from "react-redux";
import {selectTweetData} from "../../store/ducks/tweet/selectors";
import {selectUserData} from "../../store/ducks/user/selectors";
import {fetchTweetData, setTweetData} from "../../store/ducks/tweet/actionCreators";
import {User} from "../../store/ducks/user/contracts/state";
import CommentIcon from "@material-ui/icons/ModeCommentOutlined";
import RepostIcon from "@material-ui/icons/RepeatOutlined";
import green from "@material-ui/core/colors/green";
import LikeIcon from "@material-ui/icons/Favorite";
import pink from "@material-ui/core/colors/pink";
import LikeIconOutlined from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/ReplyOutlined";
import {AddTweetForm} from "../AddTweetForm/AddTweetForm";

interface TweetImageModalProps {
    tweetId: string;
    text: string;
    likes: User[];
    retweets: User[];
    replies: any;
    dateTime: string;
    user: User;
    visible?: boolean;
    onClose: (event: any) => void;
}

export const useTweetImageStyles = makeStyles((theme: Theme) => ({
    backdrop: {
        zIndex: 2,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        cursor: "auto",
    },
    backdropImg: {
        position: "absolute",
        top: "50%",
        left: "40%",
        transform: "translate(-50%, -50%)",
        maxWidth: "80%",
        maxHeight: "80%",
    },
}));

const TweetImageModal: FC<TweetImageModalProps> = ({
                                                       tweetId,
                                                       text,
                                                       likes,
                                                       retweets,
                                                       replies,
                                                       dateTime,
                                                       user,
                                                       visible,
                                                       onClose
                                                   }) => {
    const dispatch = useDispatch();
    const tweetImageClasses = useTweetImageStyles();
    const tweetHomeClasses = useHomeStyles();
    const tweetData = useSelector(selectTweetData);
    const myProfile = useSelector(selectUserData);
    const isTweetLiked = tweetData?.likes.find((user) => user.id === myProfile?.user.id);
    const isTweetRetweeted = tweetData?.retweets.find((user) => user.id === myProfile?.user?.id);

    // useEffect(() => {
    //     // if (params.id) {
    //     console.log(tweetId)
    //     // dispatch(fetchTweetData(tweetId));
    //     // }
    //     // return () => {
    //     //     dispatch(setTweetData(undefined));
    //     // };
    // }, []);

    if (!visible) {
        return null;
    }
    // {/*<img src="https://wallpaperaccess.com/full/212648.jpg"*/}
    return (
        <div>
            <div className={tweetImageClasses.backdrop} onClick={onClose}>
                <div style={{backgroundColor: "white", width: 332, height: "100%", float: 'right',}}>
                    <img className={tweetImageClasses.backdropImg} alt="123"
                         src="https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png"/>
                    <div style={{display: 'flex', alignItems: 'center',}}>
                        <Avatar
                            style={{margin: "12px 12px 16px 16px"}}
                            className={tweetHomeClasses.tweetAvatar}
                            alt={`avatar ${user.id}`}
                            src={user.avatar?.src ? user.avatar?.src :
                                "https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png"}/>
                        <Typography>
                            <b>{user.fullName}</b>&nbsp;
                            <div>
                                <span style={{color: grey[500],}}>@{user.username}</span>&nbsp;
                            </div>
                        </Typography>
                    </div>
                    <Typography className={tweetHomeClasses.fullTweetText} gutterBottom>
                        {text}
                    </Typography>
                    <Typography style={{marginBottom: 16}}>
                        <span className={tweetHomeClasses.tweetUserName}>
                            {format(new Date(dateTime), 'H:mm', {locale: ruLang})} ·
                        </span>
                        <span className={tweetHomeClasses.tweetUserName}>
                            {format(new Date(dateTime), 'dd MMM. yyyy')}
                        </span>
                    </Typography>
                    <Divider/>
                    {retweets.length !== 0 || likes.length !== 0 ? (
                        <div className={tweetHomeClasses.fullTweetInfo}>
                            {retweets.length !== 0 ? (
                                // <a href={"javascript:void(0);"} onClick={onOpenRetweetsModalWindow}>
                                <a href={"javascript:void(0);"} >
                                    <span style={{marginRight: 20}}>
                                        <b>{retweets.length}</b>
                                        <span style={{marginLeft: 5, color: "rgb(83, 100, 113)"}}>
                                            Retweets
                                        </span>
                                    </span>
                                </a>
                            ) : null}
                            {likes.length !== 0 ? (
                                // <a href={"javascript:void(0);"} onClick={onOpenLikesModalWindow}>
                                <a href={"javascript:void(0);"}>
                                    <span style={{marginRight: 20}}>
                                        <b>{likes.length}</b>
                                        <span style={{marginLeft: 5, color: "rgb(83, 100, 113)"}}>
                                            Likes
                                        </span>
                                    </span>
                                </a>
                            ) : null}
                        </div>
                    ) : null}
                    <div className={classNames(tweetHomeClasses.tweetFooter, tweetHomeClasses.fullTweetFooter)}>
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
                        {/*<IconButton onClick={handleLike}>*/}
                        <IconButton>
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
                        Replying to <Link to={`/user/${user.id}`}
                                          style={{textDecoration: "none", color: "rgb(27, 149, 224)"}}>
                        @{user.username}
                    </Link>
                    </Typography>
                    <AddTweetForm
                        tweetId={tweetId}
                        addressedUsername={user.username}
                        maxRows={15}
                        classes={tweetHomeClasses}
                        title={"Tweet your reply"}
                        buttonName={"Reply"}/>
                    <div className={tweetHomeClasses.addFormBottomLine}/>
                </div>
            </div>
        </div>
    );
};

export default TweetImageModal;
