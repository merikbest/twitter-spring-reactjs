import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {Paper, Typography} from "@material-ui/core";

import {selectIsTweetsLoading, selectPagesCount, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {useBookmarksStyles} from "./BookmarksStyles";
import {fetchUserBookmarks, resetTweets} from "../../store/ducks/tweets/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import TweetComponent from "../../components/TweetComponent/TweetComponent";
import Spinner from "../../components/Spinner/Spinner";

const Bookmarks: FC = (): ReactElement => {
    const classes = useBookmarksStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadBookmarks();

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    const loadBookmarks = () => {
        dispatch(fetchUserBookmarks(page));
        setPage(prevState => prevState + 1);
    };

    return (
        <InfiniteScroll
            style={{overflow: "unset"}}
            dataLength={tweets.length}
            next={loadBookmarks}
            hasMore={page < pagesCount}
            loader={null}
        >
            <Paper className={classes.container} variant="outlined">
                <Paper className={classes.header} variant="outlined">
                    <div>
                        <Typography component={"div"} className={classes.headerFullName}>
                            Bookmarks
                        </Typography>
                        <Typography component={"div"} className={classes.headerUsername}>
                            @{myProfile?.username}
                        </Typography>
                    </div>
                </Paper>
                <div className={classes.contentWrapper}>
                    {(isLoading && tweets.length === 0) ? (
                        <Spinner/>
                    ) : (
                        (!isLoading && tweets.length === 0) ? (
                            <div className={classes.infoWrapper}>
                                <Typography variant={"h4"} component={"div"}>
                                    You haven’t added any Tweets to your Bookmarks yet
                                </Typography>
                                <Typography variant={"subtitle1"} component={"div"}>
                                    When you do, they’ll show up here.
                                </Typography>
                            </div>
                        ) : (
                            <>
                                {tweets.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)}
                                {isLoading && <Spinner/>}
                            </>
                        )
                    )}
                </div>
            </Paper>
        </InfiniteScroll>
    );
};

export default Bookmarks;
