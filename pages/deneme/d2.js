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



  function handleChange(value) {
    console.log(`selected ${value}`);
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
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/maher9911133/image/upload",
            data
          );

          const { url } = uploadRes.data;
          console.log(url);
          return url;
        })
      );

      //------ color image  upload to cloudinary then recive url and save to database ----------

      const colorImages = await Promise.all(
        Object.values(colorsfiles).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "mystory123");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/maher9911133/image/upload",
            data
          );

          const { url } = uploadRes.data;
          console.log(url);
          return url; // result of color images url { colorImages ---> array of urls of color images }
        })
      );

      const newproduct = {
        price: 22,
        name: "name",
        title: "product title",
        category: "category name",
        colors: colorImages,
        mainImages: list, // array of urls of images
      };
      console.log("new product--->", newproduct);

      await axios.post("/api/products", newproduct).then((res) => {
        console.log("respons name from post product-->", res.data.data);
      });
    } catch (err) {
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
        type="submit"
        onClick={handleClick}
        //   onClick={imageUpload}
      >
        upload
      </button>


      <>
    <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    <Select defaultValue="lucy" style={{ width: 120 }} disabled>
      <Option value="lucy">Lucy</Option>
    </Select>
    <Select defaultValue="lucy" style={{ width: 120 }} loading>
      <Option value="lucy">Lucy</Option>
    </Select>
    <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
      <Option value="lucy">Lucy</Option>
    </Select>
  </>





      <div>{/* <img src={media} alt=""/> */}</div>
    </div>
  );
};

export default D2;
