const express= require("express");
const router= express.Router();
const Friend= require("../models/Friend");
const User= require("../models/User");


//sending a friend request;
router.post("/friendRequest/:id", async(req,res)=>{
    try{

        let userCookeId = "66334c41d767b9e8f8af7b85";
        let {id}= req.params;
        
        let user= await User.findById(id);
        let friendObj= await Friend.create({sourceId:userCookeId,targetId:id});
    console.log(friendObj,id,);
 
 let notificationObj={
    friend:friendObj,
    message:"someone send you a friend Request"
}
await User.updateOne({_id:id,},{$push:{notifications:notificationObj}});
await user.save();
res.status(201).send({message:"friend request is sent successfully"});
}
catch(err){
    res.status(500).send({message:err.message})
}

})

//accepting a friend request

router.get("/acceptRequest", async(req,res)=>{
    try{
  let userCookeId="66334cf9d767b9e8f8af7b8b";
  let user= await User.findById(userCookeId);
  let friendId= user.notifications[0].friend._id.toString();
  
  let friend= await Friend.findById(friendId);
//   console.log(friendId,friend);
user.friends.push(friend);

user.notifications.pop();
user.save();
  res.status(201).send({message:"friend Rrquest accepted"});
  
    
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})















module.exports=router;