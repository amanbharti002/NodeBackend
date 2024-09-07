require('dotenv').config({path:"./.env"});
const mongoose =require('mongoose');
mongoose.connect(process.env.DB_URL).then((success)=>{
    console.log("DB connected")
},(error)=>{
    console.log("connection failed");
}
)
