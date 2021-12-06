import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {Stomp} from '@stomp/stompjs';
import SockJS from "sockjs-client";
import CssBaseline from "@material-ui/core/CssBaseline";
import {MuiThemeProvider, Theme} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {deepmerge} from "@mui/utils";

import Authentication from './pages/Authentication/Authentication';
import Home from "./pages/Home/Home";
import {Layout} from './pages/Layout';
import UserPage from "./pages/UserPage/UserPage";
import {selectIsAuth, selectUserData, selectUserStatus} from "./store/ducks/user/selectors";
import {LoadingStatus} from './store/types';
import {fetchUserData, setNewNotification, setUnreadMessage} from './store/ducks/user/actionCreators';
import Explore from './pages/Explore/Explore';
import FollowingFollowers from "./pages/FollowingFollowers/FollowingFollowers";
import TweetImageModal from "./components/TweetImageModal/TweetImageModal";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Notifications from "./pages/Notifications/Notifications";
import NotificationInfo from "./pages/Notifications/NotificationInfo/NotificationInfo";
import Messages from "./pages/Messages/Messages";
import {setChatMessage} from "./store/ducks/chatMessages/actionCreators";
import {WS_URL} from "./util/url";
import {setNotification} from "./store/ducks/notifications/actionCreators";
import {selectNotificationsItems} from "./store/ducks/notifications/selectors";
import {deleteTweet, setScheduledTweets, setTweet, setUpdatedTweet} from "./store/ducks/tweets/actionCreators";
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
import {BackgroundTheme, ColorScheme} from "./pages/Settings/AccessibilityDisplayLanguages/Display/Display";

const App: FC = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const notifications = useSelector(selectNotificationsItems);
    const isAuth = useSelector(selectIsAuth);
    const loadingStatus = useSelector(selectUserStatus);
    const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;
    const [colorScheme, setColorScheme] = useState<ThemeOptions>(blueColor as ThemeOptions);
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const location = useLocation<{ background: any }>();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(fetchUserData());

        if (!isAuth && isReady && !location.pathname.includes("/account/login")) {
            history.push('/account/signin');
        }
        if (!localStorage.getItem('token')) {
            history.push('/account/signin');
        }
    }, []);

    useEffect(() => {
        let stompClient = Stomp.over(new SockJS(WS_URL));

        stompClient.connect({}, () => {
            stompClient?.subscribe("/topic/feed", (response) => {
                if (JSON.parse(response.body).tweetDeleted) {
                    dispatch(deleteTweet(JSON.parse(response.body)));
                } else {
                    dispatch(setUpdatedTweet(JSON.parse(response.body)));
                }
            });

            stompClient?.subscribe("/topic/feed/add", (response) => {
                dispatch(setTweet(JSON.parse(response.body)));
            });

            stompClient?.subscribe("/topic/feed/schedule", (response) => {
                dispatch(setScheduledTweets(JSON.parse(response.body)));
            });
        });

        const background = localStorage.getItem("background");
        const color = localStorage.getItem("color");
        processColorScheme((color !== null) ? color as ColorScheme : ColorScheme.BLUE);
        processBackgroundColor(background as BackgroundTheme);
    }, []);

    useEffect(() => {
        let stompClient = Stomp.over(new SockJS(WS_URL));

        if (myProfile) {
            stompClient.connect({}, () => {
                stompClient?.subscribe("/topic/chat/" + myProfile.id, (response) => {
                    dispatch(setChatMessage(JSON.parse(response.body)));

                    if (myProfile.id !== JSON.parse(response.body).author.id) {
                        dispatch(setUnreadMessage(JSON.parse(response.body)));
                    }
                });

                stompClient?.subscribe("/topic/notifications/" + myProfile.id, (response) => {
                    const isNotificationExist = notifications.find(notification => notification.id === JSON.parse(response.body).id);

                    if (!isNotificationExist) {
                        dispatch(setNotification(JSON.parse(response.body)));
                        dispatch(setNewNotification());
                    }
                });
            });
        }
    }, [myProfile?.id]);

    const changeBackgroundColor = (background: BackgroundTheme): void => {
        processBackgroundColor(background);
        localStorage.setItem("background", background);
    };

    const changeColorScheme = (color: ColorScheme): void => {
        processColorScheme(color);
        localStorage.setItem("color", color);
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
        <MuiThemeProvider theme={createMuiTheme(deepmerge(theme, colorScheme))}>
            <CssBaseline/>
            <div className="App">
                <Layout changeBackgroundColor={changeBackgroundColor} changeColorScheme={changeColorScheme}>
                    <Switch location={background || location}>
                        <Route path="/account/signin" component={Authentication} exact/>
                        <Route path="/account/login" component={Login} exact/>
                        <Route path="/account/forgot" component={ForgotPassword}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/search" component={Explore}/>
                        <Route path="/notifications" component={Notifications} exact/>
                        <Route path="/notification" component={NotificationInfo} exact/>
                        <Route path="/messages" component={Messages}/>
                        <Route path="/settings"
                               render={() => <Settings
                                   changeBackgroundColor={changeBackgroundColor}
                                   changeColorScheme={changeColorScheme}/>
                               }/>
                        <Route path="/bookmarks" component={Bookmarks}/>
                        <Route path="/suggested" component={SuggestedLists}/>
                        <Route path="/lists" component={Lists} exact/>
                        <Route path="/lists/memberships/:id" component={ListsMemberships} exact/>
                        <Route path="/lists/:listId" component={FullList} exact/>
                        <Route path="/user/:id" component={UserPage} exact/>
                        <Route path="/user/:id/:follow" component={FollowingFollowers}/>
                    </Switch>
                    {background && <Route path="/modal/:id" children={<TweetImageModal/>}/>}
                </Layout>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
