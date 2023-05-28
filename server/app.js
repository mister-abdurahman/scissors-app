const express = require('express')
const app = express()
const urlModel = require('./models/url')

// middlewares:
app.use(express.json()) 
app.use(express.urlencoded({extended: false}))
require('dotenv').config()
require('./db').connectToMongoDB()

// routes:
app.get('/', (req, res)=>{
    res.send('Welcome to the scissors server')
})
app.post('/', async (req, res)=>{
//    await urlModel.create({initial_url: req.body.initial_url ,shortened_url: req.body.shortened_url, clicks: req.body.clicks})
  const url = await urlModel.create(req.body)
//   res.redirect('/')
   return res.status(200).json({url})
})

// route to the url when clicked:
app.get('/:shortUrl', async (req, res)=>{
   const shortUrl = await urlModel.findOne({shortened_url: req.params.shortUrl})

   if(shortUrl == null) return res.sendStatus(404)

   shortUrl.clicks++
   shortUrl.save()
   
 return res.status(200).json({shortUrl})
//    res.redirect(shortUrl.initial_url)
})

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Port running at ${PORT}`)
})