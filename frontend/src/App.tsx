import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, Theme } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createTheme";
import { deepmerge } from "@mui/utils";

import Authentication from "./pages/Authentication/Authentication";
import Home from "./pages/Home/Home";
import { Layout } from "./pages/Layout";
import UserPage from "./pages/UserPage/UserPage";
import { selectIsAuth, selectUserDataId, selectUserStatus } from "./store/ducks/user/selectors";
import { fetchUserData, setNewMention, setNewNotification, setUnreadMessage } from "./store/ducks/user/actionCreators";
import Explore from "./pages/Explore/Explore";
import FollowingFollowers from "./pages/FollowingFollowers/FollowingFollowers";
import TweetImageModal from "./components/TweetImageModal/TweetImageModal";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Notifications from "./pages/Notifications/Notifications";
import NotificationInfo from "./pages/Notifications/NotificationsPage/NotificationInfo/NotificationInfo";
import Messages from "./pages/Messages/Messages";
import { setChatMessage } from "./store/ducks/chatMessages/actionCreators";
import { WS_URL } from "./constants/endpoint-constants";
import { setNotification, updateNotificationInfoTweet } from "./store/ducks/notifications/actionCreators";
import { selectNotificationsList } from "./store/ducks/notifications/selectors";
import { setScheduledTweets, setTweet, setUpdatedTweet, setVote } from "./store/ducks/tweets/actionCreators";
import Lists from "./pages/Lists/Lists";
import FullList from "./pages/FullList/FullList";
import SuggestedLists from "./pages/SuggestedLists/SuggestedLists";
import ListsMemberships from "./pages/Lists/ListsMemberships/ListsMemberships";
import Settings from "./pages/Settings/Settings";
import {
    blueColor,
    crimsonColor,
    defaultTheme,
    dimTheme,
    greenColor,
    lightsOutTheme,
    orangeColor,
    violetColor,
    yellowColor
} from "./theme";
import NotificationsTimeline from "./pages/Notifications/NotificationsPage/NotificationsTimeline/NotificationsTimeline";
import FollowersYouKnow from "./pages/FollowersYouKnow/FollowersYouKnow";
import { fetchTags } from "./store/ducks/tags/actionCreators";
import { fetchRelevantUsers } from "./store/ducks/users/actionCreators";
import UserImageModal from "./pages/UserPage/UserImageModal/UserImageModal";
import {
    ACCOUNT_FORGOT,
    ACCOUNT_LOGIN,
    ACCOUNT_SIGNIN,
    BOOKMARKS,
    HOME,
    HOME_CONNECT,
    HOME_TRENDS,
    HOME_TWEET,
    LISTS,
    LISTS_MEMBERSHIPS,
    MESSAGES,
    MODAL,
    NOTIFICATION,
    NOTIFICATIONS,
    NOTIFICATIONS_TIMELINE,
    PROFILE,
    PROFILE_HEADER_PHOTO,
    PROFILE_PHOTO,
    QUOTES,
    SEARCH,
    SETTINGS,
    SUGGESTED,
    TOPICS,
    USER,
    USER_FOLLOWERS_YOU_FOLLOW
} from "./constants/path-constants";
import QuoteTweets from "./pages/QuoteTweets/QuoteTweets";
import { BackgroundTheme, ColorScheme, LoadingStatus } from "./types/common";
import ActionSnackbar from "./components/ActionSnackbar/ActionSnackbar";
import FullTweet from "./pages/FullTweet/FullTweet";
import Connect from "./pages/Connect/Connect";
import Trends from "./pages/Trends/Trends";
import Topics from "./pages/Topics/Topics";
import UserTopics from "./pages/UserTopics/UserTopics";
import {
    TOPIC_CHAT,
    TOPIC_FEED,
    TOPIC_FEED_ADD,
    TOPIC_FEED_SCHEDULE,
    TOPIC_FEED_VOTE,
    TOPIC_MENTIONS,
    TOPIC_NOTIFICATIONS
} from "./constants/ws-constants";
import { BACKGROUND, COLOR, TOKEN } from "./constants/common-constants";

