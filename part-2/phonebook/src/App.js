import './App.css';
import { useState, useEffect } from 'react';
import numbers from './services/numbers';

const App = () => {
  const [ persons, setPersons ] = useState(null);
  const [ newName, setNewName ] = useState();
  const [ newNum, setNewNum ] = useState();
  const [ filter, setFilter ] = useState('');
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);
  
  useEffect(()=>{numbers.getAll()
  .then(response=>{setPersons(response)})},[]);

  const obj={
    name:newName,
    number:newNum
  }

  const me=()=>{
    let d=document.getElementById('m');
    d.classList.add('error');
    setTimeout(() => {
      d.classList.remove('error');
      setError(null);
    }, 3000);
  }
  const ms=()=>{
    let d=document.getElementById('m');
    d.classList.add('success');
    setTimeout(() => {
      d.classList.remove('success');
      setSuccess(null);
    }, 3000);
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    if (persons && persons.some(x=>x.name===newName && x.number===newNum)){
      alert(`The user ${newName} already exists`);
    }
    else if (persons && !persons.some(x=>x.name===newName)){
      numbers.create(obj)
      .then(res=>{
      setPersons(persons.concat(res));
      setSuccess('added');
      ms();
      setNewName('');
      setNewNum('');
    });
    }
    else{
      if (window.confirm(`The user ${newName} already exists, you want to replace the number`)){
      let pe=persons.find(p=>p.name===newName);
      console.log(pe);
      const changedPer={...pe,number:newNum};
      console.log(changedPer);
      pe.number=newNum;
      numbers.update(pe.id,changedPer)
      .then(res=>{setPersons(persons.map(per=>per.id!==pe.id ? per : res));
        setSuccess('modified');
        ms();})
      .catch(error => {
        setPersons(persons.filter(per => per.id !== pe.id));
        setError('the user was already deleted from server');
        me();
      })
      };
    }
  }
  const handleDel=(event)=>{
    if (window.confirm(`Are you sure to delete the user`))
    {
      numbers.del(event.target.value)
      .then(()=>{setSuccess('deleted')
      ms();
      window.location.reload()
    }).catch(error => {
      setError('the user was already deleted from server');
      me();
    })
    }
  }
  const handleNameChange=(event)=>{
    setNewName(event.target.value);
  }
  const handleNumChange=(event)=>{
    setNewNum(event.target.value);
  }
  const handleFilter=(event)=>{
    setFilter(event.target.value);

  };
  let pf;
  persons && (pf=persons.filter(p=>p.name.toLowerCase().indexOf(filter.toLowerCase())===0));
  return (
    <div>
      <h2>Phonebook</h2>
      <div id='m'>{error}{success}</div>
      <Filter value={filter} handle={handleFilter}></Filter>
      <h2>Add a new</h2>
      <Form submit={handleSubmit} nameVal={newName} numVal={newNum} nameChange={handleNameChange} numChange={handleNumChange}/>
      <h2>Numbers</h2>
      <Numbers persons={pf} del={handleDel}/>
    </div>
  )
}
const Form=({submit,nameVal,numVal,nameChange,numChange})=>{
  return(
    <form onSubmit={submit}>
        <div>name: <input value={nameVal} onChange={nameChange}/></div>
        <div>number: <input type="tel" value={numVal} onChange={numChange}/></div>
        <div><button type="submit">add</button></div>
    </form>
  )
}
const Filter=({value,handle})=>{
  return(
    <div>filter per name: <input value={value} onChange={handle}/></div>
  )
}
const Numbers=({persons, del})=>{
  return(
    <ul>
    {persons && (persons.map(per=><li key={per.name}>{per.name} {per.number}<button value={per.id} onClick={del}>delete</button></li>))}
    </ul>)
}

export default App;