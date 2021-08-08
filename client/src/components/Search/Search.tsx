import React, {ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {InputAdornment, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import {CircularProgress, Paper} from "@material-ui/core";

import {MainSearchTextField} from "../SearchTextField/MainSearchTextField";
import {
    fetchMediaTweets,
    fetchTweets,
    fetchTweetsByTag,
    fetchTweetsByText
} from "../../store/ducks/tweets/actionCreators";
import {BackButton} from "../BackButton/BackButton";
import Tweet from "../Tweet/Tweet";
import {selectIsTweetsLoading, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {User} from "../../store/ducks/user/contracts/state";
import Follower from "../Follower/Follower";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import {useSearchStyles} from "./SearchStyles";
import {EditIcon} from "../../icons";
import {fetchUsersSearch, fetchUsersSearchByUsername} from "../../store/ducks/usersSearch/actionCreators";
import {selectUsersSearch, selectUsersSearchIsLoading} from "../../store/ducks/usersSearch/selectors";

const Search: FC = (): ReactElement => {
    const classes = useSearchStyles();
    const dispatch = useDispatch();
    const isTweetsLoading = useSelector(selectIsTweetsLoading);
    const isUsersLoading = useSelector(selectUsersSearchIsLoading);
    const tweets = useSelector(selectTweetsItems);
    const users = useSelector(selectUsersSearch);
    const location = useLocation<{ tag: string | undefined; text: string | undefined; }>();
    const history = useHistory();
    const [text, setText] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        if (location.state?.tag !== undefined) {
            dispatch(fetchTweetsByTag(location.state?.tag));
            setText(decodeURIComponent(location.state?.tag));
        }

        if (location.state?.text !== undefined) {
            dispatch(fetchTweetsByText(location.state?.text));
            setText(decodeURIComponent(location.state?.text));
        }

        if (location.state?.tag === undefined && location.state?.text === undefined) {
            dispatch(fetchTweets());
        }
    }, [location.state?.tag, location.state?.text]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setText("");
        history.replace({pathname: location.pathname, state: {}});
        setActiveTab(newValue);
    };

    const handleClickSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (text !== "") {
            if (activeTab !== 2) {
                dispatch(fetchTweetsByText(encodeURIComponent(text)));
            } else {
                dispatch(fetchUsersSearchByUsername(encodeURIComponent(text)));
            }
        }
    };

    const showTopTweets = (): void => {
        window.scrollTo(0, 0);
        dispatch(fetchTweets());
    };

    const showUsers = (): void => {
        window.scrollTo(0, 0);
        dispatch(fetchUsersSearch());
    };

    const showMediaTweets = (): void => {
        window.scrollTo(0, 0);
        dispatch(fetchMediaTweets());
    };

    const handleFollow = (user: User): void => {
        dispatch(followUser(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <div>
                    <form onSubmit={handleClickSearch}>
                        <div style={{display: "inline-block", paddingTop: 5}}>
                            <BackButton/>
                        </div>
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
                        <div className={classes.editButton}>
                            <IconButton color="primary">
                                <span>{EditIcon}</span>
                            </IconButton>
                        </div>
                    </form>
                    <div className={classes.tabs}>
                        <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                            <Tab onClick={showTopTweets} label="Top"/>
                            <Tab label="Latest"/>
                            <Tab onClick={showUsers} label="People"/>
                            <Tab onClick={showMediaTweets} label="Photos"/>
                            <Tab label="Videos"/>
                        </Tabs>
                    </div>
                </div>
            </Paper>
            <div style={{paddingTop: 97}}>
                {isTweetsLoading || isUsersLoading ? (
                    <div className={classes.loading}>
                        <CircularProgress/>
                    </div>
                ) : (activeTab !== 2 ? (
                        tweets.map((tweet) => <Tweet key={tweet.id} images={tweet.images} {...tweet}/>)
                    ) : (
                        users?.map((user) => <Follower user={user} follow={handleFollow} unfollow={handleUnfollow}/>))
                )}
            </div>
        </Paper>
    );
};

export default Search;
