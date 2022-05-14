import React from "react";
import Link from "next/link";
import axios from "axios";
import "../../styles/deneme.module.css";
import { Select, Input, Image, Upload, Button, Space } from "antd";

import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const { Option } = Select;
import { useState } from "react";
const D2 = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [media, setMedia] = useState(null);
  const [resImage, setResImage] = useState([]);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");

  const [files, setFiles] = useState("");
  const [colorsfiles, setcolorsFiles] = useState(""); // handle colorsimages files change
  const [info, setInfo] = useState({});

  const [colors, setColors] = useState([]);

  // handle upload

  const [upload, setUpload] = useState([]);

  const children1 = [
    "black",
    "red",
    "orange",
    "blue",
    "grey",
    "green",
    "white",
  ];

  const children = [];

  const colorhere = [];

  var item;
  for (item in children1) {
    children.push(<Option key={children1[item]}>{children1[item]}</Option>);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);

    // push selected colors to colors array

    colorhere.push(value);

    setColors(colorhere);
    console.log("colorhere-->", colorhere);
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

          const { url, secure_url, public_id } = uploadRes.data;

          console.log(url);
          const mainimgs = {};
          return (mainimgs = { secure_url: secure_url, public_id: public_id });
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

          console.log("uploadRes-->", uploadRes);
          const { url, secure_url, public_id } = uploadRes.data;
          console.log(url);
          // result of color images url { colorImages ---> array of urls of color images }

          const image = {};
          return (image = { secure_url: secure_url, public_id: public_id });
        })
      );

      console.log("colors--> when vclick", colors);

      const newproduct = {
        price: price,
        name: name,
        title: title,
        category: "category name",
        colorsImages: colorImages,
        colorrenk: colors[0],

        mainImages: list, // array of urls of images
      };
      console.log("new product--->", newproduct);

      await axios.post("/api/products", newproduct).then((res) => {
        console.log("respons name from post product-->", res);
      });
    } catch (err) {
      console.log("error message----->", err.message);
      console.log(err);
    }
  };

  console.log(media, "media");

  return (
    <div className="text-center  wrapper pb-[22px] mb-[50px]">
      <h1 className="mt-[22px] font-bold text-2xl bg-blue-300">
        PRODUCT CREATE
      </h1>

      <div className="  mb-[55px]">
        <h1
          className="  
w-[277px]
mt-[33px]
mb-[33px]
mx-auto
font-bold
p-[10px]
rounded-full


bg-orange-400
        
        "
        >
          {" "}
          MainImages
        </h1>

        <input
          type="file"
          id="colors-file"
          multiple
          onChange={(e) => setcolorsFiles(e.target.files)}
        />
      </div>

      {/* ------- colors images------ */}

      <div>
        <h1
          className="  
        w-[277px]
        mt-[33px]
        mb-[33px]
        mx-auto
        font-bold
        p-[10px]
        rounded-full
        
        
        bg-blue-400
                
                "
        >
          {" "}
          ColorsImages
        </h1>

        <input
          type="file"
          id="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
      </div>

      {/* -------name------ */}

      <div
        className=" name-cont
      mt-[22px] mb-[22px]
     
      w-[130px]
      mx-auto
      rounded-lg
      outline-none
      
      
      "
      >
        <Input
          size="large"
          placeholder="productName"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          name="name"

          // prefix={<UserOutlined />}
        />
      </div>

      {/* ----------description---------- */}

      <div
        className=" pro-desc
      w-[333px]

      mx-auto
      
      
      "
      >
        <TextArea
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="product-desc"
        />
      </div>

      {/* ---- title---- */}

      <div
        className=" pro-title
      w-[140px]
      mx-auto
      mt-[22px]
      mb-[22px]
      "
      >
        <Input
          size="large"
          placeholder="large size"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"

          // prefix={<UserOutlined />}
        />
      </div>

      {/* ------categories--- */}

      <div className=" product categories">
        <input type="" name="" value="" />
      </div>

      {/* ------------price------------ */}

      <div className="pro-price">
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          type="number"
          placeholder="price"
        />
      </div>

      <div
        className="

mt-[44px]
mb-[33px]
mx-auto
w-[300xpx]
pb-[10px]
pt-[30px]

"
      >
        <h1
          className="
  font-bold
  text-2xl
  pb-[12px]
  bg-green-200
  mx-auto
  w-[340px]
  rounded-full
  pt-[12px]
  "
        >
          Colors Select
        </h1>

        <Select
          mode="multiple"
          allowClear
          className="
      w-[400px]
      "
          placeholder="Please select"
          defaultValue={["a10", "c12"]}
          onChange={handleChange}
        >
          {children}
        </Select>
        <br />
      </div>

      <div className="   mb-[66px]">
        <button
          className=" block   mx-auto text-center bg-blue-300 text-white py-4
        rounded-lg
        font-bold
        text-xl
     
        px-6 mt-[33px]"
          type="submit"
          onClick={handleClick}
          //   onClick={imageUpload}
        >
          upload
        </button>
      </div>
    </div>
  );
};

export default D2;
