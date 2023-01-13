import React, { useState, useEffect } from "react";
import Users from "./components/users";
import Api from "./api";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    Api.users
      .fetchAll()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
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
      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading && (
        <Users
          onDelete={handleDelete}
          usersArr={users}
          onToggleBookMark={handleToggleBookMark}
        />
      )}
    </div>
  );
};

export default App;
