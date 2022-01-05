import React, { useState } from "react";
import SelectCategory from "./Components/SelectCategroy";
import "./App.css";
import Home from "./Home";
import QuestionProvider from "./Components/QuestionProvider";
import LoadingIndicator from "./UI/LoadingIndicator";

//Fetsh Questions from API
async function FetchQuiz(value, SetQuestions, SetshowQuestions, setLoader) {
  await fetch(
    "https://opentdb.com/api.php?amount=" +
      value.number +
      "&category=" +
      value.category +
      "&difficulty=" +
      value.difficulty +
      "&type=" +
      value.kind
  )
    .then((res) => res.json())
    .then((result) => {
      //set Questions
      SetQuestions(result.results);
      //Show Questions
      SetshowQuestions(true);
      //disable Spinner
      setLoader(false);
    });
}

//Overview of Components, declares which component is being shown
function App() {
  //get quiz and fetch questions
  const [questions, SetQuestions] = useState();
  //State to show QuestionProvider, which provides questions, when true
  const [showQuestions, SetshowQuestions] = useState(false);
  //Set Mode of the Configurated Quiz, when true a time limit is being added to the Questions
  const [mode, SetMode] = useState(false);
  //contains selected categories
  const [categoryValues, setCategoryValues] = useState();
  // shows the loading spinner when true
  const [loader, setLoader] = useState(false);

  //Accessed when the Quiz Configuration is being submitted
  const HandleGetQuiz = (values) => {
    //show Loading Spinner
    setLoader(true);
    //Set selected categories
    setCategoryValues(values);
    //Get Questions, show Questions and deactivate spinner
    FetchQuiz(values, SetQuestions, SetshowQuestions, setLoader);
    //Stop showing Configuration Screen
    SetShowSelectCategory(false);
  };

  //shows the Configuration Screen when true
  const [showSelectCategory, SetShowSelectCategory] = useState(false);

  //when "start" button on homepage is clicked
  const HandleHomeButtonClick = (value) => {
    //show Configuration Screen
    //"value" must be boolean and "true"
    SetShowSelectCategory(value);
  };

  //Set Playing Mode
  const HandleMode = (value) => {
    //true --> with time limit
    //false --> without time limit
    SetMode(value);
  };

  //Accessed when the button on the end, to replay with same configuration is being clicked
  const questionChangeHandler = () => {
    SetshowQuestions(false);
    setLoader(true);
    //get Quiz with new Questions
    FetchQuiz(categoryValues, SetQuestions, SetshowQuestions, setLoader);
  };

  //Accessed when the button on the end, to play with new config is being clicked
  //Coniguration Screen shows
  const startoverHandler = () => {
    SetshowQuestions(false);
    SetShowSelectCategory(true);
  };

  // Determine which Component is being loaded condiotionally
  // + parse props
  return (
    <>
      {loader && <LoadingIndicator loading={loader} />}

      {!showSelectCategory && !showQuestions && !loader && (
        <Home onClick={HandleHomeButtonClick} />
      )}
      {showSelectCategory && !showQuestions && (
        <SelectCategory onSubmit={HandleGetQuiz} mode={HandleMode} />
      )}
      {showQuestions && (
        <QuestionProvider
          mode={mode}
          questions={questions}
          questionchanger={questionChangeHandler}
          startover={startoverHandler}
        />
      )}
    </>
  );
}

export default App;
