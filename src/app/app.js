import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import UserPage from './components/page/userPage'
import EditUserPage from './components/page/editUserPage'

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userId?/edit" component={EditUserPage} />
        <Route path="/users/:userId?" component={UserPage} />
        <Route path="/users" component={Users} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App
