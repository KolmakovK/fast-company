import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Users from './layouts/users'
import NavBar from './components/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import UserPage from './components/userPage'

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={UserPage} />
        <Route path="/users" component={Users} />
      </Switch>
    </div>
  )
}

export default App
