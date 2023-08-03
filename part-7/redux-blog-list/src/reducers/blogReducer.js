import {createSlice} from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const slice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        updateBlog(state, action){
            return state.map(blog => blog.id===action.payload.id ? action.payload : blog)
        },
        addBlog(state, action){
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        deleteBlog(state, action){
            return state.filter(blog => blog.id !== action.payload)
        }
    }
})

export const {addBlog, updateBlog, setBlogs, deleteBlog} = slice.actions

export const initializeBlogs = () =>{
  return async dispatch =>{
    let blgs = await blogService.getAll()
    dispatch(setBlogs(blgs))
  }
}

export const createBlog = (content, auth) =>{
  return async dispatch =>{
    const blg = await blogService.create(content, auth)
    dispatch(addBlog(blg))
  }
}

export const updBlog = blog =>{
  return async dispatch =>{
    const blg = await blogService.update(blog)
    dispatch(updateBlog(blg))
  }
}

export const commentBlog = blog =>{
  return async dispatch =>{
    const blg = await blogService.comment(blog)
    dispatch(updateBlog(blg))
  }
}

export const removeBlog = (id, auth) =>{
  return async dispatch =>{
    await blogService.remove(id, auth)
    dispatch(deleteBlog(id))
  }
}

export default slice.reducer