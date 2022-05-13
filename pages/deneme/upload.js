import React from "react";
import { useState, useEffect } from "react";
import { postData, getData } from "../..//utils/fetchdata";
import lodash from "lodash";
import axios from "axios";
const Upload = () => {
  const [file, setFiles] = useState();
  const [description, setDescription] = useState("desc value");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [selectedTags, setSelectedTags] = useState({});
 

  const captureFile = (event) => {
    const formData = new FormData();
    setSelectedTags(event.target.files);
    console.log(event.target.files);
    console.log('selectedTags------------', selectedTags);
    formData.set("images", event.target.files);
    let files = [];
    for (let file of event.target.files) {
      files.push(URL.createObjectURL(file));  //  convert image file to url and push to files array
      console.log(files);
      setSelectedFiles(files);
    }
    setSelectedFiles(files);
    console.log(selectedFiles, "selectedFiles");
  };

  const submit = async (event) => {
    event.preventDefault();

  

   
    const obj = {
       description: description,
        images: selectedFiles,
        image1: selectedTags,
      }
      console.log(selectedTags[1], "----------obj");

      
       
      
  
      axios.post("/api/products",obj );

    
  };

  return (
    <div className="mt-[55px]  ">
      <h1 className="  text-center p-[11px] w-[333px]  mx-auto bg-blue-300 font-bold container ">
        upload image file{selectedFiles.length}
      </h1>

      {/* ---form--- */}

      <div>
        <form onSubmit={submit}>
          <input
            filename={file}
            onChange={captureFile}
            type="file"
            accept="image/*"
            multiple
          ></input>
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          ></input>
          <button type="submit">Submit</button>

      

        </form>
      </div>
    </div>
  );
};

export default Upload;
