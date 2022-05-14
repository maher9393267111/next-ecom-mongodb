   
import mongodb from '../../../server/mongodb';
import CategoryModel  from '../../../server/models/category'
   mongodb();


   // switch to method in same file
   
   export default async (req, res) => {
       switch(req.method){
           case "GET":
               await allCategories(req, res)
               break;
           case "POST":
               await createCategory(req, res)
               break;
       }
   }
   


// create category

const createCategory = async (req, res) => {




    const category = new CategoryModel(req.body);
    console.log(category);
    await category.save();
    res.status(201).json({
        status: 'success',
        data: {
            category
        }
    })
}


// get all categories

const allCategories = async (req, res) => {

    const categories = await CategoryModel.find();
    res.status(200).json({
        status: 'success',
        data: {
            categories
        }
    })
}


// get category by id
