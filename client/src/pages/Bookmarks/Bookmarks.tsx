import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress, Paper, Typography} from "@material-ui/core";

import {selectIsTweetsLoading, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {useBookmarksStyles} from "./BookmarksStyles";
import {fetchUserBookmarks} from "../../store/ducks/tweets/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import TweetComponent from "../../components/TweetComponent/TweetComponent";

const Bookmarks: FC = (): ReactElement => {
    const classes = useBookmarksStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);

    useEffect(() => {
        dispatch(fetchUserBookmarks());
        window.scrollTo(0, 0);
    }, []);

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <div>
                    <Typography variant="h6">Bookmarks</Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        @{myProfile?.username}
                    </Typography>
                </div>
            </Paper>
            <div style={{paddingTop: 48,}}>
                {isLoading ? (
                    <div className={classes.loading}>
                        <CircularProgress/>
                    </div>
                ) : ((tweets.length === 0) ? (
                        <div className={classes.infoWrapper}>
                            <div className={classes.infoTitle}>You haven’t added any Tweets to your Bookmarks yet</div>
                            <div className={classes.infoText}>When you do, they’ll show up here.</div>
                        </div>
                    ) : (
                        <div>
                            {tweets.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)}
                        </div>
                    )
                )}
            </div>
        </Paper>

    );
};

export default Bookmarks;
