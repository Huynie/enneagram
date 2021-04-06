import React, { useState } from 'react';

export default function Main() {
  const questions = require('./questions.json');
  const [counter, setCounter] = useState(0);
  const [result, setResult] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
  });
  const sortAnswer = (answer) => {
    const parsed = answer.replace(/["]+/g, '')
    setResult(prev => {
      return{ ...prev, [parsed]: prev[answer] + 1}
    })
  }
  // console.log(result);
  return (
      <div>
        <div>question {counter + 1}/{questions.length}</div>
        <p>{questions[counter].choice1} or {questions[counter].choice2}</p>
        <button onClick={() => sortAnswer(questions[counter].answer1)}>{questions[counter].choice1}</button>
        <button onClick={() => sortAnswer(questions[counter].answer2)}>{questions[counter].choice2}</button>
        <button onClick={() => setCounter(prev => {
          if(counter > 0){
            return prev - 1
          }else{
            return prev
          }
        })}>Prev</button>
        <button onClick={() => setCounter(prev => {
          if(counter < questions.length - 1){
            return prev + 1
          }else{
            return prev
          }
        })}>Next</button>
      </div>
  );
}