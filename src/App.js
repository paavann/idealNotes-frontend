import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UserList from './features/users/UsersList'




function App() {
  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>
        <Route index element={ <Public /> } />
        <Route path='login' element={ <Login /> } />
        <Route path='dash' element={ <DashLayout /> }>
          <Route index element={ <Welcome /> } />
          <Route path='notes'>
            <Route index element={ <NotesList /> }></Route>
          </Route>
          <Route path='users'>
            <Route index element={ <UserList /> }></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}




export default App;