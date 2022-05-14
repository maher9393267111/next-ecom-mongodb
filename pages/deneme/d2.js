import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
const D2 = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState([]);
  const [media, setMedia] = useState(null);
  const [resImage, setResImage] = useState([]);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mediaUrl = await imageUpload();
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          mediaUrl,
          description,
        }),
      });
      const res2 = await res.json();
      if (res2.error) {
        console.log(res2.error);
      } else {
        console.log(res2);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleClick = async (e) => {
    e.preventDefault();
    try {
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

      const newhotel = {
       
        photos: list,
      };
      console.log('hotl--->',newhotel);

    //   await axios.post("/hotels", newhotel);
    } catch (err) {console.log(err)}
  };








  const imageUpload = async () => {
    // console.log(media);
    const data = new FormData();
    // upload multiple files to cloudinary

    console.log(media.length);

    for (let i = 0; i < media.length; i++) {
      console.log("media i--->", media[i]);

      // send arry of images to cloudinary

      data.append("file", media[i]);

      //   data.append('file',media)
      data.append("upload_preset", "mystory123");
      data.append("cloud_name", "maher9911133");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/maher9911133/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const res2 = await res.json();
      console.log(res2.secure_url, "rss------------------>");
      return setResImage(res2.secure_url);
    }
  };

  console.log(media, "media");

  return (
    <div className="text-center">
      <h1 className="mt-[22px] font-bold text-2xl bg-blue-300">D2 : {}</h1>
{/* 
      <input
        type="file"
        accept="image/*"
        name="mainimages"
        multiple
        onChange={(e) => setMedia(e.target.files)}
      /> */}


<input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
               
                />



      <button
        type="submit"
        onClick={handleClick}
        //   onClick={imageUpload}
      >
        upload
      </button>

      <div>{/* <img src={media} alt=""/> */}</div>
    </div>
  );
};

export default D2;
