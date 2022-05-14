import mongodb from '../../../server/mongodb';
// import Product from '../../../server/models/product'
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
    


        const {title,name,description}  = req.body
        const images = req.files
        console.log('productInfo',req.body)





// froeach image in images array upload to cloudinary

// const imageobje  = []

// const imagesArray = images.map(async (image11) => {
//     const result = await cloudinary.uploader.upload(image11,(err, result) => {
        
// if (err) {
//     console.log(err)
// }

// else
// {
//     console.log(result, 'result')
//     imageobje.push(result)
    
// }

       
   
    
// })

// })




// console.log(imageobje, 'imageobje')








        // const {title, name,price, inStock, description, content, category, } = req.body

       

        // category === 'all'

        // if(!title || !price || !name || !description  || category )
        // return res.status(400).json({err: 'Please add all the fields.'})


        // const newProduct = new Product({
        //     title: title.toLowerCase(), price, inStock, description, content, category, images
        // })

        // await newProduct.save()

        res.json({msg: 'Success! Created a new product', data: req.body.name})

    } catch (err) {
        console.log('-------------- error in server ---------------------')
        return res.status(500).json({err: err.message})
    }
}