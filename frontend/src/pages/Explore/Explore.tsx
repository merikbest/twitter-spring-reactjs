import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { IconButton, InputAdornment, Paper } from "@material-ui/core";

import { MainSearchTextField } from "../../components/SearchTextField/MainSearchTextField";
import {
    fetchMediaTweets,
    fetchTweets,
    fetchTweetsByTag,
    fetchTweetsByText,
    fetchTweetsWithVideo,
    resetTweets
} from "../../store/ducks/tweets/actionCreators";
import BackButton from "../../components/BackButton/BackButton";
import { selectPagesCount, selectTweetsItemsSize } from "../../store/ducks/tweets/selectors";
import { useExploreStyles } from "./ExploreStyles";
import { EditIcon, SearchIcon } from "../../icons";
import {
    fetchUsersSearch,
    fetchUsersSearchByUsername,
    resetUsersState
} from "../../store/ducks/usersSearch/actionCreators";
import { selectUsersPagesCount } from "../../store/ducks/usersSearch/selectors";
import { useGlobalStyles } from "../../util/globalClasses";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import PageHeaderWrapper from "../../components/PageHeaderWrapper/PageHeaderWrapper";
import UsersList from "./UsersList/UsersList";
import TweetsList from "./TweetsList/TweetsList";
import {
    FetchTweetsByTagActionInterface,
    FetchTweetsByTextActionInterface
} from "../../store/ducks/tweets/contracts/actionTypes";

const Explore: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useExploreStyles();
    const dispatch = useDispatch();
    const tweetsSize = useSelector(selectTweetsItemsSize);
    const tweetsPagesCount = useSelector(selectPagesCount);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const location = useLocation<{ tag: string | undefined; text: string | undefined; }>();
    const history = useHistory();
    const [searchText, setSearchText] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadTweets();

        return () => {
            dispatch(resetTweets());
            history.replace({ state: {} });
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (location.state?.tag) {
            fetchTweetsByStateText(fetchTweetsByTag({ tag: location.state.tag, pageNumber: 0 }), location.state.tag);
        }
        if (location.state?.text) {
            fetchTweetsByStateText(fetchTweetsByText({ text: location.state.text, pageNumber: 0 }), location.state.text);
        }

        return () => {
            dispatch(resetTweets());
        };
    }, [location.state]);

    const fetchTweetsByStateText = (fetch: FetchTweetsByTextActionInterface | FetchTweetsByTagActionInterface, stateText: string): void => {
        dispatch(fetch);
        setSearchText(decodeURIComponent(stateText));
        setPageNumber(prevState => prevState + 1);
    };

    const loadTweets = (): void => {
        if (searchText) {
            const encodedText = encodeURIComponent(searchText);

            if (activeTab !== 2) {
                dispatch(fetchTweetsByText({ text: encodedText, pageNumber }));
            } else {
                dispatch(fetchUsersSearchByUsername({ username: encodedText, pageNumber }));
            }
        } else {
            if (activeTab === 2) {
                dispatch(fetchUsersSearch(pageNumber));
            } else if (activeTab === 3) {
                dispatch(fetchMediaTweets(pageNumber));
            } else if (activeTab === 4) {
                dispatch(fetchTweetsWithVideo(pageNumber));
            } else {
                dispatch(fetchTweets(pageNumber));
            }
        }
        setPageNumber(prevState => prevState + 1);
    };

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setSearchText("");
        setActiveTab(newValue);
    };

    const handleSubmitSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (searchText) {
            const encodedText = encodeURIComponent(searchText);

            if (activeTab !== 2) {
                dispatch(resetTweets());
                dispatch(fetchTweetsByText({ text: encodedText, pageNumber: 0 }));
            } else {
                dispatch(resetUsersState());
                dispatch(fetchUsersSearchByUsername({ username: encodedText, pageNumber: 0 }));
            }
        }
    };

    const handleSearchText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setSearchText(event.target.value);
    };

    const handleShowItems = (callback: () => void): void => {
        window.scrollTo(0, 0);
        setPageNumber(0);
        dispatch(resetTweets());
        dispatch(resetUsersState());
        callback();
        setPageNumber(prevState => prevState + 1);
    };

    const showTopTweets = (): void => {
        dispatch(fetchTweets(0));
    };

    const showUsers = (): void => {
        dispatch(fetchUsersSearch(0));
    };

    const showMediaTweets = (): void => {
        dispatch(fetchMediaTweets(0));
    };

    const showTweetsWithVideos = (): void => {
        dispatch(fetchTweetsWithVideo(0));
    };

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <PageHeaderWrapper>
                <div>
                    <form style={{ display: "block" }} onSubmit={handleSubmitSearch}>
                        <div className={classes.backButtonWrapper}>
                            <BackButton />
                        </div>
                        <MainSearchTextField
                            variant="outlined"
                            placeholder="Explore Twitter"
                            onChange={handleSearchText}
                            value={searchText}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SearchIcon}
                                    </InputAdornment>
                                )
                            }}
                        />
                        <IconButton className={classes.editButton} color="primary" size="small">
                            <>{EditIcon}</>
                        </IconButton>
                    </form>
                    <div className={classes.tabs}>
                        <Tabs value={activeTab} onChange={handleChangeTab} indicatorColor="primary" textColor="primary">
                            <Tab onClick={() => handleShowItems(showTopTweets)} label="Top" />
                            <Tab onClick={() => handleShowItems(showTopTweets)} label="Latest" />
                            <Tab onClick={() => handleShowItems(showUsers)} label="People" />
                            <Tab onClick={() => handleShowItems(showMediaTweets)} label="Photos" />
                            <Tab onClick={() => handleShowItems(showTweetsWithVideos)} label="Videos" />
                        </Tabs>
                    </div>
                </div>
            </PageHeaderWrapper>
            <div className={classes.contentWrapper}>
                <InfiniteScroll
                    style={{ overflow: "unset" }}
                    dataLength={tweetsSize}
                    next={loadTweets}
                    hasMore={pageNumber < (activeTab === 2 ? usersPagesCount : tweetsPagesCount)}
                    loader={null}
                >
                    {(activeTab === 2) ? (
                        <UsersList />
                    ) : (
                        <TweetsList />
                    )}
                </InfiniteScroll>
            </div>
        </Paper>
    );
};

export default withDocumentTitle(Explore)("Explore");
