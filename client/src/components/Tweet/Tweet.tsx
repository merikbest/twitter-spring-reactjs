import React, {FC, ReactElement, useState} from 'react';
import {useHistory} from 'react-router-dom';
import classNames from "classnames";
import {Avatar, IconButton, Menu, MenuItem, Paper, Typography} from '@material-ui/core';
import CommentIcon from "@material-ui/icons/ModeCommentOutlined";
import RepostIcon from "@material-ui/icons/RepeatOutlined";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from '@material-ui/icons/ReplyOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {formatDate} from '../../util/formatDate';
import ImageList from "../ImageList/ImageList";
import {useDispatch} from "react-redux";
import {removeTweet} from "../../store/ducks/tweets/actionCreators";
import {Image} from "../../store/ducks/tweets/contracts/state";
import {User} from "../../store/ducks/user/contracts/state";

interface TweetProps {
    id: string
    classes: ReturnType<typeof useHomeStyles>
    text: string
    dateTime: string
    images?: Image[]
    user: User
}

const Tweet: FC<TweetProps> = ({id, classes, text, images, user, dateTime}: TweetProps): ReactElement => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const history = useHistory();

    const handleClickTweet = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        history.push(`/home/tweet/${id}`);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLElement>): void => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(null);
    };

    const handleRemove = (event: React.MouseEvent<HTMLElement>): void => {
        handleClose(event);
        if (window.confirm('Вы действительно хотите удалить твит?')) {
            dispatch(removeTweet(id));
        }
    };

    return (
        <a onClick={handleClickTweet} className={classes.tweetWrapper} href={`/home/tweet/${id}`}>
            <Paper className={classNames(classes.tweet, classes.tweetsHeader)} variant="outlined">
                <Avatar
                    className={classes.tweetAvatar}
                    // alt={`Аватарка пользователя ${user.fullName}`}
                    // src={user.avatarUrl}
                    alt={`Аватарка пользователя`}
                    src={"https://avatars.githubusercontent.com/u/56604599?v=4"}
                />
                <div className={classes.tweetContent}>
                    <div className={classes.tweetHeader}>
                        <div>
                            <b>{user.fullName}</b>&nbsp;
                            <span className={classes.tweetUserName}>@{user.username}</span>&nbsp;
                            <span className={classes.tweetUserName}>·</span>&nbsp;
                            <span className={classes.tweetUserName}>{formatDate(new Date(dateTime))}</span>
                        </div>
                        <div className={classes.tweetPopupMenu}>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}>
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <MenuItem onClick={handleClose}>Редактировать</MenuItem>
                                <MenuItem onClick={handleRemove}>Удалить твит</MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <Typography variant="body1" gutterBottom>
                        {text}
                        {images && <ImageList classes={classes} images={images} />}
                    </Typography>
                    <div className={classes.tweetFooter}>
                        <div>
                            <IconButton>
                                <CommentIcon style={{fontSize: 20}}/>
                            </IconButton>
                            <span>1</span>
                        </div>
                        <div>
                            <IconButton>
                                <RepostIcon style={{fontSize: 20}}/>
                            </IconButton>
                        </div>
                        <div>
                            <IconButton>
                                <LikeIcon style={{fontSize: 20}}/>
                            </IconButton>
                        </div>
                        <div>
                            <IconButton>
                                <ShareIcon style={{fontSize: 20}}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </Paper>
        </a>
    );
};

export default Tweet;
