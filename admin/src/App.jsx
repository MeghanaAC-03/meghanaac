import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import List from './screens/List/List'
import Orders from './screens/Orders/Orders'
import Add from './screens/Add/Add'
import {Route,Routes} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'

const App = () => {

  const url = 'http://localhost:4000'
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path ='/add' element={<Add url={url}/>}></Route>
          <Route path ='/list' element={<List url={url}/>}></Route>
          <Route path ='/orders' element={<Orders url={url}/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App