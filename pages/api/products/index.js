import mongodb from '../../../server/mongodb';
//  import Product from '../../../server/models/product'
import cloudinary from '../../../utils/cloudinary'

mongodb();


// switch to method in same file

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProducts(req, res)
            break;
        case "POST":
            await createProduct(req, res)
            break;
    }
}





class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}

        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete(queryObj[el]))

        if(queryObj.category !== 'all')
            this.query.find({category: queryObj.category})
        if(queryObj.title !== 'all')
            this.query.find({title: {$regex: queryObj.title}})

        this.query.find()
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const getProducts = async (req, res) => {
    try {
        // const features = new APIfeatures(Products.find(), req.query)
        // .filtering().sorting().paginating()

        // const products = await features.query
        
        res.json({
            status: 'success',
            name:'getProducts api',
            // result: products.length,
            // products
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}



// ----------------------------------------------------------

const createProduct = async (req, res) => {
    try {
    


        // const {title,name,description,colors,mainImages,price}  = req.body
       
        console.log('productInfo-->',req.body.colorrenk)






        // const newProduct = new Product({
        //     title: title.toLowerCase(), price,
        //     //  description,
        //     //   content, 
        //        mainImages,
        //        colors,
        //        name,
        // })


        // const product = await newProduct.save()
        // console.log('product-->',product)

        //   // find product id

            

        // await newProduct.save()

        res.json({msg: 'Success! Created a new product', data: 'newProduct hello mahger'})

    } catch (err) {
        console.log('-------------- error in server ---------------------')
        return res.status(400).json({err: err.message})
    }
}