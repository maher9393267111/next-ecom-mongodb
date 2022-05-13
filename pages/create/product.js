import React from "react";
import { useState, useEffect } from "react";
import { postData, getData } from "../..//utils/fetchdata";

const Product = () => {

const [products, setProducts] = useState();


// send data to server

const handleSubmit = (e) => {

    e.preventDefault();
    const data = {
        name: "product name",
        price: "product price",
        inStock: "product inStock",
        description: "product description",};

    postData("products", data).then((data) => {

        console.log(data);
    });

    // get data from server

};


  useEffect(() => {


  }, [

  ]);

  return (
    <div>
      <h1>Product</h1>


{/* -----send data to server------ */}


<div>
    
<button type="submit"  onClick={handleSubmit}>

Send data to server

</button>

</div>

    </div>
  );
};

export default Product;
