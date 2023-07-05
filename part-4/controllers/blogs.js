const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user',{username:1,name:1,id:1})
  response.json(blogs)
  })
  

blogsRouter.post('/', async(request, response) => {
  let body = request.body;
  const user = request.user
  if (!user){
    return response.status(401).json({error: "token missing"})
  }

  if (!body.title || !body.url) {
    return response.status(400).end() 
  }
  else if (!body.likes){
    body.likes=0;
  }

  const blog = new Blog({...body,user:user.id})
  const result=await blog.save()
  user.blogs=user.blogs.concat(result.id)
  await user.save()

  response.status(201).json(result)
})


blogsRouter.delete('/:id', async(request, response)=>{
  const id=request.params.id
  const BlogUser=await Blog.findById(id)
  if (!BlogUser){
    return response.status(404).json({error:"user not found"})
  }
  const LogUser = request.user
  if (!LogUser){
    return response.status(401).json({error: "token missing"})
  }
  if (BlogUser.user.toString()===LogUser.id){
    await Blog.findByIdAndRemove(id)
    return response.status(204).end()
  }
  response.status(401).json({ error: 'authorization error' })
})


blogsRouter.put('/:id', async(request, response)=>{
  const id=request.params.id
  const blog=await Blog.findById(id)
  blog.likes=request.body.likes
  const res=await Blog.findByIdAndUpdate(id, blog, {new:true})

  response.json(res)
})


module.exports = blogsRouter