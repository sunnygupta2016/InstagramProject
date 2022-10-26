const mongoose = require("mongoose");
const insta = require('../inst')
const Model = require("../model/index")
const mongoDbconnection = async function () {
 
  console.log(process.env.MONGO_URL);
  let connection = await mongoose.connect(process.env.MONGO_URL,
    { useUnifiedTopology: true, useNewUrlParser: true, }
  )
  if(connection){
    console.log("MongoDb connected")
    //this Code is because , when entry the dataset into database
    let findData = await Model.InstaUser.findOne({})
    if(!findData){
      await Model.InstaUser.insertMany(insta)
    }else{
      return
    }
    
   
  }else{
    console.log("Please Install Mongodb Server or Connect MongoDb")
  }
};

module.exports = {
  mongoDbconnection: mongoDbconnection,
};
