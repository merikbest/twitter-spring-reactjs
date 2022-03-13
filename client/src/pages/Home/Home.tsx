import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route, useLocation} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {Divider, Paper, Typography} from "@material-ui/core";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import {useHomeStyles} from './HomeStyles';
import AddTweetForm from '../../components/AddTweetForm/AddTweetForm';
import {
    fetchFollowersTweets,
    fetchTweets,
    resetTweets,
    setTweetsLoadingState,
} from "../../store/ducks/tweets/actionCreators";
import {selectIsTweetsLoading, selectPagesCount, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import BackButton from "../../components/BackButton/BackButton";
import {fetchUserData} from "../../store/ducks/user/actionCreators";
import Connect from "../Connect/Connect";
import Trends from "../Trends/Trends";
import {selectUserData} from "../../store/ducks/user/selectors";
import Welcome from "../../components/Welcome/Welcome";
import {LoadingStatus} from "../../store/types";
import FullTweet from "../FullTweet/FullTweet";
import Spinner from "../../components/Spinner/Spinner";
import {useGlobalStyles} from "../../util/globalClasses";
import classnames from "classnames";
import TopTweetActions from "./TopTweetActions/TopTweetActions";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";

const Home: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useHomeStyles();
    const dispatch = useDispatch();
    const location = useLocation<{ background: Location }>();
    const myProfile = useSelector(selectUserData);
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);
    const [switchTweets, setSwitchTweets] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        dispatch(setTweetsLoadingState(LoadingStatus.NEVER));
        dispatch(fetchUserData());

        if (location.pathname !== "/search") {
            loadTweets();
        }
        document.body.style.overflow = 'unset';
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetTweets());
        };
    }, []);
    
    useEffect(() => {
        loadTweets();
    }, [switchTweets]);

    const loadTweets = () => {
        if (switchTweets) {
            dispatch(fetchFollowersTweets(page));
        } else {
            dispatch(fetchTweets(page));
        }
        setPage(prevState => prevState + 1);
    };
    
    const handleSwitchTweets = (): void => {
        setPage(0);
        dispatch(resetTweets());
        setSwitchTweets((prevState) => !prevState);
    };

    return (
        <InfiniteScroll
            style={{overflow: "unset"}}
            dataLength={tweets.length}
            next={loadTweets}
            hasMore={page < pagesCount}
            loader={null}
        >
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                    <Route path='/home' exact>
                        <Typography variant="h5">
                            Home
                        </Typography>
                        <TopTweetActions switchTweets={switchTweets} handleSwitchTweets={handleSwitchTweets} />
                    </Route>
                    <Route path="/home/tweet">
                        <div>
                            <BackButton/>
                            <Typography variant="h5">
                                Tweet
                            </Typography>
                        </div>
                    </Route>
                    <Route path="/home/connect">
                        <div>
                            <BackButton/>
                            <Typography variant="h5">
                                Connect
                            </Typography>
                        </div>
                    </Route>
                    <Route path="/home/trends">
                        <div>
                            <BackButton/>
                            <Typography variant="h5">
                                Trends
                            </Typography>
                        </div>
                    </Route>
                </Paper>

                <Route path='/home' exact>
                    <div className={classes.addForm}>
                        <AddTweetForm title={"What's happening?"} buttonName={"Tweet"}/>
                    </div>
                    <Divider/>
                </Route>

                <Route path="/home/connect" exact>
                    <Connect/>
                </Route>

                <Route path="/home/trends" exact>
                    <Trends/>
                </Route>

                <Route path='/home' exact>
                    {!myProfile?.profileStarted ? (
                        <Welcome/>
                    ) : (
                        <>
                            {tweets.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)}
                            {isLoading && <Spinner/>}
                        </>
                    )}
                </Route>
                <Route path="/home/tweet/:id" exact>
                    <FullTweet/>
                </Route>
            </Paper>
        </InfiniteScroll>
    );
};

export default withDocumentTitle(Home);
