import {Routes,Route} from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import Home from './screens/Home/Home'
import Cart from './screens/Cart/Cart'
import PlaceOrder from './screens/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginPopUp from './Components/LoginPopUp/LoginPopUp'
import Verify from './screens/Verify/Verify'
import { useState } from 'react'
import MyOrders from './screens/MyOrders/MyOrders'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    {
      showLogin ? <LoginPopUp setShowLogin={setShowLogin}/>:<></>
    }
      <div className='app'>
        <ToastContainer />
      <NavBar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home />}/> 
        <Route path='/cart' element={<Cart />}/>
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/MyOrders' element={<MyOrders />} />

      </Routes>
    </div>
    <Footer/>
    </>
  )
}
export default App