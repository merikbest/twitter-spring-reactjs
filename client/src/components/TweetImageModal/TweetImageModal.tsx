import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Avatar, Divider, IconButton} from '@material-ui/core';
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import format from "date-fns/format";
import ruLang from "date-fns/locale/ru";

import {
    LikeOutlinedIcon,
    LikeIcon,
    RetweetIcon,
    RetweetOutlinedIcon,
    ReplyIcon,
    ShareIcon,
    CloseIcon
} from "../../icons";
import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {selectUserData} from "../../store/ducks/user/selectors";
import {User} from "../../store/ducks/user/contracts/state";
import {AddTweetForm} from "../AddTweetForm/AddTweetForm";
import UsersListModal from "../UsersListModal/UsersListModal";
import Tweet from '../Tweet/Tweet';
import {fetchLikeTweet, fetchRetweet} from "../../store/ducks/tweets/actionCreators";
import {useTweetImageStyles} from "./TweetImageModalStyles";

interface TweetImageModalProps {
    tweetId: string;
    tweetImg?: string;
    text: string;
    likes: User[];
    retweets: User[];
    replies: any;
    dateTime: string;
    user: User;
    visible?: boolean;
    onClose: (event: any) => void;
}

const TweetImageModal: FC<TweetImageModalProps> = ({
                                                       tweetId,
                                                       tweetImg,
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
    const myProfile = useSelector(selectUserData);
    const isTweetLiked = likes.find((user) => user.id === myProfile?.user.id);
    const isTweetRetweeted = retweets.find((user) => user.id === myProfile?.user?.id);
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");

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
        dispatch(fetchLikeTweet(tweetId));
    };

    const handleRetweet = (): void => {
        dispatch(fetchRetweet(tweetId));
    };

    if (!visible) {
        return null;
    }

    return (
        <div className={tweetImageClasses.backdrop} onClick={onClose}>
            <div className={tweetImageClasses.tweetImageModalContent}>
                <img className={tweetImageClasses.tweetImageModalImg} alt={tweetImg} src={tweetImg}/>
                <div style={{padding: "0 16px",}}>
                    <div style={{display: 'flex', alignItems: 'center',}}>
                        <Avatar
                            style={{margin: "12px 12px 16px 5px"}}
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
                            {format(new Date(dateTime), 'dd MMM. yyyy')} · Twitter Web App
                        </span>
                    </Typography>
                    <Divider/>
                    {retweets.length !== 0 || likes.length !== 0 ? (
                        <div className={tweetHomeClasses.fullTweetInfo}>
                            {retweets.length !== 0 ? (
                                <a href={"javascript:void(0);"} onClick={onOpenRetweetsModalWindow}>
                                    <span style={{marginRight: 20}}>
                                        <b>{retweets.length}</b>
                                        <span style={{marginLeft: 5, color: "rgb(83, 100, 113)"}}>
                                            Retweets
                                        </span>
                                    </span>
                                </a>
                            ) : null}
                            {likes.length !== 0 ? (
                                <a href={"javascript:void(0);"} onClick={onOpenLikesModalWindow}>
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
                        <div className={tweetHomeClasses.tweetIconSvg}>
                            <IconButton>
                                <span>{ReplyIcon}</span>
                            </IconButton>
                        </div>
                        <div className={tweetHomeClasses.tweetIconSvg}>
                            <IconButton onClick={handleRetweet}>
                                {isTweetRetweeted ? (
                                    <span style={{color: "rgb(23, 191, 99)"}}>{RetweetIcon}</span>
                                ) : (
                                    <span>{RetweetOutlinedIcon}</span>
                                )}
                            </IconButton>
                        </div>
                        <div className={tweetHomeClasses.tweetIconSvg}>
                            <IconButton onClick={handleLike}>
                                {isTweetLiked ? (
                                    <span style={{color: "rgb(224, 36, 94)"}}>{LikeIcon}</span>
                                ) : (
                                    <span>{LikeOutlinedIcon}</span>
                                )}
                            </IconButton>
                        </div>
                        <div className={tweetHomeClasses.tweetIconSvg}>
                            <IconButton>
                                <span>{ShareIcon}</span>
                            </IconButton>
                        </div>
                    </div>
                    <Divider/>
                    <Typography className={tweetHomeClasses.fullTweetReplying}>
                        Replying to <Link to={`/user/${user.id}`}>@{user.username}</Link>
                    </Typography>
                    <AddTweetForm
                        tweetId={tweetId}
                        addressedUsername={user.username}
                        maxRows={15}
                        classes={tweetHomeClasses}
                        title={"Tweet your reply"}
                        buttonName={"Reply"}/>
                </div>
                <div className={tweetHomeClasses.addFormBottomLine}/>
                {(visibleModalWindow && modalWindowTitle === "Liked by") ? (
                    <UsersListModal
                        classes={tweetHomeClasses}
                        users={likes}
                        title={modalWindowTitle}
                        visible={visibleModalWindow}
                        onClose={onCloseModalWindow}/>
                ) : (
                    <UsersListModal
                        classes={tweetHomeClasses}
                        users={retweets}
                        title={modalWindowTitle}
                        visible={visibleModalWindow}
                        onClose={onCloseModalWindow}/>
                )}
                {replies.map((tweet: any) =>
                    <Tweet
                        key={tweet.id}
                        classes={tweetHomeClasses}
                        images={tweet.images}
                        addressedUser={user.username}
                        addressedId={user.id}
                        {...tweet} />)
                }
            </div>
            <div className={tweetImageClasses.tweetImageModalFooterContainer}>
                <div className={classNames(tweetHomeClasses.tweetFooter)}>
                    <div className={tweetHomeClasses.tweetIconSvg}>
                        <IconButton>
                            <span>{ReplyIcon}</span>
                        </IconButton>
                        {replies?.length === 0 || replies === null ? null : (
                            <span style={{color: "#fff"}}>{replies?.length}</span>
                        )}
                    </div>
                    <div className={tweetHomeClasses.tweetIconSvg}>
                        <IconButton onClick={handleRetweet}>
                            {isTweetRetweeted ? (
                                <span>{RetweetIcon}</span>
                            ) : (
                                <span>{RetweetOutlinedIcon}</span>
                            )}
                        </IconButton>
                        {retweets.length === 0 || retweets === null ? null : (
                            isTweetRetweeted ? (
                                <span style={{color: "#fff"}}>{retweets.length}</span>
                            ) : (
                                <span style={{color: "#fff"}}>{retweets.length}</span>)
                        )}
                    </div>
                    <div className={tweetHomeClasses.tweetIconSvg}>
                        <IconButton onClick={handleLike}>
                            {isTweetLiked ? (
                                <span>{LikeIcon}</span>
                            ) : (
                                <span>{LikeOutlinedIcon}</span>
                            )}
                        </IconButton>
                        {likes.length === 0 || likes === null ? null : (
                            isTweetLiked ? (
                                <span style={{color: "#fff"}}>{likes.length}</span>
                            ) : (
                                <span style={{color: "#fff"}}>{likes.length}</span>)
                        )}
                    </div>
                    <div className={tweetHomeClasses.tweetIconSvg}>
                        <IconButton>
                            <span>{ShareIcon}</span>
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className={tweetImageClasses.tweetImageModalClose}>
                <IconButton>
                    {CloseIcon}
                </IconButton>
            </div>
        </div>
    );
};

export default TweetImageModal;
