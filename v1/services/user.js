const mongoose = require("mongoose");
const Model = require("../../model/index")

// Profiles with more than 5000+ followers
async function profilefollwers(req,res,next){
    try {  
           const limit = Number(req.query.limit) || 10;
           const page = Number(req.query.page) || 1;
           const skip = Math.max(0, page - 1) * limit;
           let follwersData = await Model.InstaUser.find({followers:{$gt:5000}},{profile_name:1,followers:1,}).skip(skip).limit(limit)
           
       
           return  {follwersData}
    }catch(err){
        next(err)
    }
}

//Tagging the profile with a Category (Ex: Lifestyle, Food, Travel etc)

//In the dataset there is not category , so i decided to query on business_category_name
async function taggingProfile(req,res,next){
    try {  
           const limit = Number(req.query.limit) || 10;
           const page = Number(req.query.page) || 1;
           const skip = Math.max(0, page - 1) * limit;
           let taggingProfile = await Model.InstaUser.find({business_category_name:{$in:["Lifestyle","Food","Travel"]}},{profile_name:1,followers:1,business_category_name:1}).skip(skip).limit(limit)
          
           
           return  {taggingProfile}
    }catch(err){
        next(err)
    }
}

//Followers, Following, Posts Count, Username
async function profileView(req,res,next){
    try {  
           const limit = Number(req.query.limit) || 10;
           const page = Number(req.query.page) || 1;
           const skip = Math.max(0, page - 1) * limit;
           let profileView = await Model.InstaUser.find({},{profile_name:1,followers:1,following:1,posts_count:1}).skip(skip).limit(limit)
          
           return  {profileView}
    }catch(err){
        next(err)
    }
}

//Last 15 Posts (Avg Likes, Comments,)
async function posts(req,res,next){
    try {  
           const limit = Number(req.query.limit) || 10;
           const page = Number(req.query.page) || 1;
           const skip = Math.max(0, page - 1) * limit;
           let postsData = await Model.InstaUser.aggregate([
            {
                $addFields:{
                    lastPost: { $slice: [ "$posts",-15 ] }
                }
            },
            {
                $project:{
                    lastPost:1,
                    profile_name:1,
                    averagelike: { $avg: "$lastPost.likes" },
                    averageComment: { $avg: "$lastPost.comments" }
                }
            },
            {
                $skip:skip
            },
            {
                $limit:limit
            }
           ])
          // let follwersData = await Model.InstaUser.find({},{profile_name:1,followers:1,following:1,posts_count:1}).skip(skip).limit(limit)

           return  {postsData}
    }catch(err){
        next(err)
    }
}

//Contact number and Email (If it’s in bio you can use Regex, if it’s not available can skip this)
async function email_contact(req,res,next){
    try {  
           const limit = Number(req.query.limit) || 10;
           const page = Number(req.query.page) || 1;
           const skip = Math.max(0, page - 1) * limit;
           let email_contact = await Model.InstaUser.aggregate([
            { $addFields: {
                email: { $regexFind: { input: "$biography", regex: /^[a-z0-9_.+-]+@[a-z0-9_.+-]+\.[a-z0-9_.+-]+$/, options: "i" } },
                phone: { $regexFind: { input: "$biography", regex: /^[+]{0,1}[0-9]*\-?[0-9_\-]+$/ } }
             } },
            {
                $project:{
                    email:1,
                    phone:1,
                    profile_name:1,
                   
                }
            },
            {
                $match:{
                    $expr:{
                        $and:[
                            {$ne:["$email",null]},
                            {$ne:["$phone",null]},
                        ]
                    }
                }
            },
            {
                $skip:skip
            },
            {
                $limit:limit
            }
           ])
          
           

           return  {email_contact}
    }catch(err){
        next(err)
    }
}


module.exports = {
    profilefollwers,
    taggingProfile,
    profileView,
    posts,
    email_contact
}