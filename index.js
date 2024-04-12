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

const UserRoutes = require("./routes/user");
app.use("/user", UserRoutes);

const BuildingRoutes = require("./routes/building");
app.use("/building", BuildingRoutes); 

const SensorRoutes = require("./routes/sensor");
app.use("/sensor", SensorRoutes);

const EventRoutes = require("./routes/event");  
app.use("/event", EventRoutes);