import Question from "./Question";
import React, { useState } from "react";
import ResultScreen from "./ResultScreen";
import FalseAnswers from "./FalseAnswers";
import PdfScreen from "./PdfScreen";

//Overview of Components, determine which is being shown
function QuestionProvider(props) {
  // shows the Questions when true
  const [showQuestions, setShowQuestions] = useState(true);
  // shows the ResultScreen when true
  const [showResultScreen, setShowResultScreen] = useState(false);
  //State to round the Result percent value
  const [roundedresult, setRoundedResult] = useState(0.0);
  //Contains the Result of Quiz:
  // * Question
  // * Question_NR
  // * ChosenAnswer
  // * CorrectAnswer
  const [result, setResult] = useState();
  // shows the FalseAnswer Screen when true
  const [showFalseAnswers, setShowFalseAnswers] = useState(false);
  // shows the PDF Screen when true
  const [showPDFScreen, setShowPDFScreen] = useState(false);

  //Score of the Quiz
  let score = 0.0;

  //When Quiz is being submitted, Result is being set, Score is calculated and Result Screen shown
  const finishQuizHandler = (data) => {
    //set Result
    setResult(Object.values(data));
    //number of questions
    let questioncount = 0;
    //number of correclty answered questions
    let correctanswers = 0;

    //Check if the Time Limit Mode was set
    //If true, the score has to be calculated differently because it could happen that the
    //time runs out and the question count dont matches the answered questions
    //Therefore only the size of the Answred Questions is being used
    if (props.mode) {
      questioncount = data[Object.keys(data).length - 1].questionIndex;

      for (let index = 0; index < Object.keys(data).length - 1; index++) {
        //Check if correct answerd matches chosen answer
        if (data[index].answer === data[index].correct_answer) {
          //if true, add correctanswer count by one
          correctanswers = correctanswers + 1;
        }
      }
      //When there is no time mode, the quiz only finished when all Questions are being answered
    } else {
      questioncount = Object.keys(data).length;
      for (let index = 0; index < questioncount; index++) {
        //Check if correct answerd matches chosen answer
        if (data[index].answer === data[index].correct_answer) {
          //if true, add correctanswer count by one
          correctanswers = correctanswers + 1;
        }
      }
    }

    //calculate score
    score = correctanswers / questioncount;
    //Convert to percent
    var num = score * 100;
    //round result and store in state
    setRoundedResult(num.toFixed(0));

    //show Result Screen
    setShowResultScreen(true);
    setShowQuestions(false);
  };

  //When Button is clicked: Start configuring a new Quiz
  function startoverHandler() {
    setShowResultScreen(false);
    props.startover();
  }
  //When Button is clicked: Start over with new Questions but the same Configuration
  function samequizHandler() {
    setShowResultScreen(false);
    props.questionchanger();
  }
  //When Button is clicked: Show the false answered Question + the correct answer
  function falseAnswerHandler() {
    setShowResultScreen(false);
    setShowFalseAnswers(true);
  }
  //When Button is clicked: Return to Result Screen
  function BackHandler() {
    setShowResultScreen(true);
    setShowFalseAnswers(false);
    setShowPDFScreen(false);
  }
  //When Button is clicked: Show all Questions with PDF create option
  function PdfHandler() {
    setShowResultScreen(false);
    setShowFalseAnswers(false);
    setShowPDFScreen(true);
  }

  // Determine which Component is being loaded condiotionally
  // + parse props
  return (
    <>
      {showQuestions && (
        <Question
          questions={props.questions}
          mode={props.mode}
          finished={finishQuizHandler}
        />
      )}

      {showResultScreen && (
        <ResultScreen
          finalscore={roundedresult}
          falseanswer={falseAnswerHandler}
          samequiz={samequizHandler}
          startover={startoverHandler}
          makePDF={PdfHandler}
        />
      )}

      {showFalseAnswers && (
        <FalseAnswers
          samequiz={samequizHandler}
          startover={startoverHandler}
          result={result}
          back={BackHandler}
        ></FalseAnswers>
      )}

      {showPDFScreen && (
        <PdfScreen
          finalscore={roundedresult}
          result={result}
          back={BackHandler}
        />
      )}
    </>
  );
}

export default QuestionProvider;
