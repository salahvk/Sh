var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const { ObjectID } = require('bson')
module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            // console.log(userData.Password);
            userData.Password = await bcrypt.hash(userData.Password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                userData._id = data.insertedId;
                resolve(userData._id);
            })
            // console.log(userData.Password)
        })

    }
    ,
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {};
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email })
            if (user) {
                bcrypt.compare(userData.Password, user.Password).then((status) => {
                    if (status) {
                        // console.log("Login Success")
                        response.user = user;
                        response.status = true;
                        resolve(response);
                    } else {
                        // console.log("Login Failed1")
                        resolve({ status: false })
                    }
                })
            } else {
                // console.log("Login Failed2")
                // console.log(userData.Email)
                resolve({ status: false })
            }
        });
    },
    addToCart: (proId, userId) => {
        let prodObj = {
            item: ObjectID(proId),
            quantity: 1
        }
        return new Promise(
            async (resolve, reject) => {
                let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: ObjectID(userId) });
                if (userCart) {
                    let proExist = userCart.products.findIndex(product => product.item == proId)

                    if (proExist != -1) {
                        db.get().collection(collection.CART_COLLECTION).updateOne({ 'products.item': ObjectID(proId) }, {
                            $inc: { 'products.$.quantity': 1 }
                        }).then(() => {
                            resolve()
                        })
                    } else {
                        db.get().collection(collection.CART_COLLECTION).updateOne(
                            {
                                user: ObjectID(userId)
                            }, {
                            $push: { products: prodObj }
                        }
                        ).then((response) => {
                            resolve()
                        })
                    }
                } else {
                    let cartObject = {
                        user: ObjectID(userId),
                        products: [prodObj]
                    }
                    db.get().collection(collection.CART_COLLECTION).insertOne(cartObject).then((response) => {
                        resolve(response)
                    })
                }
            }
        )
    }, getCartProducts: (userId) => {
        return new Promise(async (resolve, reject) => {
            let cartItems = await db.get().collection(collection.CART_COLLECTION).aggregate([
                { $match: { user: ObjectID(userId) } },
                 { $unwind: '$products' }, {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                }, {
                    $lookup: {
                     
                        from:collection.PRODUCT_COLLECTION,
                        localField:'item',
                        foreignField:'_id',
                        as:'product'
                    }

                },{
                    $project:{
                        item:1,quantity:1,product:{$arrayElemAt:['$products',0]}
                    }
                }]).toArray()
            resolve(cartItems)
        })
    },
    getCartCount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let count = 0
            let cart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: ObjectID(userId) })
            if (cart) {
                count = cart.products.length
            }
            resolve(count)
        })
    }
} 