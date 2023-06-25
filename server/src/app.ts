import express from 'express'
import urlRouter from './routes/url.route'
import userRouter from './routes/user.route'
import { requireAuth } from './middlewares/authMiddleware'

const app = express()

// middlewares:
app.use(express.json()) 
app.use(express.urlencoded({extended: false}))
require('dotenv').config()
require('./db').connectToMongoDB()

// routes:
app.use('/url', requireAuth , urlRouter)
app.use('/user',userRouter)

app.get('/', (req, res)=>{
    res.send('Welcome to the scissors server')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Port running at ${PORT}`)
})