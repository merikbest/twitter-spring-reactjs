import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useLocation} from 'react-router-dom';
import {Avatar, IconButton, Paper, Typography} from '@material-ui/core';

import {
    EditIcon,
    LikeIcon,
    LikeOutlinedIcon,
    ReplyIcon,
    RetweetIcon,
    RetweetOutlinedIcon, RetweetOutlinedIconSm,
    ShareIcon
} from "../../icons";
import {useTweetStyles} from "./TweetStyles";
import {formatDate} from '../../util/formatDate';
import {fetchLikeTweet, fetchRetweet} from "../../store/ducks/tweets/actionCreators";
import {Image, Retweet, LikeTweet} from "../../store/ducks/tweets/contracts/state";
import {User} from "../../store/ducks/user/contracts/state";
import {selectUserData} from "../../store/ducks/user/selectors";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import ReplyModal from "../ReplyModal/ReplyModal";
import {textFormatter} from "../../util/textFormatter";
import {selectUserProfile} from "../../store/ducks/userProfile/selectors";

interface TweetProps {
    id: string;
    text: string;
    addressedUsername: string;
    addressedId?: number;
    dateTime: string;
    images?: Image[];
    likedTweets: LikeTweet[];
    retweets: Retweet[];
    replies: any;
    user: User;
}

const Tweet: FC<TweetProps> = ({
                                   id,
                                   text,
                                   images,
                                   user,
                                   dateTime,
                                   likedTweets,
                                   retweets,
                                   replies,
                                   addressedUsername,
                                   addressedId
                               }): ReactElement => {
    const classes = useTweetStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const history = useHistory();
    const location = useLocation();
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const isTweetLiked = likedTweets.find((like) => like.user.id === myProfile?.id);
    const isTweetRetweetedByMe = retweets.find((retweet) => retweet.user.id === myProfile?.id);
    const isTweetRetweetedByUser = retweets.find((retweet) => retweet.user.id === userProfile?.id);
    const isModal = location.pathname.includes("/modal");
    const image = images?.[0];

    const handleClickTweet = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        history.push(`/home/tweet/${id}`);
    }

    const onOpenReplyModalWindow = (): void => {
        setVisibleModalWindow(true);
    };

    const onCloseReplyModalWindow = (): void => {
        setVisibleModalWindow(false);
    };

    const handleLike = (): void => {
        dispatch(fetchLikeTweet(id));
    };

    const handleRetweet = (): void => {
        if (user.id !== myProfile?.id) {
            dispatch(fetchRetweet(id));
        }
    };

    return (
        <>
            {isTweetRetweetedByUser &&
                <div className={classes.retweetWrapper}>
                    <span>{RetweetOutlinedIconSm}</span>
                    <Typography>
                        {(myProfile?.id === userProfile?.id) ? ("You") : (userProfile?.fullName)} Retweeted
                    </Typography>
                </div>
            }
            <Paper className={classes.container} variant="outlined">
                <Avatar
                    className={classes.avatar}
                    alt={`avatar ${user.id}`}
                    src={user.avatar?.src ? user.avatar?.src : DEFAULT_PROFILE_IMG}
                />
                <div style={{flex: 1}}>
                    <a onClick={handleClickTweet} className={classes.headerWrapper} href={`/home/tweet/${id}`}>
                        <div className={classes.header}>
                            <div>
                                <b>{user.fullName}</b>&nbsp;
                                <span className={classes.headerText}>@{user.username}</span>&nbsp;
                                <span className={classes.headerText}>·</span>&nbsp;
                                <span className={classes.headerText}>{formatDate(new Date(dateTime))}</span>
                            </div>
                            <div>
                                <IconButton
                                    className={classes.headerIcon}
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                >
                                    <span>{EditIcon}</span>
                                </IconButton>
                            </div>
                        </div>
                    </a>
                    <Typography style={{width: 500,}} variant="body1" gutterBottom>
                        {addressedUsername &&
                        <object>
                            <Typography className={classes.replyWrapper}>
                                Replying to <Link to={`/user/${addressedId}`} className={classes.replyLink}>
                                @{addressedUsername}
                            </Link>
                            </Typography>
                        </object>
                        }
                        <div className={classes.text} >
                            <a onClick={handleClickTweet} href={`/home/tweet/${id}`}>
                                {textFormatter(text)}
                            </a>
                        </div>
                        {(images?.length !== 0) &&
                        <Link to={{pathname: `/modal/${id}`, state: {background: location}}}>
                            <div className={classes.image}>
                                <img className={isModal ? "small" : ""} src={image?.src} alt={image?.src}/>
                            </div>
                        </Link>
                        }
                    </Typography>
                    <div className={classes.footer}>
                        <div className={classes.footerIcon}>
                            <IconButton onClick={onOpenReplyModalWindow}>
                                <span>{ReplyIcon}</span>
                            </IconButton>
                            {(replies?.length === 0 || replies === null) ? null : (
                                <span>{replies?.length}</span>
                            )}
                        </div>
                        <div className={classes.footerIcon}>
                            <IconButton onClick={handleRetweet}>
                                {isTweetRetweetedByMe ? (
                                    <span style={{color: "rgb(23, 191, 99)"}}>{RetweetIcon}</span>
                                ) : (
                                    <span>{RetweetOutlinedIcon}</span>)
                                }
                            </IconButton>
                            {(retweets.length === 0 || retweets === null) ? null : (
                                isTweetRetweetedByMe ? (
                                    <span style={{color: "rgb(23, 191, 99)"}}>{retweets.length}</span>
                                ) : (
                                    <span>{retweets.length}</span>)
                            )}
                        </div>
                        <div className={classes.footerIcon}>
                            <IconButton onClick={handleLike}>
                                {isTweetLiked ? (
                                    <span style={{color: "rgb(224, 36, 94)"}}>{LikeIcon}</span>
                                ) : (
                                    <span>{LikeOutlinedIcon}</span>
                                )}
                            </IconButton>
                            {(likedTweets.length === 0 || likedTweets === null) ? null : (
                                isTweetLiked ? (
                                    <span style={{color: "rgb(224, 36, 94)"}}>{likedTweets.length}</span>
                                ) : (
                                    <span>{likedTweets.length}</span>)
                            )}
                        </div>
                        <div className={classes.footerIcon}>
                            <IconButton>
                                <span>{ShareIcon}</span>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className={classes.bottomLine}/>
                <ReplyModal
                    user={user}
                    tweetId={id}
                    text={text}
                    image={image}
                    dateTime={dateTime}
                    visible={visibleModalWindow}
                    onClose={onCloseReplyModalWindow}/>
            </Paper>
        </>
    );
};

export default Tweet;
