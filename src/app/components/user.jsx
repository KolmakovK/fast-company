import React, {useState} from 'react'
import Qualities from './qualities'
import BookMark from './bookmark'
import Api from "../api";

const User = () => {
    const [users, setUsers] = useState(Api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter((user) => user !== userId))
    }

    return users.map(user => (
            <tr key={user._id}>
                <th scope="row" id={user._id}>
                    {user.name}
                </th>
                <td id={user.qualities._id}>
                    {user.qualities.map((quality) =>
                        <Qualities
                            key = {quality._id}
                            {...quality}
                        />)
                    }
                </td>
                <td id={user.profession._id}>
                    {user.profession.name}
                </td>
                <td>
                    {user.completedMeetings}
                </td>
                <td>
                    {user.rate}
                </td>
                <td id={user._id}>
                    <button className ="badge bg-danger p-2 border-0" onClick={() => handleDelete(user)}>
                        Delete
                    </button>
                </td>
            </tr>
    ))


}

export default User
