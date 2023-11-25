const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.port || 5000
const { createPool } = require('mysql')
app.use(cors())
app.use(express.json())
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'traveladvisor',
    connectionLimit: 10


})
app.get('/person', (req, res) => {
    const allperson = 'SELECT * FROM `persontbl`'


    pool.query(allperson, (err, result) => {
        if (err) {
            console.log("we got error ")
        }
        res.send(result)
    })
})
app.get('/country/:name', (req, res) => {
    let data = req.params?.name;
    let query = `SELECT * FROM hotelrestaurant WHERE country='${data}'`
    pool.query(query, (err, result) => {
        if (err) {
            console.log("we got error ")
        }
        res.send(result)
    })
})



app.get('/', (req, res) => {
    res.send("server is working")
})



app.listen(port, () => {
    console.log("server is running sadf ")
})