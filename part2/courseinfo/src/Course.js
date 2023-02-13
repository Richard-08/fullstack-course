import React from "react";

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} - {part.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = (props) => {
  const total = props.parts.reduce((total, val) => total + val.exercises, 0);
  return <strong>Total of {total} exercises</strong>;
};

export default function Course({ course }) {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}
