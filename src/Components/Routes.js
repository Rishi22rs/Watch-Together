import React from 'react'
import App from '../App'
import Landing from './Landing'

import{BrowserRouter as Router,Route, Switch} from 'react-router-dom'

const Routes = () => (
    <Router>
        <Switch>
            <Route path='/' exact component={Landing}/>
        </Switch>
        <Switch>
            <Route path='/HeyGuys/:room' component={App}/>
        </Switch>
    </Router>
)
 
export default Routes;