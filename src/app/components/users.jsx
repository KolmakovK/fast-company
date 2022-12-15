import React, {useState} from 'react'
import api from '../api'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const renderUserList = () => {
        return users.map(user => (
            <tr>
                <th scope="row" id={user._id}>{user.name}</th>
                <td id={user.qualities._id}> {user.qualities.map((quality) => <span className={'badge m-1 bg-primary'}>{quality.name}</span>)} </td>
                <td id={user.profession._id}>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td id={user._id}><button className ="badge bg-danger p-2 border-0">Delete</button></td>
            </tr>
        ))
    }
    const handleDelete = (userId) => {

    }
    const renderPhrase = (number= 12) => {
        return number !== 0 ? `${number} человек тусанет с тобой сегодня` : 'Никто с тобой не тусанет'
    };


    return (
        <>
        <h2><span className="badge bg-primary">{renderPhrase()}</span></h2>
        <table className="table">
        <thead>
        <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
            {renderUserList()}
        </tbody>
    </table>
        </>
    )
}

export default Users