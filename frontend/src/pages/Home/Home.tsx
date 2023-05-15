import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, Paper, Typography } from "@material-ui/core";
import classnames from "classnames";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import { useHomeStyles } from "./HomeStyles";
import AddTweetForm from "../../components/AddTweetForm/AddTweetForm";
import {
    fetchFollowersTweets,
    fetchTweets,
    resetTweets,
    setTweetsLoadingState
} from "../../store/ducks/tweets/actionCreators";
import { selectIsTweetsLoading, selectPagesCount, selectTweetsItems } from "../../store/ducks/tweets/selectors";
import { fetchUserData } from "../../store/ducks/user/actionCreators";
import { selectUserDataIsProfileStarted } from "../../store/ducks/user/selectors";
import Welcome from "../../components/Welcome/Welcome";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import TopTweetActions from "./TopTweetActions/TopTweetActions";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import { SEARCH } from "../../constants/path-constants";
import { LoadingStatus } from "../../types/common";

const Home: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useHomeStyles();
    const dispatch = useDispatch();
    const location = useLocation<{ background: Location }>();
    const isProfileStarted = useSelector(selectUserDataIsProfileStarted);
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);
    const [switchTweets, setSwitchTweets] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(0);

    useEffect(() => {
        dispatch(setTweetsLoadingState(LoadingStatus.NEVER));
        dispatch(fetchUserData());

        if (location.pathname !== SEARCH) {
            loadTweets();
        }
        document.body.style.overflow = "unset";
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    const loadTweets = (): void => {
        if (switchTweets) {
            dispatch(fetchFollowersTweets(page));
        } else {
            dispatch(fetchTweets(page));
        }
        setPage(prevState => prevState + 1);
    };

    const handleLatestTweets = (): void => {
        dispatch(resetTweets());
        dispatch(fetchFollowersTweets(0));
        handleSwitchTweets(true);
    };

    const handleTopTweets = (): void => {
        dispatch(resetTweets());
        dispatch(fetchTweets(0));
        handleSwitchTweets(false);
    };

    const handleSwitchTweets = (condition: boolean): void => {
        setSwitchTweets(condition);
        setPage(prevState => prevState + 1);
    };

    return (
        <InfiniteScroll
            style={{ overflow: "unset" }}
            dataLength={tweets.length}
            next={loadTweets}
            hasMore={page < pagesCount}
            loader={null}
        >
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                    <Typography variant="h5">
                        Home
                    </Typography>
                    <TopTweetActions
                        switchTweets={switchTweets}
                        handleLatestTweets={handleLatestTweets}
                        handleTopTweets={handleTopTweets}
                    />
                </Paper>
                <div className={classes.addForm}>
                    <AddTweetForm title={"What's happening?"} buttonName={"Tweet"} />
                </div>
                <Divider />
                {!isProfileStarted ? (
                    <Welcome />
                ) : (
                    <>
                        {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet} />)}
                        {isLoading && <Spinner />}
                    </>
                )}
            </Paper>
        </InfiniteScroll>
    );
};

export default withDocumentTitle(Home)("Home");
