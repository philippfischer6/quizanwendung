import React from "react";
import Chart from "react-google-charts";
import Button from "react-bootstrap/Button";
import Card from "../UI/Card";
import "./ResultScreen.css";

//Show Result and Provide Buttons with options to:
// * Start over with new Questions but the same Configuration
// * Start configuring a new Quiz
// * Show the false answered Question + the correct answer
// * Show all Questions with PDF create option
function ResultScreen(props) {
  //Declare headline, dependent on achieved score
  var headline;
  if (props.finalscore === 100) {
    headline = <h3>Very well done all correct!!</h3>;
  } else if (props.finalscore >= 80) {
    headline = <h3>Well done!</h3>;
  } else if (props.finalscore >= 60) {
    headline = <h3>Nice work!</h3>;
  } else if (props.finalscore >= 50) {
    headline = <h3>Good effort, but you can do better</h3>;
  } else if (props.finalscore < 50) {
    headline = <h3>You got to get better, start over :(</h3>;
  }

  //When Button is clicked: Start configuring a new Quiz
  function HandleStartOver() {
    props.startover();
  }

  //When Button is clicked: Start over with new Questions but the same Configuration
  function HandleSameQuiz() {
    props.samequiz();
  }

  //When Button is clicked: Show the false answered Question + the correct answer
  function HandleFalseAnswers() {
    props.falseanswer();
  }

  //When Button is clicked: Show all Questions with PDF create option
  function PDFHandler() {
    props.makePDF();
  }

  //False Answer Button only shown when there is a false answered Question
  var falseAnswerButton;
  if (props.finalscore === 100) {
    falseAnswerButton = (
      <Button disabled onClick={HandleFalseAnswers}>
        View false answers
      </Button>
    );
  } else {
    falseAnswerButton = (
      <Button onClick={HandleFalseAnswers}>View false answers</Button>
    );
  }

  return (
    <Card className="col-lg-6">
      <div className="p-4">
        <div className="d-flex justify-content-center">{headline}</div>
        <div className="d-flex justify-content-center">
          {/* Create Chart based on the calculated score */}
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Questions", "Percentage"],
              ["Correct Answers", props.finalscore * 1],
              ["False Answers", 100 - props.finalscore],
            ]}
            options={{
              title: "Result of your Quiz",
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <p>
            Your final score of correctly answered questions is:{" "}
            {props.finalscore}%
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5 ">
          {/* PDF Screen Button */}

          <Button onClick={PDFHandler}>Export Result as PDF</Button>
        </div>
        <div className="d-flex justify-content-center">
          <p>You can now see the solution for your false answers</p>
        </div>
        <div className="d-flex justify-content-center ">
          {/* False Answer Button */}
          {falseAnswerButton}
        </div>
        <div className="d-flex justify-content-center pt-4">
          <p>
            You can also play this configurated quiz again (with new questions)
            or start configuring a new one!
          </p>
        </div>
        <div className="d-flex justify-content-around px-5">
          {/* New Questions Button */}
          <Button onClick={HandleSameQuiz}>Play same again</Button>
          {/* New Quiz Button */}
          <Button onClick={HandleStartOver}>Start creating a new quiz</Button>
        </div>
      </div>
    </Card>
  );
}

export default ResultScreen;
