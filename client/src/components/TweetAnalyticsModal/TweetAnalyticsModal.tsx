import React, {FC, ReactElement} from 'react';
import {Button, Dialog, Typography} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import {useTweetAnalyticsModalStyles} from "./TweetAnalyticsModalStyles";
import {Tweet} from "../../store/ducks/tweets/contracts/state";
import {textFormatter} from "../../util/textFormatter";
import CloseButton from "../CloseButton/CloseButton";

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
                <CloseButton onClose={onClose}/>
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
                    <div className={classes.engagementsButton}>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                        >
                            View all engagements
                        </Button>
                    </div>
                    <div className={classes.promoteWrapper}>
                        <img className={classes.promoteImage}
                             src="https://ton.twimg.com/tfb/promote-a54f43f3904fb8073e4f16564fe00058.png"/>
                        <Typography className={classes.promoteTitle} component={"div"}>
                            Promote your Tweet
                        </Typography>
                        <Typography className={classes.promoteText} component={"div"}>
                            Your Tweet has 0 total impressions so far. <br/>
                            Get more impressions on this Tweet!
                        </Typography>
                    </div>
                    <div className={classes.engagementsButton}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Promote your Tweet
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TweetAnalyticsModal;
