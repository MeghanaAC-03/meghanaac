import React from 'react'
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({category,setCategory}) => {
   
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu </h1>
        <p className='explore-menu-text'> Order from a wide range of food items...Tailored for every mood...Buon Appetito!!! </p>
        <div className='explore-menu-list'>
            {menu_list.map((item, index)=>{
                return(
                    <div onClick={()=> setCategory(category=>category===item.menu_name?'All':item.menu_name)} key={index}className='explore-menu-list-item'>
                    <img className={category===item.menu_name?'active':''} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                        </div>
                )
            })}
            
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu