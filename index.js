const express= require('express')
const app= express()
const port= process.env.port || 5000
const{createPool}= require('mysql')
const pool= createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'traveladvisor',
    connectionLimit:10


})
app.get('/person',(req,res)=>{
    const allperson ='SELECT * FROM `persontbl`'


    pool.query(allperson,(err,result)=>{
        if(err){
            console.log("we got error ")
        }
        res.send(result)
        }) 
})



app.get('/',(req,res)=>{
    res.send("server is working")
})



app.listen(port,()=>{
    console.log("server is running sadf ")
})