const express=require("express");
const { connection } = require("./db");
var cors = require('cors');
const { Jobrouter } = require("./Routes/Jobroute");
const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home page");
});


app.use("/jobs",Jobrouter);


app.listen(8080,async()=>{
    try {
        console.log("connecting...");
        await connection;
        console.log("connected")
    } catch (error) {
        res.send({"mgs":error.message});
    }
});