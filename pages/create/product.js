import React from "react";
import { useState, useEffect } from "react";
import { postData, getData } from "../..//utils/fetchdata";

const Product = () => {

const [products, setProducts] = useState();
const [images, setImages] = useState([]);

// send data to server

const handleSubmit = (e) => {

    e.preventDefault();
    // const data = {
    //     name: "product name",
    //     price: "product price",
    //     inStock: "product inStock",
    //     description: "product description",};

    const formData = new FormData();
        formData.append("name", "product name");
        formData.append("price", "product price");
        formData.append("inStock", "product inStock");
        formData.append("description", "product description");
        formData.append("content", "product content");
        formData.append("category", "product category");
        formData.append("images", images);

        console.log(formData, "form data");

    postData("products", formData).then((data) => {

        console.log(data);
    });

    // get data from server

};


  useEffect(() => {


  }, [

  ]);


// handle imagechange

const handleImageChange = (e) => {

    e.preventDefault();
    const files = e.target.files;
    setImages(files);
    console.log('image files here---->',files);
    const data = new FormData();
    data.append("file", files);

};




  return (
    <div>
      <h1>Product</h1>


{/* -----send data to server------ */}


<div>
    

<form>
    
    <input type="file" multiple  onChange={handleImageChange}  name="images"  />


</form>



<button type="submit"  onClick={handleSubmit}>

Send data to server

</button>

</div>

    </div>
  );
};

export default Product;
