import React, { useState, useEffect } from "react";
import User from "./user";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import GroupList from "./groupList";
import Api from "../api";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";

const Users = ({ usersArr, onDelete, onClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState([]);
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 2;

  useEffect(() => {
    Api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const filteredUsers = selectedProf
    ? usersArr.filter((user) => user.profession._id === selectedProf._id)
    : usersArr;

  console.log({ selectedProf, filteredUsers });
  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);
  const clearFilter = () => {
    setSelectedProf();
  };

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
        {count > 0 && (
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
              {userCrop.map((user) => (
                <User
                  key={user._id}
                  onDelete={onDelete}
                  user={user}
                  onStatusChange={onClick}
                />
              ))}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  usersArr: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
export default Users;
