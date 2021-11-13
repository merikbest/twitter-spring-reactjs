import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {Dialog, DialogTitle, DialogContent, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {useUnsentTweetsModalStyles} from "./UnsentTweetsModalStyles";
import {Tweet} from "../../../store/ducks/tweets/contracts/state";
import {TweetApi} from "../../../services/api/tweetApi";
import {ScheduleIcon} from "../../../icons";
import {formatScheduleDate} from "../../../util/formatDate";
import {AddTweetForm} from "../AddTweetForm";

interface UnsentTweetsModalProps {
    visible?: boolean;
    onClose: () => void;
}

const UnsentTweetsModal: FC<UnsentTweetsModalProps> = ({visible, onClose}): ReactElement | null => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [unsentTweet, setUnsentTweet] = useState<Tweet | null>(null);
    const [visibleEditTweetModal, setVisibleEditTweetModal] = useState<boolean>(false);

    const classes = useUnsentTweetsModalStyles({visibleEditTweetModal});

    useEffect(() => {
        TweetApi.fetchScheduledTweets()
            .then((response) => setTweets(response));
    }, [visible]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const onOpenEditTweetModal = (tweet: Tweet): void => {
        setUnsentTweet(tweet);
        setVisibleEditTweetModal(true);
    };

    const onCloseEditTweetModal = (): void => {
        setUnsentTweet(null);
        setVisibleEditTweetModal(false);
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog
            transitionDuration={0}
            open={visible}
            onClose={onClose}
            className={classes.dialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <IconButton onClick={!visibleEditTweetModal ? onClose : onCloseEditTweetModal} color="secondary" aria-label="close">
                    <CloseIcon style={{fontSize: 26}} color="secondary"/>
                </IconButton>
                {!visibleEditTweetModal && "Unsent Tweets"}
            </DialogTitle>
            {(!visibleEditTweetModal) ? (
                <DialogContent className={classes.content}>
                    <div className={classes.tabs}>
                        <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                            <Tab className={classes.tab} label="Scheduled"/>
                            <Tab className={classes.tab} label="Drafts"/>
                        </Tabs>
                    </div>
                    {(tweets.length === 0) ? (
                        <div className={classes.infoWrapper}>
                            <Typography component={"div"} className={classes.title}>
                                {(activeTab === 0) ? ("You don’t have any scheduled Tweets") : ("You don’t have any unsent Tweets")}
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
                                When you do, you’ll find them here.
                            </Typography>
                        </div>
                    ) : (
                        tweets.map((tweet) => (
                            <div className={classes.tweetWrapper} onClick={() => onOpenEditTweetModal(tweet)}>
                                <div className={classes.scheduledDateWrapper}>
                                    {ScheduleIcon}
                                    <Typography component={"span"} className={classes.scheduledDateText}>
                                        {`Will send on ${formatScheduleDate(new Date(tweet.scheduledDate!))}`}
                                    </Typography>
                                </div>
                                <div className={classes.tweetInfo}>
                                    <Typography component={"span"} className={classes.tweetText}>
                                        {tweet.text}
                                    </Typography>
                                    {(tweet?.images) && (
                                        <div className={classes.imageWrapper}>
                                            <img src={tweet.images[0].src} alt={String(tweet.images[0].id)}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </DialogContent>
            ) : (
                <DialogContent className={classes.content}>
                    <div className={classes.addTweetWrapper}>
                        <AddTweetForm
                            unsentTweet={unsentTweet!}
                            minRows={3}
                            title={"What's happening?"}
                            buttonName={"Schedule"}
                        />
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
};

export default UnsentTweetsModal;
