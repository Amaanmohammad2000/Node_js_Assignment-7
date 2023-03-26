const Id = require("../models/ID");
const Student = require("../models/Schema");
const router = require("express").Router();

router.get("/student", async (req,res)=>{
    try {
        let student = await Student.find();
        res.status(200).json({Status: "Success", Result: student});
    } 
    catch(error){
        res.status(500).json({Status: "Falied", Message: error.message})
    }
});

router.get("/student/:id", async (req,res)=>{
    try {
        let student = await Student.findById(req.params.id);
        if(student){
            res.status(200).json({Status: "Success", Result: student});
        }
        else{
            res.status(404).json({Status: "Failed", Message: "No result found"});
        }
    } 
    catch(error) {
        res.status(500).json({Status: "Failed", Message: error.message})
    }
});

router.post("/student", async (req,res)=>{
    let {currId} = await Id.findById("student_id");
    try{
        let  newStudent = await new Student({
            _id : currId,
            name: req.headers.name,
            currentClass : req.headers.currentclass,
            division : req.headers.division
        });
        let student = await newStudent.save();
        await Id.findByIdAndUpdate("student_id", {currId : `${currId+1}`})
        res.status(200).json({status:"success", result: student});
    }
    catch(err){
        res.status(401).json({status : "failed", message : err.message});
    }
});

router.put("/student/:id", async (req,res)=>{
    try{
        let id = await Student.findById(req.params.id);
        if(id)
        {
            let updatedStudent = await Student.findByIdAndUpdate(req.params.id,
                {name:req.headers.name,currentClass : req.headers.currentclass,division : req.headers.division}
                , {new : true});
            let student = await updatedStudent.save();
            res.status(200).json({status:"success", result: student});
        }
        else
        {
            res.json({status : "failed to update", message : "Not a valid Id"});
        }
    }
    catch(err)
    {
        res.status(401).json({status : "failed", message : err.message})
    }
});

router.delete("/student/:id", async (req,res)=>{
    try {
        let id = await Student.findById(req.params.id);
        if(id){
            await Student.findByIdAndDelete(req.params.id);
            res.status(200).json({Status: "Successfully Deleted", Result: id})
        }
        else{
            res.status(404).json({Status: "Failed", Message: "Invalid ID"})
        }
    } 
    catch(error) {
        res.status(500).json({Status: "Failed", Message: error.message});
    }
});
module.exports = router;