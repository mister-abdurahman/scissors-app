const express = require('express')

const app = express()

// DO CRUD:
// Sketch out backend flow, then start using past projects as guide. 


app.get('/', (req, res)=>{
    res.send('Welcome to the scissors server')
})

app.listen(3000, ()=>{
    console.log('Port running at 3000')
})