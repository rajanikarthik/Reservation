const Express=require('express')
const routes=require('./Middleware/Routes/routes')
const cors = require('cors');
var port = process.env.PORT || 4010;


const app=Express()

app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())
app.use(cors()); 
app.use(routes)

app.listen(port,()=>{
    console.log('Listening to the port '+ `${port}`)
})