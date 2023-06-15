import './App.css';

function App() {
  const course= 
  { 
    name:'Half Stack application development',
    parts:
    [{
      name:'Fundamentals of React',
      exercises:10},
    {
      name:'Using props to pass data',
      exercises:7},
    {
      name:'State of a component',
      exercises:14}
    ]
  };

  return (
    <div className="App">
      <Header course={course}/>
      <Content parts={course}/>
      <Total exercises={course}/>
    </div>
  );
}
const Header=(props)=>{
  return <h1>{props.course.name}</h1>
};
const Part=(props)=>{
  return (<p>
  {props.part.name} {props.part.exercises}
</p>);
}
const Content=(props)=>{
  return (<div>
  <Part part={props.parts.parts[0]}/>
  <Part part={props.parts.parts[1]}/>
  <Part part={props.parts.parts[2]}/>
</div>);
}
const Total=(props)=>{
  return <p>Number of exercises {props.exercises.parts[0].exercises + props.exercises.parts[1].exercises + props.exercises.parts[2].exercises}</p>
}
export default App;
