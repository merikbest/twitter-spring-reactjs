import React, { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

import {
    selectIsRepliesLoading,
    selectIsTweetError,
    selectIsTweetLoadedSuccess,
    selectIsTweetLoading,
    selectReplies,
    selectTweetId,
    selectTweetText,
    selectTweetUserFullName
} from "../../store/ducks/tweet/selectors";
import {
    fetchReplies,
    fetchTweetData,
    resetRepliesState,
    resetTweetState,
    setVoteData,
    updateTweetData
} from "../../store/ducks/tweet/actionCreators";
import { TOPIC_TWEET, TOPIC_TWEET_VOTE } from "../../constants/ws-constants";
import TweetComponent from "../../components/TweetComponent/TweetComponent";
import { useFullTweetStyles } from "./FullTweetStyles";
import { WS_URL } from "../../constants/endpoint-constants";
import { textFormatter } from "../../util/text-formatter";
import ShareTweetIconButton from "../../components/ShareTweetIconButton/ShareTweetIconButton";
import TweetComponentActions from "../../components/TweetComponentActions/TweetComponentActions";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import LikeIconButton from "./LikeIconButton/LikeIconButton";
import RetweetIconButton from "./RetweetIconButton/RetweetIconButton";
import ReplyIconButton from "./ReplyIconButton/ReplyIconButton";
import TweetDateTime from "./TweetDateTime/TweetDateTime";
import TweetHeader from "./TweetHeader/TweetHeader";
import TweetMedia from "./TweetMedia/TweetMedia";
import TweetInteractionCount from "./TweetInteractionCount/TweetInteractionCount";
import TweetActions from "./TweetActions/TweetActions";
import TweetReplyInfo from "./TweetReplyInfo/TweetReplyInfo";
import AddReplyToTweet from "./AddReplyToTweet/AddReplyToTweet";
import TweetImage from "./TweetImage/TweetImage";
import TweetPoll from "./TweetPoll/TweetPoll";
import TweetQuote from "./TweetQuote/TweetQuote";
import TweetErrorPage from "./TweetErrorPage/TweetErrorPage";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TweetList from "./TweetList/TweetList";
import TweetGif from "./TweetGif/TweetGif";

let stompClient: CompatClient | null = null;

const FullTweet = (): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useFullTweetStyles();
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const tweetId = useSelector(selectTweetId);
    const tweetText = useSelector(selectTweetText);
    const isTweetLoading = useSelector(selectIsTweetLoading);
    const isTweetLoadedSuccess = useSelector(selectIsTweetLoadedSuccess);
    const isError = useSelector(selectIsTweetError);
    const tweetUserFullName = useSelector(selectTweetUserFullName);
    const replies = useSelector(selectReplies);
    const isRepliesLoading = useSelector(selectIsRepliesLoading);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (params.id) {
            dispatch(fetchTweetData(parseInt(params.id)));

            stompClient = Stomp.over(() => new SockJS(WS_URL));
            stompClient.connect({}, () => {
                stompClient?.subscribe(TOPIC_TWEET(params.id), (response) => {
                    dispatch(updateTweetData(JSON.parse(response.body)));
                });

                stompClient?.subscribe(TOPIC_TWEET_VOTE(params.id), (response) => {
                    dispatch(setVoteData(JSON.parse(response.body)));
                });
            });
        }

        return () => {
            stompClient?.disconnect();
            dispatch(resetTweetState());
        };
    }, [params.id]);

    useEffect(() => {
        if (isTweetLoadedSuccess) {
            dispatch(fetchReplies(parseInt(params.id)));
            document.title = `${tweetUserFullName} on Twitter: "${tweetText}"`;
        }
        return () => {
            dispatch(resetRepliesState());
        };
    }, [isTweetLoadedSuccess]);

    if (isTweetLoading) {
        return <Spinner paddingTop={200} />;
    } else if (tweetId && isTweetLoadedSuccess) {
        return (
            <PageWrapper title={"Tweet"}>
                <div className={globalClasses.contentWrapper}>
                    <Paper className={classes.container}>
                        <TweetActions />
                        <div className={classes.tweetHeader}>
                            <TweetHeader />
                            <TweetComponentActions tweetId={tweetId} isFullTweet />
                        </div>
                        <Typography variant={"h3"} className={classes.textWrapper}>
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
                            <ShareTweetIconButton tweetId={tweetId!} isFullTweet />
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
    } else if (!tweetId && isError) {
        return <TweetErrorPage />;
    } else {
        return null;
    }
};

export default FullTweet;
