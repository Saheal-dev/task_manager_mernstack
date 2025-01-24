const express = require('express');
const app = express();
require("dotenv").config();
require('./conn/conn');
const cors = require('cors');
const UserAPI = require('./Routes/user');
const TaskAPI = require('./Routes/task');
app.use(cors());
app.use(express.json());


app.use("/api/v1", UserAPI)
//localhost:3000/api/v1/sign-in

app.use("/api/v2", TaskAPI)
// localhost:3000/api/v2/creat-task



// app.use("/",(req,res)=>{
//     res.send("Hello World");
// })

const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})