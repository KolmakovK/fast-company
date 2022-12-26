import React from 'react'
import User from './user'

const Users = (props) => {
    return (
        <>
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
                <User
                    onClick = {props.onClick}
                    usersArr = {props.usersArr}
                />
            </tbody>
        </table>
        </>
    )
}

export default Users