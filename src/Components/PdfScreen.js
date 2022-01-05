import React, { useState } from "react";
import PdfContainer from "./PdfContainer";
import "./PdfScreen.css";
import Doc from "./Doc";
import Chart from "react-google-charts";
import MappedAnswers from "./MappedAnswers";

//show Result + all Questions with option to create pdf
const PdfScreen = (props) => {
  //when accessed creates pdf of the element
  function createPdf(html) {
    Doc.createPdf(html);
  }

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

  //store all Questions of the played quiz with the answers
  const [result] = useState(props.result);

  return (
    <div className="col-lg-6 pdfscreen">
      {/* Content of the Component is the Content of the pdf */}
      <PdfContainer createPdf={createPdf} back={props.back}>
        <React.Fragment>
          <div className="col-lg-12">
            <section className="flex-column">
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
              </div>
            </section>
            {console.log(result)}
            {result.map((options, i) => (
              <div>
                {/* Map the answers to the right format */}
                <MappedAnswers
                  showAll={true}
                  questionIndex={options.questionIndex}
                  questionTitle={options.questionTitle}
                  answer={options.answer}
                  correct_answer={options.correct_answer}
                />
              </div>
            ))}
          </div>
        </React.Fragment>
      </PdfContainer>
    </div>
  );
};

export default PdfScreen;
