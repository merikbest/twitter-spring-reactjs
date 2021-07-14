import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';

import SignIn from './pages/SignIn/SignIn';
import Home from "./pages/Home/Home";
import {Layout} from './pages/Layout';
import UserPage from "./pages/UserPage/UserPage";
import {selectIsAuth, selectUserStatus} from "./store/ducks/user/selectors";
import {useHomeStyles} from './pages/Home/HomeStyles';
import {LoadingStatus} from './store/types';
import TwitterIcon from "@material-ui/icons/Twitter";
import {fetchUserData} from './store/ducks/user/actionCreators';
import ActivatePage from "./pages/ActivatePage/ActivatePage";
import Search from './components/Search/Search';
import FollowingFollowers from "./components/FollowingFollowers/FollowingFollowers";
import TweetImageModal from "./components/TweetImageModal/TweetImageModal";

const App: FC = (): ReactElement => {
    const classes = useHomeStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const loadingStatus = useSelector(selectUserStatus);
    const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;

    const location = useLocation<{ background: any }>();
    const background = location.state && location.state.background;

    // useEffect(() => {
    //     // dispatch(fetchUserData());
    // }, []);
    //
    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         history.push('/signin');
    //     } else {
    //         // history.push('/home');
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isAuth, isReady]);
    //
    // if (!isReady) {
    //     return (
    //         <div className={classes.centered}>
    //             <TwitterIcon color="primary" style={{width: 80, height: 80}}/>
    //         </div>
    //     );
    // }

    return (
        <div className="App">
            <Layout>
                <Switch location={background || location}>
                    <Route path="/signin" component={SignIn} exact/>
                    <Route path="/home" component={Home}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/user/:id" component={UserPage} exact/>
                    <Route path="/user/:id/:follow" component={FollowingFollowers}/>
                    <Route path="/user/activate/:hash" component={ActivatePage} exact/>
                </Switch>
                {background && <Route path="/modal/:id" children={<TweetImageModal/>}/>}
            </Layout>
        </div>
    );
}

export default App;
