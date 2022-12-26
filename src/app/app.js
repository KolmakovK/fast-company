import React, {useState} from 'react';
import Users  from './components/users'
import SearchStatus from './components/searchStatus'
import Api from "./api";

const App = () => {
    const usersArr = Api.users.fetchAll()
    console.log(usersArr.length)
    console.log(Users.length)
    return (
        <div>
            <SearchStatus/>
            <Users/>
        </div>
    )
}

export default App