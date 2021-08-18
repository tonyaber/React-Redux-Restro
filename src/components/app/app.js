import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import Background from './food-bg.jpg';
import { Switch,Route } from 'react-router-dom';

const App = () => {
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={50} />
            <Switch>
                <Route path='/' exact component={MainPage} />
                <Route path='/cart' component={CartPage} />
                <Route exact component={MainPage} />
            </Switch>
        </div>
    )
}

export default App;