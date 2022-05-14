import axios from 'axios'


const apiURL = '/api/products';

export const createProduct = async ({
    name,
    description,
   title,

    images
    
  }) => {

    console.log('imagessss--->',images)
    /* Most important part for uploading multiple image  */
    const imagesArray = []
    let formData = new FormData();
    for (const file of images) {
        console.log('-------------',file)
    
        imagesArray.push(file)
   formData.append('images',  file);
   console.log(formData, 'formData---images')
    }
    /* Most important part for uploading multiple image  */
    formData.append("name", name);
    formData.append("title", title);
    formData.append("description", description);
    
    console.log(formData, 'formData')
  
const  obj ={
    name,
    description,
    title,
    images:imagesArray

}




    try {
      let res = await axios.post(`${apiURL}`, (formData));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  