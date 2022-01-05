import React from "react";

//Bring questions and Answers in right format
function MappedAnswers(props) {
  //If-Statement in order to either show all answers or only the false answered Questions
  //If the all questions need to be shown, props.showAll must be "true" when instancing the component
  if (props.answer === props.correct_answer && !props.showAll) {
    return "";
  } else {
    return (
      <div className="m-4">
        {/* Return Question in right Format */}
        <p>Question {props.questionIndex}</p>
        <h3>{props.questionTitle}</h3>
        <p>Your answer: {props.answer}</p>
        <p>Correct answer: {props.correct_answer}</p>
        <hr />
      </div>
    );
  }
}

export default MappedAnswers;
