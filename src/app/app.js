import React, {useState} from 'react';
import Users  from './components/users'
import SearchStatus from './components/searchStatus'
import Api from "./api";

const App = () => {
    const [users, setUsers] = useState(Api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter((user) => user !== userId))
    }
    return (
        <div>
            <SearchStatus
                length = {users.length}
            />
            <Users
                onClick = {handleDelete}
            />
        </div>
    )
}

export default App