import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import Button from "react-bootstrap/Button";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "./Question.css";

//Show and answer the Questions
function Question(props) {
  //get index of last Question
  const maxIndex = props.questions.length;
  //state of current index
  const [currentIndex, setCurrentIndex] = useState(0);
  //time when no time mode is being selected
  let time = 10000000000000000000000000;
  //when time mode is being true, calulate 30seconds per question
  if (props.mode) {
    time = 0;
    time = props.questions.length * 30;
  }
  //set created time in state
  const [counter, setCounter] = useState(time);
  //state for the Questions
  const [questions, setQuestions] = useState([]);
  //state for only the answer options of the Questions
  const [options, setOptions] = useState([]);
  //current Question
  const question = questions[currentIndex];
  //state for selected answer
  const [answer, setAnswer] = useState();
  //calculate joker in state
  const [jokercount, setJokercount] = useState(
    Math.round(props.questions.length / 5)
  );
  //state for correct Answer to question (used for joker)
  const [correctQuestion, setCorrectQuestion] = useState();

  //Let timer run down
  useEffect(() => {
    counter > 0 &&
      setInterval(() => {
        setCounter((time) => time - 1);
      }, 1000);
  }, []);

  //Check if time has run out, if true submit all answered questions
  // Do not need to be every possible question
  useEffect(() => {
    if (counter === 0) {
      array = { ...answer };

      array[currentIndex] = {
        questionIndex: maxIndex,
      };
      //submit Result
      props.finished(array);
    }
  }, [counter]);

  //Function do decode Question to html
  const decodeHTML = function (html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  let array = [];

  //Bring Questions and answers in correct format and+
  //decode to html
  useEffect(() => {
    const decodedQuestions = props.questions.map((q) => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decodeHTML(a)),
      };
    });
    setQuestions(decodedQuestions);
  }, [props.questions]);

  //calulate randmo int value
  // used for random order of answer options on ever Question
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  //Set the options of the Question, when the question state is full
  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers];
    answers.splice(
      getRandomInt(question.incorrect_answers.length),
      0,
      question.correct_answer
    );
    setOptions(answers);
  }, [question]);

  //return if there are no questions
  if (!question) {
    return <div>loading</div>;
  }

  //When "previous" Button is being clicked
  //Get to Question before
  const prevClickHandler = () => {
    setCurrentIndex(currentIndex - 1);
  };

  //When Joker Button is being used
  //Set correct answer of the current Question
  //Remove 1 from Joker Count
  const useJokerHandler = () => {
    if (jokercount === 0) {
      return;
    } else {
      setCorrectQuestion(question.correct_answer);
      setJokercount(jokercount - 1);
    }
  };
  //When "next" Button is being clicked
  //Get to next Question
  const nextClickHandler = (values) => {
    setCurrentIndex(currentIndex + 1);

    //Check if there is something in answer array (true if first Question)
    if (answer === null) {
      //add new entry
      array[currentIndex] = {
        questionIndex: currentIndex + 1,
        questionTitle: question.question,
        answer: values.picked,
        correct_answer: question.correct_answer,
      };
      //When there was already a Question, get Data from before and then add new one
    } else {
      //get data
      array = { ...answer };

      //add new entry
      array[currentIndex] = {
        questionIndex: currentIndex + 1,
        questionTitle: question.question,
        answer: values.picked,
        correct_answer: question.correct_answer,
      };
    }
    //set Answer
    setAnswer(array);

    //If last Answer, submit Answers
    if (currentIndex === maxIndex - 1) {
      props.finished(array);
    }
  };

  //Previous button, only enabled when there are previous questions
  var prevButton;
  if (currentIndex === 0) {
    prevButton = (
      <Button variant="secondary" onClick={prevClickHandler} disabled>
        Previous
      </Button>
    );
  } else {
    prevButton = (
      <Button variant="secondary" onClick={prevClickHandler}>
        Previous
      </Button>
    );
  }

  //Next button, only enabled when there is a next question
  var nextButton;
  if (currentIndex === maxIndex - 1) {
    nextButton = (
      <Button variant="secondary" disabled>
        Next
      </Button>
    );
  } else {
    nextButton = (
      <Button variant="secondary" type="submit">
        Next
      </Button>
    );
  }

  //Finsih button, only enabled on the Slide of the last Question
  //Overrides Next Button
  var finishButton;
  if (currentIndex === maxIndex - 1) {
    nextButton = (
      <Button variant="primary" type="submit">
        Finish Quiz
      </Button>
    );
  } else {
    finishButton = "";
  }

  return (
    <Card className="col-lg-6">
      {
        //Show Joker and left Time, if the time limit mode is being true
        <div className="d-flex justify-content-center px-3">
          {props.mode && <div className="mx-3 my-2">Time left: {counter}</div>}
          <div className="mx-3 my-2">Jokers left: {jokercount}</div>
          <Button
            className="d-flex justify-content-start"
            onClick={useJokerHandler}
            variant="success"
          >
            Use joker
          </Button>
        </div>
      }

      <div className="p-4">
        <p>Question {currentIndex + 1}</p>
        <h3>{question.question}</h3>
        {/* Form validation
            Check if every Box is selected */}
        <Formik
          initialValues={{
            picked: "",
          }}
          validationSchema={Yup.object({
            picked: Yup.string().required("Please select Box"),
          })}
          onSubmit={(values, { resetForm }) => {
            //When submitted
            //reset state
            setCorrectQuestion(null);
            //parse values to Hanlder, which sets array
            nextClickHandler(values);
            //reset Selection
            resetForm({});
          }}
        >
          {({ values }) => (
            <Form>
              <div role="group" aria-labelledby="my-radio-group">
                {
                  //Map over options to show all
                  options.map((option, i) => (
                    <div>
                      {(() => {
                        //Only show correct answer if joker is being used
                        if (option === correctQuestion && jokercount >= 0) {
                          return (
                            <label className="right-asnwer">
                              {/* Field Component -> Checkbox */}
                              <Field
                                className="mt-3 mx-3"
                                type="radio"
                                name="picked"
                                id={i + 1}
                                value={option}
                              />
                              {option}
                            </label>
                          );
                          //show all options normally
                        } else {
                          return (
                            <label>
                              {/* Field Component -> Checkbox */}
                              <Field
                                className="mt-3 mx-3"
                                type="radio"
                                name="picked"
                                id={i + 1}
                                value={option}
                              />
                              {option}
                            </label>
                          );
                        }
                      })()}
                    </div>
                  ))
                }
              </div>

              <div className="d-flex justify-content-between pt-4">
                {/* Buttons */}
                {prevButton}
                {finishButton}
                {nextButton}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Card>
  );
}
export default Question;
