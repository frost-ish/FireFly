const express = require('express');
const app = express();
const port = 5000;
const dotenv=require('dotenv');
dotenv.config();
const mongoose=require('mongoose');
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT).then(runApp);

function runApp(client){
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });
}
