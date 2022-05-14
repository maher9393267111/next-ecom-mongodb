import React from "react";
import { useState, useEffect } from "react";
import { postData, getData } from "../..//utils/fetchdata";
import lodash from "lodash";
import axios from "axios";
import {createProduct} from './functions'
const Upload = () => {
  const [file, setFiles] = useState();
  const [description, setDescription] = useState("desc value");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [selectedTags, setSelectedTags] = useState({});
 

  const [fData, setFdata] = useState({
    name: "",
    title:'',
    description: "",
   
    images:[]
    
  });

  const submitForm = async (e) => {
    e.preventDefault();
 //   e.target.reset();



 try {
    let responseData = await createProduct(fData);
    console.log(responseData)
    if (responseData.success) {
    //  fetchData();
      setFdata({
        ...fData,
        name: "",
        description: "",
        images: [],
       
      });

 


  } }
  catch (error)
  {  console.log(error,error.message) }
}







  const submit = async (event) => {
    event.preventDefault();

  


 createProduct(fData)
      
  
    

    
  };



  return (
    <div>
        <h1>Create form</h1>
        <form className="w-full" onSubmit={(e) => submit(e)}>

{/* -------name ----------  */}

<label for="">name</label>
<input
                  value={fData.name}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      
                      name: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />

{/* ------title ------  */}
<label for="">title</label>

<input
                  value={fData.title}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                    
                      title: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />



{/* ------description----- */}
<label for="">desc</label>

<input
                  value={fData.description}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                    
                      description: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />


{/* ------images----- */}
<input
                
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                    
                      images: [...e.target.files],
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  multiple
                />


{/* -----button ----- */}

<button
                style={{ background: "#303031" }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Create product
              </button>

</form>


    </div>
  )
};

export default Upload;
