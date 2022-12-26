import React from 'react'
import Qualities from './qualities'
import BookMark from './bookmark'

const User = (props) => {
    const users = props.usersArr
    // console.log(props)
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
                    <button className ="badge bg-danger p-2 border-0" onClick={() => props.onClick(user)}>
                        Delete
                    </button>
                </td>
            </tr>
    ))


}

export default User
