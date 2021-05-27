import React, {FC, ReactElement} from 'react';
import {Route, Switch} from 'react-router-dom';

import SignIn from './pages/SignIn';
import Home from "./pages/Home/Home";


const App: FC = (): ReactElement => {

    return (
        <div className="App">
            <Switch>
                <Route path="/signin" component={SignIn}/>
                <Route path="/home" component={Home}/>
            </Switch>
        </div>
    );
}

export default App;
