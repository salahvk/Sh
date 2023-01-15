var db =require("../config/connection")
var collection =require("../config/collections")
var objectId = require("mongodb").ObjectId

module.exports={
    addProduct:(product,callback)=>{
        // console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            // callback(data)
            // console.log(data)
            // console.log(data.insertedId)
            callback(data.insertedId)
        }
        )
    },getAllProducts:()=>{
        return new Promise(async (resolve,reject)=>{
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            // console.log(products._id)
            // console.log(products)
            resolve(products)

        })
    },
    deleteProduct:(prodId)=>{
return new Promise((resolve, reject) =>{
    db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(prodId)}).then((response) =>{
        console.log(response);
        resolve(response)
    })
})
    },
    getProductDetails:(prodId)=>{
        return new Promise((resolve, reject) =>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(prodId)}).then((response) =>{
                console.log(response);
                resolve(response)
            })
        })
    }
}


