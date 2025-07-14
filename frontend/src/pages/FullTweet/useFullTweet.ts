import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

import {
    fetchReplies,
    fetchTweetData,
    resetRepliesState,
    resetTweetState,
    setVoteData,
    updateTweetData
} from "../../store/ducks/tweet/actionCreators";
import {
    selectIsRepliesLoading,
    selectIsTweetError,
    selectIsTweetLoadedSuccess,
    selectIsTweetLoading,
    selectReplies,
    selectTweetAuthorFullName,
    selectTweetId,
    selectTweetText
} from "../../store/ducks/tweet/selectors";
import { TOPIC_TWEET, TOPIC_TWEET_VOTE } from "../../constants/ws-constants";
import { WS_URL } from "../../constants/endpoint-constants";

let stompClient: CompatClient | null = null;

export const useFullTweet = () => {
    const dispatch = useDispatch();
    const { tweetId } = useParams<{ tweetId: string }>();
    const tweetDetailId = useSelector(selectTweetId);
    const tweetText = useSelector(selectTweetText);
    const isTweetLoading = useSelector(selectIsTweetLoading);
    const isTweetLoadedSuccess = useSelector(selectIsTweetLoadedSuccess);
    const isError = useSelector(selectIsTweetError);
    const tweetAuthorFullName = useSelector(selectTweetAuthorFullName);
    const replies = useSelector(selectReplies);
    const isRepliesLoading = useSelector(selectIsRepliesLoading);

    const setupWebSocket = (tweetId: string): void => {
        stompClient = Stomp.over(() => new SockJS(WS_URL));
        stompClient.connect({}, () => {
            stompClient?.subscribe(TOPIC_TWEET(tweetId), (response) => {
                dispatch(updateTweetData(JSON.parse(response.body)));
            });
            stompClient?.subscribe(TOPIC_TWEET_VOTE(tweetId), (response) => {
                dispatch(setVoteData(JSON.parse(response.body)));
            });
        });
    };

    useEffect(() => {
        if (tweetId) {
            dispatch(fetchTweetData(parseInt(tweetId)));
            setupWebSocket(tweetId);
        }
        return () => {
            stompClient?.disconnect();
            dispatch(resetTweetState());
        };
    }, [tweetId]);

    useEffect(() => {
        if (isTweetLoadedSuccess) {
            dispatch(fetchReplies(parseInt(tweetId)));
            document.title = `${tweetAuthorFullName} on Twitter: "${tweetText}"`;
        }
        return () => {
            dispatch(resetRepliesState());
        };
    }, [isTweetLoadedSuccess]);

    return {
        tweetDetailId,
        tweetText,
        isTweetLoading,
        isTweetLoadedSuccess,
        isError,
        tweetAuthorFullName,
        replies,
        isRepliesLoading
    };
};
