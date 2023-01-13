import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import GroupList from "./groupList";
import Api from "../api";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = ({ usersArr, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState([]);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const pageSize = 12;

  useEffect(() => {
    Api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    if (sortBy.iter === item) {
      setSortBy((prevState) => ({
        ...prevState,
        order: prevState.order === "asc" ? "desc" : "asc"
      }));
    } else {
      setSortBy({ iter: item, order: "asc" });
    }
    console.log({ item, sortBy });
  };

  const filteredUsers = selectedProf
    ? usersArr.filter((user) => user.profession._id === selectedProf._id)
    : usersArr;
  const count = filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);
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
          <UsersTable users={userCrop} onSort={handleSort} {...rest} />
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
  onToggleBookMark: PropTypes.func.isRequired
};
export default Users;
