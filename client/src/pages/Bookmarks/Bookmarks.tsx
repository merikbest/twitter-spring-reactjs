import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Paper} from "@material-ui/core";

import {selectIsTweetsLoading, selectPagesCount, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {fetchUserBookmarks, resetTweets} from "../../store/ducks/tweets/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import TweetComponent from "../../components/TweetComponent/TweetComponent";
import Spinner from "../../components/Spinner/Spinner";
import {useGlobalStyles} from "../../util/globalClasses";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import EmptyPageDescription from "../../components/EmptyPageDescription/EmptyPageDescription";
import PageHeaderWrapper from "../../components/PageHeaderWrapper/PageHeaderWrapper";
import PageHeaderTitle from "../../components/PageHeaderTitle/PageHeaderTitle";

const Bookmarks: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadBookmarks(0);

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    const loadBookmarks = (page: number): void => {
        dispatch(fetchUserBookmarks(page));
    };

    return (
        <InfiniteScrollWrapper dataLength={tweets.length} pagesCount={pagesCount} loadItems={loadBookmarks}>
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <PageHeaderWrapper>
                    <div className={globalClasses.pageHeaderTitleWrapper}>
                        <PageHeaderTitle title={"Bookmarks"} subtitle={`@${myProfile?.username}`}/>
                    </div>
                </PageHeaderWrapper>
                <div className={globalClasses.contentWrapper}>
                    {(isLoading && !tweets.length) ? (
                        <Spinner/>
                    ) : (
                        (!isLoading && !tweets.length) ? (
                            <EmptyPageDescription 
                                title={"You haven’t added any Tweets to your Bookmarks yet"} 
                                subtitle={"When you do, they’ll show up here."} 
                            />
                        ) : (
                            <>
                                {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet}/>)}
                                {isLoading && <Spinner/>}
                            </>
                        )
                    )}
                </div>
            </Paper>
        </InfiniteScrollWrapper>
    );
};

export default withDocumentTitle(Bookmarks)("Bookmarks");
