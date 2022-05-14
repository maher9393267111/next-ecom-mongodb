import React from "react";
import Link from "next/link";
import axios from "axios";
import { Select } from 'antd';

const { Option } = Select;
import { useState } from "react";
const D2 = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState([]);
  const [media, setMedia] = useState(null);
  const [resImage, setResImage] = useState([]);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [colorsfiles, setcolorsFiles] = useState(""); // handle colorsimages files change
  const [info, setInfo] = useState({});

   const [colors, setColors] = useState([]);




  const children1 = [
    'black', 'red','orange','blue','grey','green','white'
  ];

  const children = []

 
const colorhere = []

  var item;
  for (item in children1) {
      children.push(<Option key={children1[item]}>{children1[item]}</Option>);
  }
  

  function handleChange(value) {
    console.log(`selected ${value}`);
  
// push selected colors to colors array

colorhere.push(value)


setColors(colorhere)
console.log('colorhere-->',colorhere)

  }




  const handleClick = async (e) => {
    e.preventDefault();
    try {

   
      // -------- main images ----------

      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "mystory123");
          data.append("folder", "/products");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/maher9911133/image/upload",
            data
          );

          const { url,secure_url,public_id } = uploadRes.data;


          console.log(url);
          const mainimgs ={}
          return  mainimgs = {secure_url:secure_url,public_id:public_id};
        })
      );

      //------ color image  upload to cloudinary then recive url and save to database ----------

      const colorImages = await Promise.all(
        Object.values(colorsfiles).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "mystory123");
          // select folder to upload
          data.append("folder", "/products");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/maher9911133/image/upload",
            data
          );


          console.log('uploadRes-->',uploadRes)
          const { url,secure_url,public_id } = uploadRes.data;
          console.log(url);
         // result of color images url { colorImages ---> array of urls of color images }

         const image = {}
         return  image ={secure_url:secure_url,public_id:public_id};

        })
      );


console.log('colors--> when vclick',colors)

      const newproduct = {
         price: 22,
         name: "name",
         title: "product title",
        category: "category name",
         colors: colorImages,
         colorrenk: colors[0],
        mainImages: list, // array of urls of images
      };
      console.log("new product--->", newproduct);

      await axios.post("/api/products", newproduct).then((res) => {
        console.log("respons name from post product-->", res);
      });
    } catch (err) {
      console.log('error message----->',err.message);
      console.log(err);
    }
  };

  console.log(media, "media");

  return (
    <div className="text-center">
      <h1 className="mt-[22px] font-bold text-2xl bg-blue-300">D2 : {}</h1>

      <div className="  mb-[55px]">
        <h1> MainImages</h1>

        <input
          type="file"
          id="colors-file"
          multiple
          onChange={(e) => setcolorsFiles(e.target.files)}
        />
      </div>

      {/* ------- colors images------ */}

      <div>
        <h1> ColorsImages</h1>

        <input
          type="file"
          id="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
      </div>

      <button
      className=" block  mb-[44px] mx-auto text-center bg-blue-300 text-white py-2 px-4 mt-[22px]"
        type="submit"
        onClick={handleClick}
        //   onClick={imageUpload}
      >
        upload
      </button>


      <>
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}

    >
      {children}
    </Select>
    <br />
   
  </>





      <div>{/* <img src={media} alt=""/> */}</div>
    </div>
  );
};

export default D2;
