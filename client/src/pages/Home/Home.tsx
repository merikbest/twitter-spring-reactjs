import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route, useLocation} from "react-router-dom";
import {CircularProgress, Paper, Typography} from "@material-ui/core";

import Tweet from "../../components/Tweet/Tweet";
import {useHomeStyles} from './HomeStyles';
import {AddTweetForm} from '../../components/AddTweetForm/AddTweetForm';
import {fetchTweets} from "../../store/ducks/tweets/actionCreators";
import {selectIsTweetsLoading, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {BackButton} from "../../components/BackButton/BackButton";
import {FullTweet} from "../FullTweet/FullTweet";
import {fetchUserData} from "../../store/ducks/user/actionCreators";
import {fetchRelevantUsers} from "../../store/ducks/users/actionCreators";
import {fetchTags} from "../../store/ducks/tags/actionCreators";
import Connect from "../../components/Connect/Connect";
import Trends from "../../components/Trends/Trends";

const Home: FC = (): ReactElement => {
    const classes = useHomeStyles();
    const dispatch = useDispatch();
    const location = useLocation<{ background: Location }>();
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);

    useEffect(() => {
        dispatch(fetchUserData());
        dispatch(fetchTags());

        if (location.pathname !== "/search") {
            dispatch(fetchTweets());
        }
        if (location.pathname !== "/home/connect") {
            dispatch(fetchRelevantUsers());
        }
        document.body.style.overflow = 'unset';
    }, []);

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <Route path='/home' exact>
                    <BackButton/>
                    <Typography variant="h6">Home</Typography>
                </Route>
                <Route path="/home/tweet">
                    <BackButton/>
                    <Typography variant="h6">Tweet</Typography>
                </Route>
                <Route path="/home/connect">
                    <BackButton/>
                    <Typography variant="h6">Connect</Typography>
                </Route>
                <Route path="/home/trends">
                    <BackButton/>
                    <Typography variant="h6">Trends</Typography>
                </Route>
            </Paper>

            <Route path='/home' exact>
                <Paper variant="outlined">
                    <div className={classes.addForm}>
                        <AddTweetForm title={"What's happening?"} buttonName={"Tweet"}/>
                    </div>
                    <div className={classes.divider}/>
                </Paper>
            </Route>

            <Route path="/home/connect" exact>
                <Connect/>
            </Route>

            <Route path="/home/trends" exact>
                <Trends/>
            </Route>

            <Route path='/home' exact>
                {isLoading ? (
                    <div className={classes.loading}>
                        <CircularProgress/>
                    </div>
                ) : (
                    tweets.map((tweet) => <Tweet key={tweet.id} images={tweet.images} {...tweet} />
                    )
                )}
            </Route>

            <Route path="/home/tweet/:id" exact>
                <FullTweet/>
            </Route>
        </Paper>
    );
};

export default Home;
