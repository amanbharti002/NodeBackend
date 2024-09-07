// const jwt = require('jsonwebtoken');
// require('dotenv').config()

// exports.Authmiddleware =   async(req,res,next) =>{
//     try{
//         const authtoken = req.headers["authorization"].split(" ")[1];
//         console.log(authtoken)
//         const userinfo = jwt.verify(authtoken,process.env.SECRET_KEY);
//         if(userinfo){
//             req.user_id = userinfo.user_id
//             next()
//         }
//         else {
//             res.status(402).json({ status: "Failed", message: "unthorized user" })

//         }
        
        
//     }
//     catch (err) {
//         console.log(err)
//         res.status(402).json({ status: "Failed", message: "unthorized user" })

//     }
// }