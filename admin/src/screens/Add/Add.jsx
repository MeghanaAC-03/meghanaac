/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = () => {
  const url = 'http://localhost:4000'
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const onChangeHandler = (event) => {
    const  name = event.target.name
    const value = event.target.value
    setData(data=> ({...data, [name]:value}))
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    const response = await axios.post(`${url}/api/food/add`,formData)

    console.log(response.data)
    if(response.data.success){
      setData({
        name: '',
        description: '',
        price: '',
        category: '',
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
    toast.error(response.message)
    }
    // Handle form submission logic here
    // For example, you can use fetch or axios to send this data to your backend.
  }

  return (
    <div className='add-component'>
      <form onSubmit={onSubmitHandler} className='flex-col'>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor='image'>
            <img className='uploaded-img' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Uploaded Preview" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
  <p>Product name</p>
  <select onChange={onChangeHandler} value={data.name} name="name">
    <option value="" disabled>Select a product...</option>
    <option value="Greek salad">Greek salad</option>
    <option value="Veg salad">Veg salad</option>
    <option value="Clover Salad">Clover Salad</option>
    <option value="Chicken Salad">Chicken Salad</option>
    <option value="Lasagna Rolls">Lasagna Rolls</option>
    <option value="Peri Peri Rolls">Peri Peri Rolls</option>
    <option value="Chicken Rolls">Chicken Rolls</option>
    <option value="Veg Rolls">Veg Rolls</option>
    <option value="Ripple Ice Cream">Ripple Ice Cream</option>
    <option value="Fruit Ice Cream">Fruit Ice Cream</option>
    <option value="Jar Ice Cream">Jar Ice Cream</option>
    <option value="Vanilla Ice Cream">Vanilla Ice Cream</option>
    <option value="Chicken Sandwich">Chicken Sandwich</option>
    <option value="Vegan Sandwich">Vegan Sandwich</option>
    <option value="Grilled Sandwich">Grilled Sandwich</option>
    <option value="Bread Sandwich">Bread Sandwich</option>
    <option value="Cup Cake">Cup Cake</option>
    <option value="Vegan Cake">Vegan Cake</option>
    <option value="Butterscotch Cake">Butterscotch Cake</option>
    <option value="Sliced Cake">Sliced Cake</option>
    <option value="Garlic Mushroom">Garlic Mushroom</option>
    <option value="Fried Cauliflower">Fried Cauliflower</option>
    <option value="Mix Veg Pulao">Mix Veg Pulao</option>
    <option value="Rice Zucchini">Rice Zucchini</option>
    <option value="Cheese Pasta">Cheese Pasta</option>
    <option value="Tomato Pasta">Tomato Pasta</option>
    <option value="Creamy Pasta">Creamy Pasta</option>
    <option value="Chicken Pasta">Chicken Pasta</option>
    <option value="Buttter Noodles">Buttter Noodles</option>
    <option value="Veg Noodles">Veg Noodles</option>
    <option value="Somen Noodles">Somen Noodles</option>
    <option value="Cooked Noodles">Cooked Noodles</option>
    </select>
</div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' placeholder='Write content here...' rows='6'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} value={data.category} name='category'>
            <option value="" disabled>Select a category...</option>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='₹-' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;