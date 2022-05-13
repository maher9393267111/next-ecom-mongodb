import React from 'react';
import {useState,useEffect} from 'react'
import { postData, getData } from "../..//utils/fetchdata";
import lodash from "lodash";
const Upload = () => {

    const [file, setFiles] = useState()
    const [description, setDescription] =useState("")


//  set multiple files images in state and apedn in formdata and send to server

   



    const submit = async event => {
        event.preventDefault()
        console.log(file,description)
    
        const formData = new FormData()
        formData.append("image", file)
        formData.append("description", description)

        console.log(formData)

        const data = await postData("products", formData)


        
      }



    return (
        <div className='mt-[55px]  '>
            
<h1 className='  text-center p-[11px] w-[333px]  mx-auto bg-blue-300 font-bold container '>upload image file</h1>


{/* ---form--- */}


<div>
    
<form onSubmit={submit}>
        <input
          filename={file} 
          onChange={e => setFiles(e.target.files)} 
          type="file" 
          accept="image/*"
            multiple
        ></input>
        <input
          onChange={e => setDescription(e.target.value)} 
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>
</div>





        </div>
    );
}

export default Upload;
