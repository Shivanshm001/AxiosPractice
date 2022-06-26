const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

app.use("/public",express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.set("x-api-key","923a99b8-247d-466b-95f7-b02dccdc898b")
    res.sendFile(path.join(__dirname,"index.html"));
});


app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`Server running at port ${PORT}`);
});