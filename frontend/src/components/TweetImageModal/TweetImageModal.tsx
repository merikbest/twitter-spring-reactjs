import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Divider } from "@material-ui/core";
import classNames from "classnames";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import TweetComponent from "../TweetComponent/TweetComponent";
import { useTweetImageStyles } from "./TweetImageModalStyles";
import {
    fetchReplies,
    fetchTweetData,
    resetRepliesState,
    resetTweetState,
    updateTweetData
} from "../../store/ducks/tweet/actionCreators";
import {
    selectIsRepliesLoading,
    selectIsTweetLoadedSuccess,
    selectReplies,
    selectTweetId,
    selectTweetImages
} from "../../store/ducks/tweet/selectors";
import { WS_URL } from "../../constants/endpoint-constants";
import ShareTweetIconButton from "../ShareTweetIconButton/ShareTweetIconButton";
import Spinner from "../Spinner/Spinner";
import TweetHeader from "./TweetHeader/TweetHeader";
import TweetText from "./TweetText/TweetText";
import TweetDate from "./TweetDate/TweetDate";
import TweetInteractionCount from "./TweetInteractionCount/TweetInteractionCount";
import TweetReplyIconButton from "./TweetReplyIconButton/TweetReplyIconButton";
import TweetRetweetedIconButton from "./TweetRetweetedIconButton/TweetRetweetedIconButton";
import TweetLikeIconButton from "./TweetLikeIconButton/TweetLikeIconButton";
import AddReplyToTweet from "./AddReplyToTweet/AddReplyToTweet";
import ImageFooterReplyIconButton from "./ImageFooterReplyIconButton/ImageFooterReplyIconButton";
import ImageFooterRetweetButton from "./ImageFooterRetweetButton/ImageFooterRetweetButton";
import ImageFooterLikeButton from "./ImageFooterLikeButton/ImageFooterLikeButton";
import ImageFooterShareButton from "./ImageFooterShareButton/ImageFooterShareButton";
import ImageCloseButton from "./ImageCloseButton/ImageCloseButton";
import { TOPIC_TWEET } from "../../constants/ws-constants";

let stompClient: CompatClient | null = null;

const TweetImageModal = (): ReactElement | null => {
    const classes = useTweetImageStyles();
    const dispatch = useDispatch();
    const tweetId = useSelector(selectTweetId);
    const images = useSelector(selectTweetImages);
    const replies = useSelector(selectReplies);
    const isTweetLoadedSuccess = useSelector(selectIsTweetLoadedSuccess);
    const isRepliesLoading = useSelector(selectIsRepliesLoading);
    const params = useParams<{ id: string }>();
    const history = useHistory();
    const [visibleTweetImageModalWindow, setVisibleTweetImageModalWindow] = useState<boolean>(false);
    const image = images?.[0].src;

    useEffect(() => {
        dispatch(fetchTweetData(parseInt(params.id)));
        setVisibleTweetImageModalWindow(true);
        document.body.style.marginRight = "15px";
        document.body.style.overflow = "hidden";

        stompClient = Stomp.over(new SockJS(WS_URL));
        stompClient.connect({}, () => {
            stompClient?.subscribe(TOPIC_TWEET(params.id), (response) => {
                dispatch(updateTweetData(JSON.parse(response.body)));
            });
        });

        return () => {
            stompClient?.disconnect();
            dispatch(resetTweetState());
        };
    }, []);

    useEffect(() => {
        dispatch(fetchReplies(parseInt(params.id)));

        return () => {
            dispatch(resetRepliesState());
        };
    }, [isTweetLoadedSuccess]);

    const onCloseImageModalWindow = (event: any): void => {
        if (event.target.classList[0]) {
            if (event.target.classList[0].includes("container")) {
                onClose();
            }
        }
    };

    const onCloseModalWindow = useCallback((): void => {
        onClose();
    }, []);

    const onClose = (): void => {
        setVisibleTweetImageModalWindow(false);
        document.body.style.marginRight = "0px";
        document.body.style.overflow = "unset";
        history.goBack();
    };

    if (!visibleTweetImageModalWindow) {
        return null;
    }

    if (tweetId) {
        return (
            <div className={classes.container} onClick={onCloseImageModalWindow}>
                <div className={classes.modalWrapper}>
                    <img className={classes.imageModal} src={image} alt={image} />
                    <div className={classes.tweetInfo}>
                        <TweetHeader />
                        <TweetText />
                        <TweetDate />
                        <Divider />
                        <TweetInteractionCount />
                        <div id={"tweetFooter"} className={classes.tweetFooter}>
                            <TweetReplyIconButton />
                            <TweetRetweetedIconButton />
                            <TweetLikeIconButton />
                            <ShareTweetIconButton tweetId={tweetId} isFullTweet={false} />
                        </div>
                        <Divider />
                        <AddReplyToTweet />
                    </div>
                    <Divider />
                    {isRepliesLoading ? (
                        <Spinner />
                    ) : (
                        replies.map((tweet) => (
                            <TweetComponent key={tweet.id} tweet={tweet} isTweetImageModal />
                        ))
                    )}
                </div>
                <div id={"imageFooter"} className={classes.imageFooterContainer}>
                    <div className={classNames(classes.imageFooterWrapper)}>
                        <ImageFooterReplyIconButton />
                        <ImageFooterRetweetButton />
                        <ImageFooterLikeButton />
                        <ImageFooterShareButton />
                    </div>
                </div>
                <ImageCloseButton onCloseModalWindow={onCloseModalWindow} />
            </div>
        );
    }
    return null;
};

export default TweetImageModal;
