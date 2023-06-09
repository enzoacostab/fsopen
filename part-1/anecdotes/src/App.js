import './App.css';
import { useState } from 'react';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(6))
  
  const handleClick=()=>{
    let ran=Math.round(Math.random()*5);
    setSelected(1*ran);
  }
  const voteClick=()=>{
    const copy=[...votes];
    copy[selected]++;
    setVotes(copy);
    console.log(votes);
  }
  let i=Math.max(...votes);
  let mv=votes.indexOf(i);
  return (
    <div className='App'>
      <h1>Anecdote</h1>
      {anecdotes[selected]}
      <p>{votes[selected]} votes</p>
      <button onClick={handleClick}>next</button>
      <button onClick={voteClick}>vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mv]} </p>
      <p>{i} votes</p>
    </div>
  )
};




export default App;
