var db =require("../config/connection")

module.exports={
    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            // callback(data)
            // console.log(data)
            console.log(data.insertedId)
            callback(data.insertedId)
        }
        )
    }
}


