import React, {FC, ReactElement, MouseEvent, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import classNames from "classnames";
import {Avatar, IconButton, Menu, MenuItem, Paper, Typography} from '@material-ui/core';
import RepostIcon from "@material-ui/icons/RepeatOutlined";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {LikeOutlinedIcon, LikeIcon, RetweetIcon, RetweetOutlinedIcon, ReplyIcon, ShareIcon} from "../../icons";
import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {formatDate} from '../../util/formatDate';
import ImageList from "../ImageList/ImageList";
import {useDispatch, useSelector} from "react-redux";
import {fetchLikeTweet, fetchRetweet, removeTweet} from "../../store/ducks/tweets/actionCreators";
import {Image} from "../../store/ducks/tweets/contracts/state";
import {User} from "../../store/ducks/user/contracts/state";
import {selectUserData} from "../../store/ducks/user/selectors";
import TweetImageModal from "../TweetImageModal/TweetImageModal";

interface TweetProps {
    id: string;
    classes: ReturnType<typeof useHomeStyles>;
    text: string;
    likes: User[];
    retweets: User[];
    replies: any;
    dateTime: string;
    images?: Image[];
    user: User;
    activeTab?: number;
    addressedUser?: string;
    addressedId?: number;
}

const Tweet: FC<TweetProps> = ({
                                   id,
                                   classes,
                                   text,
                                   images,
                                   user,
                                   dateTime,
                                   likes,
                                   retweets,
                                   replies,
                                   activeTab,
                                   addressedUser,
                                   addressedId
                               }: TweetProps): ReactElement => {
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isTweetLiked = likes.find((user) => user.id === myProfile?.user?.id);
    const isTweetRetweeted = retweets.find((user) => user.id === myProfile?.user?.id);
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
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

    const handleLike = (): void => {
        dispatch(fetchLikeTweet(id));
    };

    const handleRetweet = (): void => {
        dispatch(fetchRetweet(id));
    };

    const onOpenImageModalWindow = (): void => {
        setVisibleModalWindow(true);
        document.body.style.overflow = 'hidden';
    };

    const onCloseImageModalWindow = (event: any): void => {
        if (event.target.classList[0]) {
            if (event.target.classList[0].includes('backdrop')) {
                setVisibleModalWindow(false);
                document.body.style.overflow = 'unset';
            }
        }
    };

    return (
        <>
            {isTweetRetweeted ?
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 45,
                    marginTop: 5,
                    color: "rgb(83, 100, 113)"
                }}>
                    <RepostIcon style={{fontSize: 16}}/>
                    <Typography style={{marginLeft: 15, fontSize: 14, fontWeight: 700}}>
                        You Retweeted
                    </Typography>
                </div> : null}
            <Paper className={classNames(classes.tweet, classes.tweetsHeader)} variant="outlined">
                <Avatar
                    className={classes.tweetAvatar}
                    alt={`avatar ${user.id}`}
                    src={user.avatar?.src ? user.avatar?.src :
                        "https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png"}
                />
                <div className={classes.tweetContent}>
                    <a onClick={handleClickTweet} className={classes.tweetWrapper} href={`/home/tweet/${id}`}>
                        <div className={classes.tweetHeader}>
                            <div>
                                <b>{user.fullName}</b>&nbsp;
                                <span className={classes.tweetUserName}>@{user.username}</span>&nbsp;
                                <span className={classes.tweetUserName}>·</span>&nbsp;
                                <span className={classes.tweetUserName}>{formatDate(new Date(dateTime))}</span>
                            </div>
                            <div>
                                <IconButton
                                    className={classes.tweetIconButton}
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
                        {addressedUser ? (
                            <object>
                                <Typography style={{zIndex: 2, color: "rgb(83, 100, 113)", fontSize: 15}}>
                                    Replying to <Link to={`/user/${addressedId}`}
                                                      style={{textDecoration: "none", color: "rgb(27, 149, 224)"}}>
                                    @{addressedUser}
                                </Link>
                                </Typography>
                            </object>
                        ) : null}
                        <a onClick={handleClickTweet} className={classes.tweetWrapper} href={`/home/tweet/${id}`}>
                            <div dangerouslySetInnerHTML={{__html: text}}></div>
                        </a>
                        {images?.length !== 0 ? (<a href={"javascript:void(0);"} onClick={onOpenImageModalWindow}>
                            <div style={{height: 280, position: "relative"}}>
                                <img style={{
                                    objectFit: "cover",
                                    position: "absolute",
                                    marginTop: 10,
                                    width: 504,
                                    height: 280,
                                    borderRadius: 20,
                                    borderColor: "rgb(83, 100, 113)",
                                }}
                                     src={image?.src}
                                     alt={"123"}
                                />
                            </div>
                        </a>) : null
                        }
                        {/*{images && <ImageList classes={classes} images={images}/>}*/}
                    </Typography>
                    <div className={classes.tweetFooter}>
                        <div className={classes.tweetIconSvg}>
                            <IconButton>
                                <span>{ReplyIcon}</span>
                            </IconButton>
                            {replies?.length === 0 || replies === null ? null : (
                                <span>{replies?.length}</span>
                            )}
                        </div>
                        <div className={classes.tweetIconSvg}>
                            <IconButton onClick={handleRetweet}>
                                {isTweetRetweeted ? (
                                    <span style={{color: "rgb(23, 191, 99)"}}>{RetweetIcon}</span>
                                ) : (
                                    <span>{RetweetOutlinedIcon}</span>)
                                }
                            </IconButton>
                            {retweets.length === 0 || retweets === null ? null : (
                                isTweetRetweeted ? (
                                    <span style={{color: "rgb(23, 191, 99)"}}>{retweets.length}</span>
                                ) : (
                                    <span>{retweets.length}</span>)
                            )}
                        </div>
                        <div className={classes.tweetIconSvg}>
                            <IconButton onClick={handleLike}>
                                {isTweetLiked ? (
                                    <span style={{color: "rgb(224, 36, 94)"}}>{LikeIcon}</span>
                                ) : (
                                    <span>{LikeOutlinedIcon}</span>
                                )}
                            </IconButton>
                            {likes.length === 0 || likes === null ? null : (
                                isTweetLiked ? (
                                    <span style={{color: "rgb(224, 36, 94)"}}>{likes.length}</span>
                                ) : (
                                    <span>{likes.length}</span>)
                            )}
                        </div>
                        <div className={classes.tweetIconSvg}>
                            <IconButton>
                                <span>{ShareIcon}</span>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <TweetImageModal
                    tweetId={id}
                    tweetImg={image?.src}
                    user={user}
                    dateTime={dateTime}
                    replies={replies}
                    likes={likes}
                    retweets={retweets}
                    text={text}
                    visible={visibleModalWindow}
                    onClose={onCloseImageModalWindow}/>
                <div className={classes.addFormBottomLine}/>
            </Paper>
        </>
    );
};

export default Tweet;
