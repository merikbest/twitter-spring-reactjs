import React, {FC, ReactElement} from 'react';
import {Route, Switch} from 'react-router-dom';

import SignIn from './pages/SignIn/SignIn';
import Home from "./pages/Home/Home";
import {Layout} from './pages/Layout';
import {User} from "./pages/User/User";

const App: FC = (): ReactElement => {

    return (
        <div className="App">
            <Switch>
                <Route path="/signin" component={SignIn} exact/>
                <Layout>
                    <Route path="/home" component={Home}/>
                    <Route path="/user" component={User}/>
                </Layout>
            </Switch>
        </div>
    );
}

export default App;
