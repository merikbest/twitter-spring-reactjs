import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {Paper, Typography} from "@material-ui/core";

import {selectIsTweetsLoading, selectPagesCount, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {fetchUserBookmarks, resetTweets} from "../../store/ducks/tweets/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import TweetComponent from "../../components/TweetComponent/TweetComponent";
import Spinner from "../../components/Spinner/Spinner";
import {useGlobalStyles} from "../../util/globalClasses";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";

const Bookmarks: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
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
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <Paper className={globalClasses.pageHeader} variant="outlined">
                    <div className={globalClasses.pageHeaderTitleWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Bookmarks
                        </Typography>
                        <Typography variant={"subtitle2"} component={"div"}>
                            @{myProfile?.username}
                        </Typography>
                    </div>
                </Paper>
                <div className={globalClasses.contentWrapper}>
                    {(isLoading && tweets.length === 0) ? (
                        <Spinner/>
                    ) : (
                        (!isLoading && tweets.length === 0) ? (
                            <div className={globalClasses.infoText}>
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

export default withDocumentTitle(Bookmarks);
