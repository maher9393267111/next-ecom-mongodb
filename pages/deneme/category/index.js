import React from "react";
import { Input, Button } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
const Category = () => {
  const [name, setname] = useState("");
  const [file, setfile] = useState("");

  const [resImage, setresImage] = useState("");



//  handle image change

const handleClick = async (e) => {
  e.preventDefault();
  try {
    

    console.log(file)
          const data =  new FormData()
          data.append('file',file)
          data.append('upload_preset',"mystory123")
          data.append('cloud_name',"maher9911133")
          //folder spaecefic
          data.append('folder',"category")
          const res = await fetch("	https://api.cloudinary.com/v1_1/maher9911133/image/upload",{
            method:"POST",
            body:data
          })
          const res2  = await res.json()
          console.log(res2,'rss------------------>')

          const catobj = {};

        catobj = { secure_url: res2.secure_url, public_id: res2.public_id };
        console.log(catobj,'catobj')
          setresImage(catobj)
          console.log(resImage,'resImage------------------>')


  

    const newCategory = {
      
      name: name,
      image:resImage,
      
     

    
    };
    console.log("new product--->", newCategory);

    // await axios.post("/api/category", newCategory).then((res) => {
    //   console.log("respons name from post product-->", res);
    // });
  } catch (err) {
    console.log("error message----->", err.message);
    console.log(err);
  }
};





  return (
    <div className=" category-wrapp container">
      <div
        className="font-bold  text-center text-2xl  p-[12px] bg-blue-200
w-[300px]
mx-auto
mt-[30px]  rounded-lg

"
      >
        {" "}
        <h1>CREATE CATEGORY</h1>
      </div>

      <div className="cat-sections">
        <div
          className="form-container w-[355px] mx-auto mt-[44px] "    >
          <Input
             onChange={(e) => setname(e.target.value)}
          
          placeholder="CategoryName" />
        </div>


{/* ---upload category image--- */}

<div>

<div className=" mx-auto text-center mt-[33px] mb-[40px]">

<div className="font-bold   ">
<div className=" w-[255px]  p-[16px] mb-[22px] mt-[22px] bg-green-300 mx-auto ">
    UPLOAD CATEGORY IMAGE
</div>

</div>


<input
          type="file"
          id="cat-file"
          // multiple
          onChange={(e) => setfile(e.target.files[0])}
        />


</div>



</div>




        <div className="form-group text-center pt-[10px] mt-[20px]  mb-[33px]">
          <Button
          onClick={handleClick}
          
          className="w-[200px] p-[12px]" type="primary" danger>
            CREATE CATEGORY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Category;
