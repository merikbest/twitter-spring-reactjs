import React, {FC, ReactElement} from 'react';
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import {Avatar, IconButton, Paper, Typography} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/ModeCommentOutlined";
import RepostIcon from "@material-ui/icons/RepeatOutlined";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ReplyIcon from "@material-ui/icons/ReplyOutlined";

import {useHomeStyles} from "../../pages/Home";

interface TweetProps {
    classes: ReturnType<typeof useHomeStyles>
    text: string
    user: {
        fullname: string
        username: string
        avatarUrl: string
    }
}

const Tweet: FC<TweetProps> = ({classes, text, user}: TweetProps): ReactElement => {

    return (
        <Paper className={classNames(classes.tweet, classes.tweetsHeader)} variant="outlined">
            <Grid container spacing={3}>
                <Grid item xs={1}>
                    <Avatar className={classes.tweetAvatar} alt="Avatar" src={user.avatarUrl}/>
                </Grid>
                <Grid item xs={11}>
                    <Typography>
                        <b>{user.fullname} </b>
                        <span className={classes.tweetUserName}>@{user.username} </span>
                        <span className={classes.tweetUserName}>&sdot; </span>
                        <span className={classes.tweetUserName}>1 ч</span>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {text}
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
                                <ReplyIcon style={{fontSize: 20}}/>
                            </IconButton>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Tweet;
