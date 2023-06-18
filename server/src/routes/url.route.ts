import express from "express"
import urlModel from "../models/url.model"

const urlRouter = express.Router()

// types:
type urlData = {
    id: string,
    initial_url: string,
    shortened_url: string,
    clicks: number,
    save: () =>{}
  } 

urlRouter.get('/', async (req, res)=>{
  const allURLS = await urlModel.find() 
  return res.status(200).json({allURLS})
})
urlRouter.post('/', async (req, res)=>{
//    await urlModel.create({initial_url: req.body.initial_url ,shortened_url: req.body.shortened_url, clicks: req.body.clicks})
  const url = await urlModel.create(req.body)
//   res.redirect('/')
   return res.status(200).json({url})
})

// route to the url when clicked:
urlRouter.get('/:shortUrl', async (req, res)=>{
   const shortUrl:urlData | null = await urlModel.findOne({shortened_url: req.params.shortUrl})

   if(shortUrl == null) return res.sendStatus(404)

   shortUrl.clicks++
   shortUrl.save()
   
 return res.status(200).json({shortUrl})
//    res.redirect(shortUrl.initial_url)
})

export default urlRouter;