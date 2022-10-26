require('dotenv').config()
const express = require('express');
const app = express();
const fs = require('fs');
const insta = require('./inst')
const mongoDb = require("./connection/connection")
const Model = require("./model/index")
const v1Routes = require('./v1/routes')
console.log("Total Data",insta.length)

app.use('/api/v1/', v1Routes);
mongoDb.mongoDbconnection()



app.listen(3000,async()=>{
    console.log('server is running')
    
})
