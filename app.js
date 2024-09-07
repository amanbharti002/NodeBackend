const express = require('express');
const CategoryRouter = require('./src/router/CategoryRouter')
const app = express();
const cors = require('cors');
const SubCategoryRouter = require('./src/router/SubCategoryRouter');
const ProductsRouter = require('./src/router/ProductsRouter');
const SliderRouter = require('./src/router/SliderRouter')



// app.get("/",function(req,res){
//     res.json({
//         message:"hii aman"
//     })
// })

app.use(cors())
app.use('/images',express.static("./public/upload"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1",CategoryRouter)
app.use("/api/v1",SubCategoryRouter)
app.use("/api/v1",ProductsRouter)
app.use("/api/v1",SliderRouter)

module.exports= app



