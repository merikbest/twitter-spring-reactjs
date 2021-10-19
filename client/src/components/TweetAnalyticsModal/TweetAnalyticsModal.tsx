import React, {FC, ReactElement} from 'react';
import {Dialog, Typography} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";

import {useTweetAnalyticsModalStyles} from "./TweetAnalyticsModalStyles";
import {Tweet} from "../../store/ducks/tweets/contracts/state";
import {textFormatter} from "../../util/textFormatter";

interface TweetAnalyticsModalStyles {
    tweet: Tweet;
    visible?: boolean;
    onClose: () => void;
}

const TweetAnalyticsModal: FC<TweetAnalyticsModalStyles> = ({tweet, visible, onClose}): ReactElement | null => {
    const classes = useTweetAnalyticsModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} className={classes.container} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon color="secondary"/>
                </IconButton>
                Tweet Analytics
            </DialogTitle>
            <DialogContent>
                <div className={classes.tweetInfoContainer}>
                    <div className={classes.tweetInfoWrapper}>
                        <Typography className={classes.tweetInfoFullName} component={"span"}>
                            {tweet.user.fullName}
                        </Typography>
                        <Typography className={classes.tweetInfoUsername} component={"span"}>
                            @{tweet.user.username}
                        </Typography>
                        <Typography className={classes.tweetInfoText} component={"div"}>
                            {textFormatter(tweet.text)}
                        </Typography>
                    </div>
                    <div className={classes.analyticsInfoWrapper}>
                        <Typography className={classes.analyticsInfoTitle} component={"div"}>
                            Impressions
                            <div className={classes.impressionsCount}>0</div>
                        </Typography>
                        <Typography className={classes.analyticsInfoText} component={"div"}>
                            times people saw this Tweet on Twitter
                        </Typography>
                        <div className={classes.engagementsWrapper}>
                            <Typography className={classes.analyticsInfoTitle} component={"div"}>
                                Total engagements
                                <div className={classes.impressionsCount}>0</div>
                            </Typography>
                            <Typography className={classes.analyticsInfoText} component={"div"}>
                                times people interacted with this Tweet
                            </Typography>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TweetAnalyticsModal;
