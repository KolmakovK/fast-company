import React from "react";
import User from "./user";

const Users = ({ usersArr, onDelete, onClick }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">Избранное</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {usersArr.map((user) => (
          <User
            key={user._id}
            onDelete={onDelete}
            user={user}
            onStatusChange={onClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Users;
