import React, { useState,useEffect } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from'react-toastify'

const List = ({url}) => {
  const [list,setList] = useState([])
  const fetchList = async()=> {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error(response.data.message)
    }
  }

  useEffect(() =>{
    fetchList()
  },[])

  const removedFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove`, {
        params: { id: foodId },
      });
      if (response.data.success) {
        toast.success("Food item removed successfully");
        await fetchList(); // Refresh the list
      } else {
        toast.error(response.data.message);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error removing food item:", error);
      toast.error("Failed to remove food item. Please try again.");
    }
  };
  

  return (
    <div className='list add flex-col'>

      <p>Add Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p><b>Image</b></p>
          <p><b>Name</b></p>
          <p><b>Category</b></p>
          <p><b>Price</b></p>
          <p><b>Action</b></p>
        </div>
        {
          list.map((item,index)=>{
            return(
              <div key={index} className="list-table-format">
                <img src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p onClick={()=>removedFood(item._id)} className='cursor'> X </p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List