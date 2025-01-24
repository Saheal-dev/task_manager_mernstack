const Router = require('express').Router();
// const task = require('../Models/task');
const Task = require('../Models/task');
const User = require('../Models/user');
const {AuthenticateToken} = require('./auth');

//create-task ==
Router.post("/create-task", AuthenticateToken, async (req, res) => {
    try {
        const { title, desc } = req.body;
        const userId = req.user.id; // Get user ID from AuthenticateToken middleware

        const newTask = new Task({ title, desc });
        const saveTask = await newTask.save();
        const taskId = saveTask._id;

        await User.findByIdAndUpdate(userId, { $push: { tasks: taskId } });
        res.status(200).json({ message: "Task Created Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get All Tasks
Router.get("/get-all-tasks", AuthenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from AuthenticateToken middleware
        const userdata = await User.findById(userId).populate({
            path: "tasks",
            options: { sort: { createdAt: -1 } },
        });
        res.status(200).json({ userdata });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete Task====
Router.delete("/delete-task/:id",AuthenticateToken, async(req, res)=>{
    try {
        const {id}=req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId,{$pull:{tasks:id}});
        res.status(200).json({message:"Task Deleted Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal server error"});
        
    }
})

// Update Task-=-=-=-=
Router.put("/update-task/:id",AuthenticateToken, async(req, res)=>{
    try {
        const {id}=req.params;
        const {title, desc}= req.body;
        await Task.findByIdAndUpdate(id,{title:title, desc:desc});
        res.status(200).json({message:"Task Updated Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal server error"});
    }
})


//update-important task===
Router.put("/update-imp-task/:id",AuthenticateToken, async(req, res)=>{
    try {
        const {id}=req.params;
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.important;
        await Task.findByIdAndUpdate(id,{important:!ImpTask});
        res.status(200).json({message:"Task Updated Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal server error"});
    }
})

//update-Complete task===
Router.put("/update-complete-task/:id",AuthenticateToken, async(req, res)=>{
    try {
        const {id}=req.params;
        const TaskData = await Task.findById(id);
        const CompleteTask = TaskData.complete;
        await Task.findByIdAndUpdate(id,{complete:!CompleteTask});
        res.status(200).json({message:"Task Updated Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal server error"});
    }
})

//get Important Task====
Router.get("/get-imp-task",AuthenticateToken, async(req, res)=>{
    try {
        const {id}= req.headers;
        const Data = await User.findById(id).populate({
            path :"tasks",
            match:{important:true},
             options:{sort:{createdAt:-1}}});

             const ImpTaskData = Data.tasks;
        res.status(200).json({data : ImpTaskData});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal server error"});
        
    }
})

// get Complete Task====
Router.get("/get-complete-task",AuthenticateToken, async(req, res)=>{
    try {
        const {id}= req.headers;
        const Data = await User.findById(id).populate({
            path :"tasks",
            match:{complete:true},
             options:{sort:{createdAt:-1}}});

             const CompTaskData = Data.tasks;
        res.status(200).json({data : CompTaskData});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal server error"});
        
    }
})


// get In-Complete Task====
Router.get("/get-incomplete-task",AuthenticateToken, async(req, res)=>{
    try {
        const {id}= req.headers;
        const Data = await User.findById(id).populate({
            path :"tasks",
            match:{complete:false},
             options:{sort:{createdAt:-1}}});

             const CompTaskData = Data.tasks;
        res.status(200).json({data : CompTaskData});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal server error"});
        
    }
})




module.exports = Router;