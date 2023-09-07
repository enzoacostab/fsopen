import React from "react";
import { CoursePart } from "../App";

const Part: React.FC<{part: CoursePart}> = ({part}) => {

    switch (part.name){
        case "Fundamentals":
            return <p key={part.name}>{part.name} {part.exerciseCount} {part.description}</p>
        case "Using props to pass data":
            return <p key={part.name}>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>;
        case "Deeper type usage":
            return <p key={part.name}>{part.name} {part.exerciseCount} {part.exerciseSubmissionLink} {part.description}</p>;
        case "x":
            return <p key={part.name}>{part.name} {part.exerciseCount} {part.description} {part.x}</p>
        default:
            return assertNever(part);
    }
};

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

export default Part;