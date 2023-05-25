const express = require('express')
const data = require('./dummyData.json')

const app = express()

// DO CRUD:
// Sketch out backend flow, then start using past projects as guide. 

// Re-read the project goals
// Sketch the database design
// Highlight requirements fo reach CRUD method

app.post('/createData', (req, res, next)=>{
    try {
        console.log(req.body)
        // const {name, age} = req.body
        // data.push({name: name, age: age})
        // return res.status(200).json({name, age})
    } catch (error) {
        console.log(error)
        res.status(500).send("Something broke")
    }
})


app.get('/', (req, res)=>{
    res.send('Welcome to the scissors server')
})

app.listen(3000, ()=>{
    console.log('Port running at 3000')
})