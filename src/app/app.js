import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import Api from "./api";

const App = () => {
  const [users, setUsers] = useState(Api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user !== userId));
  };

  const handleToggleBookMark = (id) => {
    console.log(id);
    // const switchBookMark = users.map((user) => user.id === id);
    // setUsers(switchBookMark);
  };
  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        onDelete={handleDelete}
        usersArr={users}
        onClick={handleToggleBookMark}
      />
    </div>
  );
};

export default App;
