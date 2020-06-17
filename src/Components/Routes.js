import React from 'react'
import App from '../App'
import Landing from './Landing'
import MyVideo from './MyVideo'

import{BrowserRouter as Router,Route, Switch} from 'react-router-dom'

const Routes = () => (
    <Router>
        <Switch>
            <Route path='/' exact component={Landing}/>
        </Switch>
        <Switch>
            <Route path='/HeyGuys/:room' component={App}/>
        </Switch>
        <Switch>
            <Route path='/MyVideo' component={MyVideo}/>
        </Switch>
    </Router>
)
 
export default Routes;