import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries]=useState(null);
  const [ filter, setFilter ] = useState('');
  const [ wea, setWea ] = useState({temp:'', img:'', wind:[]});
  const options ={
    params: {q: ''},
    headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
 

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then(res=>{
      let names=res.data;
      let add=[];
      for (let i=0;i<names.length;i++){
      add.push(names[i]);
      setCountries(add);
    }
    });
  },[])

  const getInfo=()=>{
    axios.get('https://weatherapi-com.p.rapidapi.com/current.json',options)
    .then(res=>{
      console.log(res);
      let w=wea;
      w.temp=res.data.current.temp_c;
      w.img=res.data.current.condition;
      w.wind[0]=res.data.current.wind_mph;
      w.wind[1]=res.data.current.wind_dir;
      setWea(w);
    });
  };

  let pf=null;
  countries && (pf=countries.filter(p=>p.name.common.toLowerCase().indexOf(filter.toLowerCase())===0));
  if (pf && pf.length>1){ 
    for (let i=0;i<pf.length;i++){
      if (pf[i].name.common===filter){
        pf=countries.filter(p=>p.name.common===filter)
        options.params.q=pf[0].latlng.join(',');
        getInfo();
      }
    }
  }
  else if (pf && pf.length===1){
    if (options.params.q!==pf[0].latlng){
      options.params.q=pf[0].latlng.join(',');
      getInfo();
    }
  }

  const handleFilter=(event)=>{
    setFilter(event.target.value);
  };

  return (
    <div className="App">
    <Filter handle={handleFilter} value={filter}/>
    <ul>
     {pf && pf.length===1 ? <Countrie data={pf[0]} wea={wea}></Countrie> : pf && pf.length<10 && pf.length>1 ? pf.map((con)=><li key={con.name.common}>{con.name.common}<button onClick={()=>setFilter(con.name.common)}>show</button></li>) : <p>Too many matches</p>}
     </ul>
    </div>
  );
}

const Countrie=({data, wea})=>{
  return(
    <div>
    <h1>{data.name.common}</h1>
    <p>{data.capital}</p>
    <p>{data.population}</p>
    <h2>languages</h2>
    <ul>
      {Object.values(data.languages).map(lan=><li key={lan}>{lan}</li>)}
      </ul>
    <img alt={data.flags.alt} src={data.flags.png}></img>
    <h2>Weather in {data.capital}</h2>
    <b>temperature: </b>{wea.temp} Celcius
    <img alt='' src={wea.img.icon}></img>
    <strong>wind: </strong>{wea.wind[0]} mph, direction {wea.wind[1]}
    </div>
  )
}

const Filter=({value,handle})=>{
  return(
    <div>filter per name: <input value={value} onChange={handle}/></div>
  )
}

export default App;
