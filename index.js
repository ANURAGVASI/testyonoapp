const express = require("express");
const app = express();
const mongoose = require("mongoose");
const clickedUsers = require("./uniqueID");
const PORT = process.env.PORT || 5000

mongoose.connect("mongodb://anuragvasi:anurag61@ds237373.mlab.com:37373/sbiintrestedusers",{ useNewUrlParser: true }, 
    (err,data) => {
    if(err){
        console.log("error connecting mongoDB", err);
    }
    else{
        console.log("sucessfully connected to DB");
    }
})

app.get("/", (req,res,next) => {
    console.log("got /");
    res.redirect("https://www.sbiyono.sbi/app/");
});

app.get("/favicon.ico", (req,res,next) =>{
    console.log("got /favicon.ico");
    res.redirect("https://www.sbiyono.sbi/app/");
})

app.get("/:customerid", (req,res,next) => {
    const customerid = req.params.customerid;
    console.log("",customerid);
    const currentTime= new Date();
    const currentOffset = currentTime.getTimezoneOffset();
    const ISTOffset = 330;
    const indianTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    const date = indianTime.getDate()+'-'+(indianTime.getMonth()+1)+'-'+indianTime.getFullYear();
    const time = indianTime.getHours() + ":" + indianTime.getMinutes() + ":" +indianTime.getSeconds();
    const dateTime = date+' '+time;

    const user = new clickedUsers({
        clickedID:customerid,
        clickedTime: dateTime.toString()
    });

    user.save((err,data) => {
        if(err){
            console.log('error saving to db', customerid);
        }
        if(data){
            console.log('saved to DB');
        }
        res.redirect("https://www.sbiyono.sbi/app/");
    });

    
});

app.get("*", (req,res,next) =>{
    console.log("get *");
    res.redirect("https://www.sbiyono.sbi/app/");
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))