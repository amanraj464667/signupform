import React, { useState } from 'react'
import Signup from './components/Signup'
import {Routes,Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import RefreshHandler from './RefreshHandler'

const App = () => {

  const [isAuthenticated,setIsAuthenticated] = useState(false);

const PrivateRoute = ({element})=>{
  return isAuthenticated ? element : <Navigate to="/login" />
}



  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
       <Routes>
        <Route path='/' element={<Navigate to='/login' />}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}></Route>
       </Routes>

       </>
  )
}

export default App