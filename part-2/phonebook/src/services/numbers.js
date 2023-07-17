import axios from 'axios';
const url='/api/persons';

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = obj => {
    const request = axios.post(url, obj)
    return request.then(response => response.data);
}

const del=id=>{
    const request=axios.delete(`${url}/${id}`);
    return request.then(()=>console.log('deleted'));
}
const update=(id,obj)=>{
    const request=axios.put(`${url}/${id}`, obj);
    return request.then(response=>response.data);
}
const obj={getAll,create,del,update};

export default obj;