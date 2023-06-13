const express=require("express");
const { Jobmodel } = require("../models/Jobmudule");

const Jobrouter=express.Router();

Jobrouter.post("/",async(req,res)=>{
    try {
        let job=new Jobmodel(req.body);
    await job.save();
    res.send({"msg":"data has been saved"});
    } catch (error) {
        res.send({"mgs":error.message});
    }
});

Jobrouter.get("/",async(req,res)=>{
    try {
        let {page,limit,sort,order,role,language}=req.query;
        console.log({page,limit,sort,role,language});
        let pages={};
        let sorted={};
        let filter={};

        let skip=0;
        if(page && limit)
        {
            skip=(page-1)*limit;
        }else{
            skip=0;
            limit=100;
        }

        if(sort && order)
        {
            if(order=="asc")
            {
                sorted={[sort]:1}
            }else{
                sorted={[sort]:-1}
            }
        }else{
            sorted={postedAt:-1}
        }

        if(role)
        {
            filter={role:role}
        }



        let jobs=await Jobmodel.find(filter).sort(sorted).skip(skip).limit(limit);
        console.log(jobs.length);
        if(language)
        {
            let searched=jobs.filter((item,index)=>{
                return (item.language.toLowerCase().includes(language.toLowerCase()));
            });
            res.send(searched);
        }else{
            res.send(jobs);
        }
        
    } catch (error) {
        res.send({"mgs":error.message});
    }
});


module.exports={Jobrouter};