import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useParams} from "react-router-dom";
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
import {AddTweetForm} from "../AddTweetForm/AddTweetForm";
import UsersListModal from "../UsersListModal/UsersListModal";
import Tweet from '../Tweet/Tweet';
import {fetchLikeTweet, fetchRetweet} from "../../store/ducks/tweets/actionCreators";
import {useTweetImageStyles} from "./TweetImageModalStyles";
import {fetchTweetData} from "../../store/ducks/tweet/actionCreators";
import {selectTweetData} from "../../store/ducks/tweet/selectors";

const TweetImageModal: FC = (): ReactElement | null => {
    const dispatch = useDispatch();
    const tweetImageClasses = useTweetImageStyles();
    const tweetHomeClasses = useHomeStyles();
    const tweetData = useSelector(selectTweetData);
    const myProfile = useSelector(selectUserData);
    const params: { id: string } = useParams();
    const history = useHistory();
    const isTweetLiked = tweetData?.likes.find((user) => user.id === myProfile?.user.id);
    const isTweetRetweeted = tweetData?.retweets.find((user) => user.id === myProfile?.user?.id);
    const [visibleTweetImageModalWindow, setVisibleTweetImageModalWindow] = useState<boolean>(false);
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");

    useEffect(() => {
        dispatch(fetchTweetData(params.id));
        setVisibleTweetImageModalWindow(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const onCloseImageModalWindow = (event: any): void => {
        if (event.target.classList[0]) {
            if (event.target.classList[0].includes('backdrop')) {
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
            <div className={tweetImageClasses.backdrop} onClick={onCloseImageModalWindow}>
                <div className={tweetImageClasses.tweetImageModalContent}>
                    <img className={tweetImageClasses.tweetImageModalImg}
                         alt={tweetData?.images?.[0]?.src}
                         src={tweetData?.images?.[0]?.src}/>
                    <div style={{padding: "0 16px",}}>
                        <div style={{display: 'flex', alignItems: 'center',}}>
                            <Avatar
                                style={{margin: "12px 12px 16px 5px"}}
                                className={tweetHomeClasses.tweetAvatar}
                                alt={`avatar ${tweetData.user.id}`}
                                src={tweetData.user.avatar?.src ? tweetData.user.avatar?.src :
                                    "https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png"}/>
                            <Typography>
                                <b>{tweetData.user.fullName}</b>&nbsp;
                                <div>
                                    <span style={{color: grey[500],}}>@{tweetData.user.username}</span>&nbsp;
                                </div>
                            </Typography>
                        </div>
                        <Typography className={tweetHomeClasses.fullTweetText} gutterBottom>
                            {tweetData.text}
                        </Typography>
                        <Typography style={{marginBottom: 16}}>
                        <span className={tweetHomeClasses.tweetUserName}>
                            {format(new Date(tweetData.dateTime), 'H:mm', {locale: ruLang})} ·
                        </span>
                            <span className={tweetHomeClasses.tweetUserName}>
                            {format(new Date(tweetData.dateTime), 'dd MMM. yyyy')} · Twitter Web App
                        </span>
                        </Typography>
                        <Divider/>
                        {tweetData.retweets.length !== 0 || tweetData.likes.length !== 0 ? (
                            <div className={tweetHomeClasses.fullTweetInfo}>
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
                            Replying to <Link to={`/user/${tweetData.user.id}`}>@{tweetData.user.username}</Link>
                        </Typography>
                        <AddTweetForm
                            tweetId={params.id}
                            addressedUsername={tweetData.user.username}
                            maxRows={15}
                            classes={tweetHomeClasses}
                            title={"Tweet your reply"}
                            buttonName={"Reply"}/>
                    </div>
                    <div className={tweetHomeClasses.addFormBottomLine}/>
                    {(visibleModalWindow && modalWindowTitle === "Liked by") ? (
                        <UsersListModal
                            classes={tweetHomeClasses}
                            users={tweetData.likes}
                            title={modalWindowTitle}
                            visible={visibleModalWindow}
                            onClose={onCloseModalWindow}/>
                    ) : (
                        <UsersListModal
                            classes={tweetHomeClasses}
                            users={tweetData.retweets}
                            title={modalWindowTitle}
                            visible={visibleModalWindow}
                            onClose={onCloseModalWindow}/>
                    )}
                    {tweetData.replies.map((tweet: any) =>
                        <Tweet
                            key={tweet.id}
                            classes={tweetHomeClasses}
                            images={tweet.images}
                            addressedUser={tweetData.user.username}
                            addressedId={tweetData.user.id}
                            {...tweet} />)
                    }
                </div>
                <div className={tweetImageClasses.tweetImageModalFooterContainer}>
                    <div className={classNames(tweetHomeClasses.tweetFooter)}>
                        <div className={tweetHomeClasses.tweetIconSvg}>
                            <IconButton>
                                <span>{ReplyIcon}</span>
                            </IconButton>
                            {tweetData.replies?.length === 0 || tweetData.replies === null ? null : (
                                <span style={{color: "#fff"}}>{tweetData.replies?.length}</span>
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
                            {tweetData.retweets.length === 0 || tweetData.retweets === null ? null : (
                                isTweetRetweeted ? (
                                    <span style={{color: "#fff"}}>{tweetData.retweets.length}</span>
                                ) : (
                                    <span style={{color: "#fff"}}>{tweetData.retweets.length}</span>)
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
                            {tweetData.likes.length === 0 || tweetData.likes === null ? null : (
                                isTweetLiked ? (
                                    <span style={{color: "#fff"}}>{tweetData.likes.length}</span>
                                ) : (
                                    <span style={{color: "#fff"}}>{tweetData.likes.length}</span>)
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
    }
    return null;
};

export default TweetImageModal;
