import React, { useEffect, useState } from 'react'
import Api from '../../../api'
import _ from 'lodash'

import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import { paginate } from '../../../utils/paginate'
import Loading from '../../common/loading'

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({
    path: 'name',
    order: 'asc'
  })
  const [searchQuery, setsearchQuery] = useState('')

  const pageSize = 7

  const [users, setUsers] = useState()

  useEffect(() => {
    Api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    setUsers((prevState) =>
      prevState.map((user) =>
        user._id === id
          ? {
              ...user,
              bookmark: !user.bookmark
            }
          : user
      )
    )
  }

  useEffect(() => {
    Api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleSort = (item) => {
    setSortBy(item)
  }
  console.log(users)
  console.log(professions)
  if (users) {
    const targetValue = users.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : targetValue
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)
    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={(item) => {
                handleProfessionSelect(item)
                setsearchQuery('')
              }}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <form action="src/app/components">
            <input
              className="form-control"
              type="text"
              id="user-search"
              name="searchQuery"
              placeholder="Search..."
              onChange={(event) => {
                setsearchQuery(event.target.value)
                clearFilter()
              }}
              value={searchQuery}
            />
          </form>
          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
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
    )
  }
  return <Loading />
}

export default UsersListPage
