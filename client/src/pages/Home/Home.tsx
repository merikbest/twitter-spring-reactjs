import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route} from "react-router-dom";
import {CircularProgress, Paper, Typography} from "@material-ui/core";

import Tweet from "../../components/Tweet/Tweet";
import {useHomeStyles} from './HomeStyles';
import {AddTweetForm} from '../../components/AddTweetForm/AddTweetForm';
import {fetchTweets} from "../../store/ducks/tweets/actionCreators";
import {selectIsTweetsLoading, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {fetchTags} from "../../store/ducks/tags/actionCreators";
import {BackButton} from "../../components/BackButton/BackButton";
import {FullTweet} from "./FullTweet";
import {fetchUserData} from "../../store/ducks/user/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";

const Home: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useHomeStyles();
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);

    useEffect(() => {
        dispatch(fetchTweets());
        dispatch(fetchUserData());
        // dispatch(fetchTags());
    }, []);

    return (
        <Paper className={classes.tweetsWrapper} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
                <Route path="/home/:any">
                    <BackButton/>
                </Route>

                <Route path={['/home', '/home/search']} exact>
                    <Typography variant="h6">Твиты</Typography>
                </Route>

                <Route path="/home/tweet">
                    <Typography variant="h6">Твитнуть</Typography>
                </Route>
            </Paper>

            <Route path={['/home', '/home/search']} exact>
                <Paper>
                    <div className={classes.addForm}>
                        <AddTweetForm classes={classes}/>
                    </div>
                    <div className={classes.addFormBottomLine}/>
                </Paper>
            </Route>

            <Route path="/home" exact>
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
