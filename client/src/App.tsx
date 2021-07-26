import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {makeStyles, Theme} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import SignIn from './pages/SignIn/SignIn';
import Home from "./pages/Home/Home";
import {Layout} from './pages/Layout';
import UserPage from "./pages/UserPage/UserPage";
import {selectIsAuth, selectLoginErrorStatus, selectUserStatus} from "./store/ducks/user/selectors";
import {LoadingStatus} from './store/types';
import {fetchUserData} from './store/ducks/user/actionCreators';
import ActivatePage from "./pages/ActivatePage/ActivatePage";
import Search from './components/Search/Search';
import FollowingFollowers from "./components/FollowingFollowers/FollowingFollowers";
import TweetImageModal from "./components/TweetImageModal/TweetImageModal";
import Login from "./pages/Login/Login";

export const useAppStyles = makeStyles((theme: Theme) => ({
    centered: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        "& svg": {
            width: 80,
            height: 80,
        },
    },
}));

const App: FC = (): ReactElement => {
    const classes = useAppStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const loadingStatus = useSelector(selectUserStatus);
    const errorStatus = useSelector(selectLoginErrorStatus);
    const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;

    const location = useLocation<{ background: any }>();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    useEffect(() => {
        if (errorStatus === 403) {
            history.push('/login');
        } else if (!isAuth && isReady) {
            history.push("/signin");
        } else if (history.location.pathname === '/') {
            history.push('/home');
        }
    }, [isAuth, isReady]);

    if (!isReady) {
        return (
            <div className={classes.centered}>
                <TwitterIcon color="primary" />
            </div>
        );
    }

    return (
        <div className="App">
            <Layout>
                <Switch location={background || location}>
                    <Route path="/signin" component={SignIn} exact/>
                    <Route path="/login" component={Login} exact/>
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
