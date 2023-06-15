import React, { useState } from 'react'

const Statistics = ({good,neutral,bad}) => {
  let all=good+bad+neutral;
  let avg=((good-bad)/all).toString();
  let pos=((good/all)*100).toString()+"%";
  return(
    <div><table><tbody>
      <tr><td><h1>Statistics</h1></td></tr>
      <StatisticLine text="good" value ={good}/>
      <StatisticLine text="neutral" value ={bad}/>
      <StatisticLine text="bad" value ={neutral}/>
      <StatisticLine text="all" value ={all}/>
      <StatisticLine text="average" value ={avg}/>
      <StatisticLine text="positive" value ={pos}/>
      </tbody></table>
    </div>
  );
}

const StatisticLine=props=>{
  return(<tr><td>{props.text}</td><td>{props.value}</td></tr>);
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick=(fed,fun)=>{
    fun(fed+=1);
  }
  return (
    <div className='App'>
      <h1>Feedback</h1>
      <button onClick={()=>handleClick(good,setGood)}>good</button>
      <button onClick={()=>handleClick(neutral,setNeutral)}>neutral</button>
      <button onClick={()=>handleClick(bad,setBad)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App;
