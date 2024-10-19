const express = require('express');
const CategoryRouter = require('./src/router/CategoryRouter')
const app = express();
const cors = require('cors');
const SubCategoryRouter = require('./src/router/SubCategoryRouter');
const ProductsRouter = require('./src/router/ProductsRouter');
const SliderRouter = require('./src/router/SliderRouter');
const AddCartRouter = require('./src/router/AddCartRouter');
const AccountRouter = require('./src/router/AccountRouter');
const CostomerAccountRouter = require('./src/router/CostomerAccountRouter');



// app.get("/",function(req,res){
//     res.json({
//         message:"hii aman"
//     })
// })

app.use(cors())
app.use('/images',express.static("./public/upload"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1",AccountRouter)
app.use("/api/v1",CostomerAccountRouter)
app.use("/api/v1",CategoryRouter)
app.use("/api/v1",SubCategoryRouter)
app.use("/api/v1",ProductsRouter)
app.use("/api/v1",SliderRouter)
app.use("/api/v1",AddCartRouter)

module.exports= app



