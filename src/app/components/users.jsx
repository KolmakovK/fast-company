import React, {useState} from 'react'
import api from '../api'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const renderUserList = () => {
        return users.map(user => (
            <tr>
                <th scope="row" id={user._id}>
                    {user.name}
                </th>
                <td id={user.qualities._id}>
                    {user.qualities.map((quality) =>
                        <span className={'badge m-1 bg-' + quality.color}>
                            {quality.name}
                        </span>)
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
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter((user) => user !== userId))
    }
    const renderPhrase = (number) => {
        function declOfNum(number, text_forms) {
            number = Math.abs(number) % 100;
            const n1 = number % 10;
            if (number > 10 && number < 20) {
                return text_forms[2];
            }
            if (n1 > 1 && n1 < 5) {
                return text_forms[1];
            }
            if (n1 === 1) {
                return text_forms[0];
            }
            return text_forms[2];
        }

        const variantsWord1 = ["человек", "человека", "человек"]
        const variantsWord2 = ["тусанёт", "тусанёт", "тусанут"]

        const phrase = number !== 0
            ? `${number} ${declOfNum(number, variantsWord1)} ${declOfNum(number, variantsWord2)} с тобой сегодня`
            : 'Никто с тобой не тусанет'

        const colorPhrase = number !== 0 ? 'badge bg-primary' : 'badge bg-danger'

        return  <span className = {colorPhrase} >
                    {phrase}
                </span>
    };


    return (
        <>
        <h2>
            {renderPhrase(renderUserList().length)}
        </h2>
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