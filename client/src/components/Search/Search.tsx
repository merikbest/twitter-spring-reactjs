import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {InputAdornment} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import {CircularProgress, Paper, Typography} from "@material-ui/core";

import {MainSearchTextField} from "../SearchTextField/MainSearchTextField";
import {
    fetchMediaTweets,
    fetchTweets,
    fetchTweetsByTag,
    fetchTweetsByText
} from "../../store/ducks/tweets/actionCreators";
import {BackButton} from "../BackButton/BackButton";
import {useHomeStyles} from "../../pages/Home/HomeStyles";
import Tweet from "../Tweet/Tweet";
import {selectIsTweetsLoading, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {User} from "../../store/ducks/user/contracts/state";
import Follower from "../FollowingFollowers/Follower";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import {UserApi} from "../../services/api/userApi";

const Search: FC = () => {
    const classes = useHomeStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsTweetsLoading);
    const tweets = useSelector(selectTweetsItems);
    const location = useLocation<{ tag: string | undefined }>();

    const [text, setText] = React.useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        if (location.state?.tag !== undefined) {
            dispatch(fetchTweetsByTag(location.state?.tag));
            setText(decodeURIComponent(location.state?.tag));
        }
    }, [location]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const handleClickSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (text !== "") {
            if (activeTab !== 2) {
                dispatch(fetchTweetsByText(encodeURIComponent(text)));
            } else {
                UserApi.searchUsersByUsername(encodeURIComponent(text)).then((data) => {
                    setUsers(data);
                });
            }
        }
    };

    const showTopTweets = (): void => {
        dispatch(fetchTweets());
    };

    const showUsers = (): void => {
        UserApi.getUsers().then((data) => {
            setUsers(data);
        });
    };

    const showMediaTweets = (): void => {
        dispatch(fetchMediaTweets());
    };

    const handleFollow = (user: User): void => {
        dispatch(followUser(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
    };

    return (
        <Paper className={classes.tweetsWrapper} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
                <div>
                    <form onSubmit={handleClickSearch}>
                        <BackButton/>
                        <MainSearchTextField
                            variant="outlined"
                            placeholder="Search Twitter"
                            onChange={(event) => setText(event.target.value)}
                            value={text}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab onClick={showTopTweets} style={{minWidth: "120px"}} label="Top"/>
                        <Tab style={{minWidth: "120px"}} label="Latest"/>
                        <Tab onClick={showUsers} style={{minWidth: "120px"}} label="People"/>
                        <Tab onClick={showMediaTweets} style={{minWidth: "120px"}} label="Photos"/>
                        <Tab style={{minWidth: "120px"}} label="Videos"/>
                    </Tabs>
                </div>
            </Paper>
            {isLoading ? (
                <div className={classes.tweetsCentred}>
                    <CircularProgress/>
                </div>
            ) : (activeTab !== 2 ? (
                    tweets.map((tweet) =>
                        <Tweet key={tweet.id} classes={classes} images={tweet.images} {...tweet}/>)
                ) : (
                    users?.map((user) =>
                        <Follower classes={classes} user={user} follow={handleFollow} unfollow={handleUnfollow}/>))
            )}
        </Paper>
    );
};

export default Search;
