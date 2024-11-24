import React from 'react'
import { useGetUsersQuery } from './userApiSlice'
import User from './User'




const UserList = () => {

  //destructuring the data(all the metadata is from redux).
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p> //uses optional chaining
  } else if (isSuccess) {
    const { ids } = users
    //body
    const tableContent = ids?.length ? ids.map(userId => <User key={userId} userId={userId} />) : null

    content = (
      <table className='table table--users'>
        <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th__user__username'>Username</th>
            <th scope='col' className='table__th__user__roles'>Roles</th>
            <th scope='col' className='table__th__user__edit'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content
}




export default UserList