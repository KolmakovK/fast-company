import React, { useState } from "react";
import User from "./user";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";

const Users = ({ usersArr, onDelete, onClick }) => {
  const count = usersArr.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(usersArr, currentPage, pageSize);
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
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Users;
