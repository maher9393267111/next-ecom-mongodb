import React from 'react';
import { useState,useEffect } from 'react';
import {postData, getData, } from '../..//utils/fetchdata'
const initialState = {
    title: 'title',
    price: 0,
    name: 'name',
    description: 'desc',
    images: [],
    colors: [{name:'',image:''}],
    category: 'category'
}



const Product = () => {

const [state, setState] = useState(initialState)

const [products, setProducts] = useState('')


useEffect(() => {

  

    

  }
    , [])
  





//-----------------------------------------------------
const [photo, setPhoto] = useState([])


const setPic = (event) => {
    //   if (event.target.files && event.target.files[0]  && event.target.files.length>0)
    //{
       setPhoto(event.target.files);
   console.log(event.target.files)
console.log('photos---->>>',photo.length)

     //  }
       }
   




//-----------------------------------------------------

const handleSubmit = e => {

    event.preventDefault();
    // const formDatacurrent = new FormData(e.currentTarget);

    // console.log('current----->',formDatacurrent)

    const formdata = new FormData()
    e.preventDefault()
    console.log(state)
   
     formdata.append('images',state.images)
     formdata.append('name',state.name)
     formdata.append('price',state.price)
     formdata.append('description',state.description)
     formdata.append('category',state.category)
    //  formdata.append('colors',state.colors)
     formdata.append('title',state.title)
   

     postData('products',formdata).then(data => {

    setProducts(data.name)
    console.log(data)

    }
    )


}


    return (
        <div>
            <h1>Product Create {state.images.length}</h1>


<form className=' mx-auto border-2 border-green-300' onSubmit={''}>
    <div className=' flex mt-[33px] mb-[10px]'>
        <label className='ml-[40px]'>main images </label>
    <input className='input-class' onChange={setPic} multiple type="file" name="images" value={state.images}/>

    </div>
    


    <div>
        
    <label for="cover" className=" input-class">Update</label>
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  multiple
                  onChange={setPic}
                  className="img-file2"
                />



    </div>





<input type="" name="" value=""/>
<input type="" name="" value=""/>
<input type="" name="" value=""/>



<div>
    <button type='submit' onClick={ handleSubmit}>submit</button>

</div>




</form>



{/* -------button ----- */}





        </div>
    );
}

export default Product;
