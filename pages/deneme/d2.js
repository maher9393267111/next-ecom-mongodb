import React from 'react';
import Link from 'next/link'
import {useState} from 'react'
const D2 = () => {

    const [name,setName] = useState("")
    const [price,setPrice] = useState("")
    const [media,setMedia] = useState("")
    const [description,setDescription] = useState("")
     const handleSubmit = async (e)=>{
       e.preventDefault()
       try{
              const mediaUrl =  await imageUpload()
       const res =  await fetch('/api/products',{
         method:"POST",
         headers:{
           'Content-Type':'application/json'
         },
         body:JSON.stringify({
           name,
           price,
           mediaUrl,
           description
         })
       })
       const res2 = await res.json()
       if(res2.error){
      console.log(res2.error)
       }else{
            console.log(res2)
       }
       }catch(err){
         console.log(err)
       }
  
     }
     const imageUpload = async ()=>{
         console.log(media)
          const data =  new FormData()
          data.append('file',media)
          data.append('upload_preset',"mystory123")
          data.append('cloud_name',"maher9911133")
          const res = await fetch("	https://api.cloudinary.com/v1_1/maher9911133/image/upload",{
            method:"POST",
            body:data
          })
          const res2  = await res.json()
          console.log(res2,'rss------------------>')
          return res2.url
     }


    return (
        <div className='text-center'>
            <h1 className='mt-[22px] font-bold text-2xl bg-blue-300'>D2</h1>


            <input type="file" 
              accept="image/*"
           
              onChange={(e)=>setMedia(e.target.files[0])}
            />


<button type="submit"    onClick={imageUpload}>upload</button>

            
        </div>
    );
}

export default D2;
