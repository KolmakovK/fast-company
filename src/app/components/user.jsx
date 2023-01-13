import React from "react";
import Qualities from "./qualities";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark
}) => {
  return (
    <tr>
      <th>{name}</th>
      <td>
        {qualities.map((quality) => (
          <Qualities key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <BookMark
          key={_id}
          onClick={() => onToggleBookMark(_id)}
          status={bookmark}
        />
      </td>
      <td>
        <button
          className="badge bg-danger p-2 border-0"
          onClick={() => onDelete(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  bookmark: PropTypes.bool,
  onToggleBookMark: PropTypes.func.isRequired
};

export default User;
