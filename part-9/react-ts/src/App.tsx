import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWDes extends CoursePartBase {
  description: string
}

interface CoursePartOne extends CoursePartBaseWDes  {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWDes  {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseWDes  {
  name: "x";
  x: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "x",
      exerciseCount: 10,
      description: "This is an awesome course part",
      x: "x"
    }
  ];


  const totalExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  
  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts}/>
      <Total totalExercises={totalExercises}/>
    </div>
  );
};

export default App;