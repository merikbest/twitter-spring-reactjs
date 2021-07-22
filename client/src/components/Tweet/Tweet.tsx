import React, {FC, ReactElement, MouseEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useLocation} from 'react-router-dom';
import {Avatar, IconButton, Menu, MenuItem, Paper, Typography} from '@material-ui/core';
import RepostIcon from "@material-ui/icons/RepeatOutlined";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {LikeOutlinedIcon, LikeIcon, RetweetIcon, RetweetOutlinedIcon, ReplyIcon, ShareIcon} from "../../icons";
import {useTweetStyles} from "./TweetStyles";
import {formatDate} from '../../util/formatDate';
import {fetchLikeTweet, fetchRetweet, removeTweet} from "../../store/ducks/tweets/actionCreators";
import {Image} from "../../store/ducks/tweets/contracts/state";
import {User} from "../../store/ducks/user/contracts/state";
import {selectUserData} from "../../store/ducks/user/selectors";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import ReplyModal from "../ReplyModal/ReplyModal";

interface TweetProps {
    id: string;
    text: string;
    likes: User[];
    retweets: User[];
    replies: any;
    dateTime: string;
    images?: Image[];
    user: User;
    addressedUsername: string;
    addressedId?: number;
}

const Tweet: FC<TweetProps> = ({
                                   id,
                                   text,
                                   images,
                                   user,
                                   dateTime,
                                   likes,
                                   retweets,
                                   replies,
                                   addressedUsername,
                                   addressedId
                               }: TweetProps): ReactElement => {
    const classes = useTweetStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const history = useHistory();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const open = Boolean(anchorEl);
    const isTweetLiked = likes.find((user) => user.id === myProfile?.user?.id);
    const isTweetRetweeted = retweets.find((user) => user.id === myProfile?.user?.id);
    const isModal = location.pathname.includes("/modal");
    const image = images?.[0];

    const handleClickTweet = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        history.push(`/home/tweet/${id}`);
    }

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: MouseEvent<HTMLElement>): void => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(null);
    };

    const handleRemove = (event: MouseEvent<HTMLElement>): void => {
        handleClose(event);
        if (window.confirm('Вы действительно хотите удалить твит?')) {
            dispatch(removeTweet(id));
        }
    };

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
        dispatch(fetchRetweet(id));
    };

    return (
        <>
            {isTweetRetweeted &&
            <div className={classes.retweetWrapper}>
                <RepostIcon/>
                <Typography>
                    You Retweeted
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
                                <span>@{user.username}</span>&nbsp;
                                <span>·</span>&nbsp;
                                <span>{formatDate(new Date(dateTime))}</span>
                            </div>
                            <div>
                                <IconButton
                                    className={classes.headerIcon}
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}>
                                    <MoreVertIcon/>
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                    <MenuItem onClick={handleClose}>Edit tweet</MenuItem>
                                    <MenuItem onClick={handleRemove}>Delete tweet</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </a>
                    <Typography variant="body1" gutterBottom>
                        {addressedUsername &&
                        <object>
                            <Typography className={classes.replyWrapper}>
                                Replying to <Link to={`/user/${addressedId}`} className={classes.replyLink}>
                                @{addressedUsername}
                            </Link>
                            </Typography>
                        </object>
                        }
                        <a onClick={handleClickTweet} className={classes.text} href={`/home/tweet/${id}`}>
                            <div dangerouslySetInnerHTML={{__html: text}}></div>
                        </a>
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
                                {isTweetRetweeted ? (
                                    <span style={{color: "rgb(23, 191, 99)"}}>{RetweetIcon}</span>
                                ) : (
                                    <span>{RetweetOutlinedIcon}</span>)
                                }
                            </IconButton>
                            {(retweets.length === 0 || retweets === null) ? null : (
                                isTweetRetweeted ? (
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
                            {(likes.length === 0 || likes === null) ? null : (
                                isTweetLiked ? (
                                    <span style={{color: "rgb(224, 36, 94)"}}>{likes.length}</span>
                                ) : (
                                    <span>{likes.length}</span>)
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
                    dateTime={dateTime}
                    visible={visibleModalWindow}
                    onClose={onCloseReplyModalWindow}/>
            </Paper>
        </>
    );
};

export default Tweet;
