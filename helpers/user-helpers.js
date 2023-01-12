var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve, reject) =>{
            console.log(userData.Password);
            userData.Password =await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                userData._id = data.insertedId;
                resolve(userData._id);
            })
            console.log(userData.Password)
        })

    }
,
    doLogin:(userData)=>{
return new Promise(async(resolve,reject)=>{
    let loginStatus = false;
    let response ={};
    let user = await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
    if(user){
        bcrypt.compare(userData.Password,user.Password).then((status)=>{
            if(status){
               console.log("Login Success") 
               response.user = user;
               response.status = true;
               resolve(response);
            }else{
                console.log("Login Failed1") 
                resolve({status:false})
            }
        })
    }else{
        console.log("Login Failed2") 
        console.log(userData.Email)
        resolve({status:false})
    }
});
    }
} 