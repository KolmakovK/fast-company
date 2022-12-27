import React from "react";
import Qualities from "./qualities";
import BookMark from "./bookmark";

const user = ({ user, onDelete, status }) => {
  return (
    <tr key={user._id}>
      <th scope="row" id={user._id}>
        {user.name}
      </th>
      <td id={user.qualities._id}>
        {user.qualities.map((quality) => (
          <Qualities key={quality._id} {...quality} />
        ))}
      </td>
      <td id={user.profession._id}>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <BookMark key={user._id} status={() => status(user)} />
      </td>
      <td id={user._id}>
        <button
          className="badge bg-danger p-2 border-0"
          onClick={() => onDelete(user)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default user;
