import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {Button, Checkbox, Dialog, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {useUnsentTweetsModalStyles} from "./UnsentTweetsModalStyles";
import {Tweet} from "../../../store/ducks/tweets/contracts/state";
import {TweetApi} from "../../../services/api/tweetApi";
import {ScheduleIcon} from "../../../icons";
import {formatScheduleDate} from "../../../util/formatDate";
import AddTweetForm from "../AddTweetForm";
import CloseButton from "../../CloseButton/CloseButton";
import Spinner from "../../Spinner/Spinner";

interface UnsentTweetsModalProps {
    visible?: boolean;
    onClose: () => void;
}

const UnsentTweetsModal: FC<UnsentTweetsModalProps> = ({visible, onClose}): ReactElement | null => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [unsentTweet, setUnsentTweet] = useState<Tweet | null>(null);
    const [visibleEditTweetModal, setVisibleEditTweetModal] = useState<boolean>(false);
    const [visibleEditListFooter, setVisibleEditListFooter] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [checkboxIndexes, setCheckboxIndexes] = useState<string[]>([]);

    const classes = useUnsentTweetsModalStyles({visibleEditTweetModal});

    useEffect(() => {
        if (visible) {
            getScheduledTweets();
        }
    }, [visible, visibleEditTweetModal]);

    const getScheduledTweets = (): void => {
        setTweets([]);
        setIsLoading(true);
        TweetApi.fetchScheduledTweets()
            .then((response) => {
                setTweets(response);
                setIsLoading(false);
            });
    };

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const onOpenEditTweetModal = (tweet: Tweet): void => {
        if (!visibleEditListFooter) {
            setUnsentTweet(tweet);
            setVisibleEditTweetModal(true);
        } else {
            onToggleCheckTweet(tweet.id);
        }
    };

    const onCloseEditTweetModal = (): void => {
        setUnsentTweet(null);
        setVisibleEditTweetModal(false);
    };

    const onToggleCheckTweet = (tweetId: string): void => {
        const currentIndex = checkboxIndexes.findIndex((checkboxIndex) => checkboxIndex === tweetId) !== -1;

        if (currentIndex) {
            setCheckboxIndexes(checkboxIndexes.filter((checkboxIndex) => (checkboxIndex !== tweetId)));
        } else {
            setCheckboxIndexes([...checkboxIndexes, tweetId]);
        }
    };

    const isTweetSelected = (tweetId: string): boolean => {
        return checkboxIndexes.findIndex((checkboxIndex) => checkboxIndex === tweetId) !== -1;
    };

    const onOpenEditTweetList = (): void => {
        setVisibleEditListFooter(true);
    };

    const onCloseEditTweetList = (): void => {
        setVisibleEditListFooter(false);
        setCheckboxIndexes([]);
    };

    const onSelectAllTweets = (): void => {
        setCheckboxIndexes([...tweets.map(tweet => tweet.id)]);
    };

    const onDeselectAllTweets = (): void => {
        setCheckboxIndexes([]);
    };

    const handleDeleteScheduledTweets = (): void => {
        if (checkboxIndexes.length !== 0) {
            TweetApi.deleteScheduledTweets({tweetsIds: checkboxIndexes.map(value => Number(value))})
                .then(() => getScheduledTweets());
            setCheckboxIndexes([]);
            setVisibleEditListFooter(false);
        }
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
                <CloseButton onClose={!visibleEditTweetModal ? onClose : onCloseEditTweetModal}/>
                {!visibleEditTweetModal && "Unsent Tweets"}
                {visibleEditTweetModal ? (
                    <Button
                        className={classes.outlinedButton}
                        onClick={onCloseEditTweetModal}
                        type="submit"
                        variant="outlined"
                        color="primary"
                    >
                        Unsent Tweets
                    </Button>
                ) : (
                    <Button
                        className={classes.containedButton}
                        onClick={visibleEditListFooter ? onCloseEditTweetList : onOpenEditTweetList}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {visibleEditListFooter ? "Done" : "Edit"}
                    </Button>
                )}
            </DialogTitle>
            {(!visibleEditTweetModal) ? (
                <DialogContent className={classes.content}>
                    <div className={classes.tabs}>
                        <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                            <Tab className={classes.tab} label="Scheduled"/>
                            <Tab className={classes.tab} label="Drafts"/>
                        </Tabs>
                    </div>
                    {isLoading ? (
                        <Spinner/>
                    ) : (
                        (tweets.length === 0) ? (
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
                                <div
                                    className={classes.tweetContainer}
                                    onClick={() => onOpenEditTweetModal(tweet)}
                                >
                                    {visibleEditListFooter && (
                                        <div>
                                            <Checkbox
                                                value={tweet.id}
                                                onClick={() => onToggleCheckTweet(tweet.id)}
                                                checked={isTweetSelected(tweet.id)}
                                            />
                                        </div>
                                    )}
                                    <div className={classes.tweetWrapper}>
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
                                            {(tweet?.images?.length !== 0) && (
                                                <div className={classes.imageWrapper}>
                                                    <img src={tweet?.images?.[0].src}
                                                         alt={String(tweet?.images?.[0].id)}/>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    )}
                    {visibleEditListFooter && (
                        <div className={classes.footer}>
                            <Button
                                className={classes.footerOutlinedButton}
                                onClick={(checkboxIndexes.length === 0) ? onSelectAllTweets : onDeselectAllTweets}
                                type="submit"
                                variant="outlined"
                                color="primary"
                            >
                                {(checkboxIndexes.length === 0) ? "Select All" : "Deselect All"}
                            </Button>
                            <Button
                                className={classes.footerDeleteButton}
                                onClick={handleDeleteScheduledTweets}
                                disabled={checkboxIndexes.length === 0}
                                type="submit"
                                variant="outlined"
                                color="primary"
                            >
                                Delete
                            </Button>
                        </div>
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
                            onCloseModal={onCloseEditTweetModal}
                        />
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
};

export default UnsentTweetsModal;
