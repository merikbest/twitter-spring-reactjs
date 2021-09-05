import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {Stomp} from '@stomp/stompjs';
import SockJS from "sockjs-client";

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
import {setTweet, setUpdatedTweet} from "./store/ducks/tweets/actionCreators";
import {selectTweetsItems} from "./store/ducks/tweets/selectors";

const App: FC = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const tweets = useSelector(selectTweetsItems);
    const notifications = useSelector(selectNotificationsItems);
    const isAuth = useSelector(selectIsAuth);
    const loadingStatus = useSelector(selectUserStatus);
    const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;

    const location = useLocation<{ background: any }>();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(fetchUserData());

        if (!isAuth && isReady && !location.pathname.includes("/account/login")) {
            history.push('/account/signin');
        }
    }, []);

    useEffect(() => {
        dispatch(fetchUserData());

        if (!localStorage.getItem('token')) {
            history.push('/account/signin');
        }
    }, []);

    useEffect(() => {
        if (myProfile) {
            let stompClient = Stomp.over(new SockJS(WS_URL));
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

                stompClient?.subscribe("/topic/feed", (response) => {
                    const isTweetExist = tweets.find((tweet) => tweet.id === JSON.parse(response.body).id);

                    if (isTweetExist) {
                        dispatch(setUpdatedTweet(JSON.parse(response.body)));
                    } else {
                        dispatch(setTweet(JSON.parse(response.body)));
                    }
                });
            });
        }
    }, [myProfile?.id]);

    return (
        <div className="App">
            <Layout>
                <Switch location={background || location}>
                    <Route path="/account/signin" component={Authentication} exact/>
                    <Route path="/account/login" component={Login} exact/>
                    <Route path="/account/forgot" component={ForgotPassword}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/search" component={Explore}/>
                    <Route path="/notifications" component={Notifications} exact/>
                    <Route path="/notification" component={NotificationInfo} exact/>
                    <Route path="/messages" component={Messages}/>
                    <Route path="/bookmarks" component={Bookmarks}/>
                    <Route path="/user/:id" component={UserPage} exact/>
                    <Route path="/user/:id/:follow" component={FollowingFollowers}/>
                </Switch>
                {background && <Route path="/modal/:id" children={<TweetImageModal/>}/>}
            </Layout>
        </div>
    );
}

export default App;
