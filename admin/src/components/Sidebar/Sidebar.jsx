import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className = 'sidebar-list'>
      <NavLink to="/add" className="sidebar-options">
      <img src = {assets.add_icon} alt= ""/> Add items <br/>
      </NavLink>
      <NavLink to="/list" className="sidebar-options">
      <img src = {assets.order_icon} alt=""/> List items <br/>
      </NavLink> 
      <NavLink to="/orders" className="sidebar-options">
      <img src = {assets.order_icon} alt = ""/> Orders
      </NavLink>
    </div>
    </div>
  )
}

export default Sidebar