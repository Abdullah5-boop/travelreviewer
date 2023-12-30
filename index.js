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
app.get('/hotel/:id', (req, res) => {
    const data = req?.params;
    console.log(data.id)
    const hotels = `
    
    SELECT 
    r.personidaemail,
    r.hrid,
    r.reviewtext,
    p.personidaemail,
    p.personname,
    p.personlocation,
    h.hrid,
    h.country,
    h.price,
    h.hotelname
    FROM review r JOIN persontbl p ON r.personidaemail = p.personidaemail 
    JOIN hotelrestaurant h ON h.hrid = r.hrid 
    WHERE r.hrid= '${data.id}'
    
    
    
    `


    pool.query(hotels, (err, result) => {
        if (err) {
            console.log("we got error ")
        }
        res.send(result)
    })

})

app.get('/identity/:id',(req,res)=>{
    const value= req.params.id;
    const querry=`SELECT * FROM hotelrestaurant WHERE hrid='${value}'`
    pool.query(querry,(err,result)=>{
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})


app.get('/login/:email', (req, res) => {
    const data = req?.params.email;

    let queries = ` SELECT COUNT(*) as count FROM persontbl WHERE personidaemail='${data}'`
    pool.query(queries, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result[0]);

        res.send(result[0])
    })
})
app.get('/signup/:email', (req, res) => {
    const data = req?.params.email;

    let queries = ` SELECT COUNT(*) as count FROM persontbl WHERE personidaemail='${data}'`
    pool.query(queries, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result[0]);

        res.send(result[0])
    })
})
app.post('/signuppost', (req, res) => {
    const data = req?.body;
    console.log(data);
    const querry = `INSERT INTO persontbl(personidaemail, personname) VALUES ('${data?.email}','${data?.name}')`
    pool.query(querry, (err, result) => {
        if (err) { console.log(err) }
        res.send(result)
    })

})

app.post('/reviewpost', (req, res) => {
    const data = req.body
    let querry = `

    INSERT INTO review(personidaemail, hrid, qs1, reviewtext) 
    VALUES ('${data.email}','${data.hotleid}','1','${data.cmnt}')

    `
    pool.query(querry, (err, result) => {
        if (result) { console.log(result) }
        res.send(result)
    })

    console.log(data)
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