const App: FC = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);
    const notifications = useSelector(selectNotificationsList);
    const isAuth = useSelector(selectIsAuth);
    const loadingStatus = useSelector(selectUserStatus);
    const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;
    const [colorScheme, setColorScheme] = useState<ThemeOptions>(blueColor as ThemeOptions);
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const location = useLocation<{ background: any }>();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(fetchUserData());

        if (!isAuth && isReady && !location.pathname.includes(ACCOUNT_LOGIN)) {
            history.push(ACCOUNT_SIGNIN);
        }
        if (!localStorage.getItem(TOKEN)) {
            history.push(ACCOUNT_SIGNIN);
        }
    }, []);

    useEffect(() => {
        let stompClient = Stomp.over(new SockJS(WS_URL));

        stompClient.connect({}, () => {
            stompClient?.subscribe(TOPIC_FEED, (response) => {
                dispatch(setUpdatedTweet(JSON.parse(response.body)));
                dispatch(updateNotificationInfoTweet(JSON.parse(response.body)));
            });

            stompClient?.subscribe(TOPIC_FEED_ADD, (response) => {
                dispatch(setTweet(JSON.parse(response.body)));
            });

            stompClient?.subscribe(TOPIC_FEED_SCHEDULE, (response) => {
                dispatch(setScheduledTweets(JSON.parse(response.body)));
            });

            stompClient?.subscribe(TOPIC_FEED_VOTE, (response) => {
                dispatch(setVote(JSON.parse(response.body)));
            });
        });

        const background = localStorage.getItem(BACKGROUND);
        const color = localStorage.getItem(COLOR);
        processColorScheme((color !== null) ? color as ColorScheme : ColorScheme.BLUE);
        processBackgroundColor(background as BackgroundTheme);
    }, []);

    useEffect(() => {
        let stompClient = Stomp.over(new SockJS(WS_URL));

        if (myProfileId) {
            if (location.pathname !== HOME_CONNECT) {
                dispatch(fetchRelevantUsers());
            }
            dispatch(fetchTags());

            stompClient.connect({}, () => {
                stompClient?.subscribe(TOPIC_CHAT(myProfileId), (response) => {
                    dispatch(setChatMessage(JSON.parse(response.body)));

                    if (myProfileId !== JSON.parse(response.body).authorId) {
                        dispatch(setUnreadMessage(JSON.parse(response.body)));
                    }
                });

                stompClient?.subscribe(TOPIC_NOTIFICATIONS(myProfileId), (response) => {
                    const isNotificationExist = notifications.find(notification => notification.id === JSON.parse(response.body).id);

                    if (!isNotificationExist) {
                        dispatch(setNotification(JSON.parse(response.body)));
                        dispatch(setNewNotification());
                    }
                });

                stompClient?.subscribe(TOPIC_MENTIONS(myProfileId), () => {
                    dispatch(setNewMention());
                });
            });
        }
    }, [myProfileId]);

    const changeBackgroundColor = (background: BackgroundTheme): void => {
        processBackgroundColor(background);
        localStorage.setItem(BACKGROUND, background);
    };

    const changeColorScheme = (color: ColorScheme): void => {
        processColorScheme(color);
        localStorage.setItem(COLOR, color);
    };

    const processBackgroundColor = (background: BackgroundTheme): void => {
        if (background === BackgroundTheme.DEFAULT) {
            setTheme(defaultTheme);
        } else if (background === BackgroundTheme.DIM) {
            setTheme(dimTheme);
        } else if (background === BackgroundTheme.LIGHTS_OUT) {
            setTheme(lightsOutTheme);
        }
    };

    const processColorScheme = (color: ColorScheme): void => {
        if (color === ColorScheme.BLUE) {
            setColorScheme(blueColor);
        } else if (color === ColorScheme.YELLOW) {
            setColorScheme(yellowColor);
        } else if (color === ColorScheme.CRIMSON) {
            setColorScheme(crimsonColor);
        } else if (color === ColorScheme.VIOLET) {
            setColorScheme(violetColor);
        } else if (color === ColorScheme.ORANGE) {
            setColorScheme(orangeColor);
        } else if (color === ColorScheme.GREEN) {
            setColorScheme(greenColor);
        } else {
            setColorScheme(blueColor);
        }
    };

    return (
        <MuiThemeProvider theme={createTheme(deepmerge(theme, colorScheme))}>
            <CssBaseline />
            <div className="App">
                <Layout changeBackgroundColor={changeBackgroundColor} changeColorScheme={changeColorScheme}>
                    <Switch location={background || location}>
                        <Route path={ACCOUNT_SIGNIN} component={Authentication} exact />
                        <Route path={ACCOUNT_LOGIN} component={Login} exact />
                        <Route path={ACCOUNT_FORGOT} component={ForgotPassword} />
                        <Route path={HOME} component={Home} exact />
                        <Route path={HOME_CONNECT} component={Connect} exact />
                        <Route path={HOME_TRENDS} component={Trends} exact />
                        <Route path={`${HOME_TWEET}/:id`} component={FullTweet} exact />
                        <Route path={SEARCH} component={Explore} />
                        <Route path={NOTIFICATIONS} component={Notifications} />
                        <Route path={NOTIFICATIONS_TIMELINE} component={NotificationsTimeline} exact />
                        <Route path={`${NOTIFICATION}/:id`} component={NotificationInfo} exact />
                        <Route path={MESSAGES} component={Messages} />
                        <Route path={SETTINGS}
                               render={() => <Settings
                                   changeBackgroundColor={changeBackgroundColor}
                                   changeColorScheme={changeColorScheme} />
                               } />
                        <Route path={BOOKMARKS} component={Bookmarks} />
                        <Route path={`${TOPICS}/:topics`} component={Topics} />
                        <Route path={`${QUOTES}/:tweetId`} component={QuoteTweets} />
                        <Route path={SUGGESTED} component={SuggestedLists} />
                        <Route path={LISTS} component={Lists} exact />
                        <Route path={`${LISTS_MEMBERSHIPS}/:id`} component={ListsMemberships} exact />
                        <Route path={`${LISTS}/:listId`} component={FullList} exact />
                        <Route path={`${PROFILE}/:userId`} component={UserPage} exact />
                        <Route path={`${PROFILE}/:userId${TOPICS}`} component={UserTopics} exact />
                        <Route path={`${USER_FOLLOWERS_YOU_FOLLOW}/:id`} component={FollowersYouKnow} exact />
                        <Route path={`${USER}/:id/:follow`} component={FollowingFollowers} exact />
                    </Switch>
                    {background && <Route path={`${MODAL}/:id`} children={<TweetImageModal />} />}
                    {background && <Route path={`${PROFILE_PHOTO}/:id`} children={<UserImageModal />} />}
                    {background && <Route path={`${PROFILE_HEADER_PHOTO}/:id`} children={<UserImageModal />} />}
                </Layout>
                <ActionSnackbar />
            </div>
        </MuiThemeProvider>
    );
};

export default App;
