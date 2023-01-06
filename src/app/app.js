import React, { useState } from "react";
import Users from "./components/users";
import Api from "./api";

const App = () => {
  const [users, setUsers] = useState(Api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers((prevState) =>
      prevState.map((user) =>
        user._id === id ? { ...user, bookmark: !user.bookmark } : user
      )
    );
  };

  return (
    <div>
      <Users
        onDelete={handleDelete}
        usersArr={users}
        onClick={handleToggleBookMark}
      />
    </div>
  );
};

export default App;
