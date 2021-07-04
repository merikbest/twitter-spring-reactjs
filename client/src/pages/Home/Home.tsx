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
import {FullTweet} from "./FullTweet";
import {fetchUserData} from "../../store/ducks/user/actionCreators";
import {fetchRelevantUsers} from "../../store/ducks/users/actionCreators";
import {fetchTags} from "../../store/ducks/tags/actionCreators";
// import Search from "../../components/Search/Search";
import Connect from "../../components/Connect/Connect";

const Home: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const location = useLocation();
    const classes = useHomeStyles();
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
    }, [location]);

    return (
        <Paper className={classes.tweetsWrapper} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
                <Route path='/home' exact>
                    <BackButton/>
                    <Typography variant="h6">Home</Typography>
                </Route>
                <Route path="/home/tweet">
                    <BackButton/>
                    <Typography variant="h6">Tweet</Typography>
                </Route>
                {/*<Route path="/home/search" component={Search}/>*/}
                <Route path="/home/connect">
                    <BackButton/>
                    <Typography variant="h6">Connect</Typography>
                </Route>
            </Paper>

            <Route path='/home' exact>
                <Paper>
                    <div className={classes.addForm}>
                        <AddTweetForm classes={classes} title={"What's happening?"} buttonName={"Tweet"}/>
                    </div>
                    <div className={classes.addFormBottomLine}/>
                </Paper>
            </Route>

            <Route path="/home/connect" component={Connect} exact/>
            {/*    <Connect/>*/}
            {/*</Route>*/}

            <Route path='/home' exact>
                {isLoading ? (
                    <div className={classes.tweetsCentred}>
                        <CircularProgress/>
                    </div>
                ) : (
                    tweets.map((tweet) => (
                            <Tweet key={tweet.id} classes={classes} images={tweet.images} {...tweet} />
                        )
                    )
                )}
            </Route>

            <Route path="/home/tweet/:id" component={FullTweet} exact/>
        </Paper>
    );
};

export default Home;
