import React, { useState } from "react";
import MappedAnswers from "./MappedAnswers";
import Button from "react-bootstrap/Button";
import "./FalseAnswers.css";

//show Questions that were false answered + correct answer
const FalseAnswers = (props) => {
  //store all Questions of the played quiz with the answers
  const [result] = useState(props.result);

  //return to the Result Screen Component
  function HandleClick() {
    props.back();
  }

  return (
    <div className="col-lg-6 falseanswer">
      {result.map((options, i) => (
        <div>
          {/* Map the answers to the right format */}
          <MappedAnswers
            showAll={false}
            questionIndex={options.questionIndex}
            questionTitle={options.questionTitle}
            answer={options.answer}
            correct_answer={options.correct_answer}
          />
        </div>
      ))}
      {/* Button to return to the Result Screen */}
      <Button className="mx-4 mb-3 col-lg-2 " onClick={HandleClick}>
        Go back
      </Button>
    </div>
  );
};

export default FalseAnswers;
