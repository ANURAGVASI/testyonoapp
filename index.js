const express = require("express");
const app = express();
const mongoose = require("mongoose");
const clickedUsers = require("./uniqueID");

mongoose.connect("mongodb://anuragvasi:anurag61@ds237373.mlab.com:37373/sbiintrestedusers",{ useNewUrlParser: true }, 
    (err,data) => {
    if(err){
        console.log("error connecting mongoDB", err);
    }
    else{
        console.log("sucessfully connecte dto DB");
    }
})

app.get("/", (req,res) => {
    res.write("redirecting..");
    res.redirect("https://www.onlinesbi.com/");
})

app.get("/:customerid", (req,res,next) => {
    const customerid = req.params.customerid;
    console.log("",customerid);
    const user = new clickedUsers({
        clickedID:customerid
    });

    user.save((err,data) => {
        if(err){
            console.log('error saving to db', customerid);
        }
        if(data){
            console.log('saved to DB');
        }
        res.write("redirecting..");
        res.redirect("https://www.onlinesbi.com/");
    });

    
});


app.listen(3000, () => {
    console.log("server running at port 3000");
})