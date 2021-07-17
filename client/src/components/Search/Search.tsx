import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {InputAdornment} from "@material-ui/core";
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
import {UserApi} from "../../services/api/userApi";
import {useSearchStyles} from "./SearchStyles";

const Search: FC = () => {
    const classes2 = useSearchStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsTweetsLoading);
    const tweets = useSelector(selectTweetsItems);
    const location = useLocation<{ tag: string | undefined }>();
    const history = useHistory();

    const [text, setText] = React.useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        if (location.state?.tag !== undefined) {
            dispatch(fetchTweetsByTag(location.state?.tag));
            setText(decodeURIComponent(location.state?.tag));
        }
    }, [location.state?.tag]);

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
                UserApi.searchUsersByUsername(encodeURIComponent(text))
                    .then(data => setUsers(data))
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
        <Paper className={classes2.container} variant="outlined">
            <Paper className={classes2.header} variant="outlined">
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
                        <Tab style={{minWidth: "120px"}} onClick={showTopTweets} label="Top"/>
                        <Tab style={{minWidth: "120px"}} label="Latest"/>
                        <Tab style={{minWidth: "120px"}} onClick={showUsers} label="People"/>
                        <Tab style={{minWidth: "120px"}} onClick={showMediaTweets} label="Photos"/>
                        <Tab style={{minWidth: "120px"}} label="Videos"/>
                    </Tabs>
                </div>
            </Paper>
            {isLoading ? (
                <div className={classes2.loading}>
                    <CircularProgress/>
                </div>
            ) : (activeTab !== 2 ? (
                    tweets.map((tweet) => <Tweet key={tweet.id} images={tweet.images} {...tweet}/>)
                ) : (
                    users?.map((user) => <Follower user={user} follow={handleFollow} unfollow={handleUnfollow}/>))
            )}
        </Paper>
    );
};

export default Search;
