import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}
const create = async(data, auth) => {
  const request = await axios.post(baseUrl, data, auth)
  return request.data
}
const update = async(data) => {
  const request = await axios.put(`${baseUrl}/${data.id}`, data)
  return request.data
}
const comment = async(data) => {
  const request = await axios.post(`${baseUrl}/${data.id}/comments`, data)
  return request.data
}
const remove = async(id, auth) => {
  return await axios.delete(`${baseUrl}/${id}`, auth)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, comment, remove }