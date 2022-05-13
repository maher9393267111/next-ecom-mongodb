import React from "react";
import { useState, useEffect } from "react";
import { postData, getData } from "../..//utils/fetchdata";
import lodash from "lodash";
const Product = () => {


 

     

      const [itemimage, setitemimage] = useState([]);



// send data to server

const handleSubmit = (e) => {

    e.preventDefault();
   

     const formData = new FormData();
    
     formData.set("image", itemimage);
     console.log(formData, 'formData')

    postData("products", ).then((data) => {

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
    

<form>
    
    <input type="file" multiple  
    
    onChange={(e) => {
        // console.log(e.target.files)
        let { files } = e.target;
        lodash.forEach(files, (file) => {
          console.log(file);
          setitemimage((item) => [...item, file]);
          console.log(itemimage);
        });
      }}
    
    name="photo"  />



<div>
    

<div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
        
          type='text'
          className='form-control'
        //   value={name}
        />
      </div>



</div>



</form>



<button type="submit"  onClick={handleSubmit}>

Send data to server

</button>

</div>

    </div>
  );
};

export default Product;
