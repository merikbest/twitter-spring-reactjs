import React, { ReactElement } from "react";
import Paper from "@material-ui/core/Paper";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import { useFullTweetStyles } from "./FullTweetStyles";
import { textFormatter } from "../../util/text-formatter";
import ShareTweetIconButton from "../../components/ShareTweetIconButton/ShareTweetIconButton";
import TweetComponentActions from "../../components/TweetComponentActions/TweetComponentActions";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import LikeIconButton from "./LikeIconButton";
import RetweetIconButton from "./RetweetIconButton";
import ReplyIconButton from "./ReplyIconButton";
import TweetDateTime from "./TweetDateTime";
import TweetHeader from "./TweetHeader";
import TweetMedia from "./TweetMedia";
import TweetInteractionCount from "./TweetInteractionCount";
import TweetActions from "./TweetActions";
import TweetReplyInfo from "./TweetReplyInfo";
import AddReplyToTweet from "./AddReplyToTweet";
import TweetImage from "./TweetImage";
import TweetPoll from "./TweetPoll";
import TweetQuote from "./TweetQuote";
import TweetErrorPage from "./TweetErrorPage";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TweetList from "./TweetList";
import TweetGif from "./TweetGif";
import { useFullTweet } from "./useFullTweet";

const FullTweet = (): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useFullTweetStyles();
    const { tweetDetailId, tweetText, isTweetLoading, isError, replies, isRepliesLoading } = useFullTweet();

    if (isError) {
        return <TweetErrorPage />;
    }

    if (isTweetLoading) {
        return <Spinner paddingTop={200} />;
    }

    return (
        <PageWrapper translationKey="TWEET" defaultValue="Tweet">
            <div className={globalClasses.contentWrapper}>
                <Paper className={classes.container}>
                    <TweetActions />
                    <div className={classes.tweetHeader}>
                        <TweetHeader />
                        <TweetComponentActions tweetId={tweetDetailId!} isFullTweet />
                    </div>
                    <Typography variant="h3" className={classes.textWrapper}>
                        {textFormatter(tweetText!)}
                        <TweetMedia />
                        <TweetImage />
                        <TweetGif />
                        <TweetPoll />
                        <TweetQuote />
                        <TweetList />
                    </Typography>
                    <TweetDateTime />
                    <TweetInteractionCount />
                    <div className={classes.info}>
                        <ReplyIconButton />
                        <RetweetIconButton />
                        <LikeIconButton />
                        <ShareTweetIconButton tweetId={tweetDetailId!} isFullTweet />
                    </div>
                    <Divider />
                    <TweetReplyInfo />
                    <AddReplyToTweet />
                </Paper>
                <div className={classes.divider} />
                {isRepliesLoading ? (
                    <Spinner />
                ) : (
                    replies.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet} />)
                )}
            </div>
        </PageWrapper>
    );
};

export default FullTweet;
