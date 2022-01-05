import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { Formik } from "formik";
import Card from "../UI/Card";
import Button from "react-bootstrap/Button";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import "./SelectCategory.css";

//Configuration Screen
function SelectCategory(props) {
  //Timemode State
  //Standard value "false"
  const [timeMode, SetTimeMode] = useState(false);

  //Form validation
  //Check if every Box is selected and the number of Questions is between 1 and 10
  return (
    <Formik
      initialValues={{
        number: 1,
        category: "",
        difficulty: "",
        kind: "",
      }}
      validationSchema={Yup.object({
        number: Yup.number()
          .min(1, "Muss mindestens 1 sein")
          .max(10, "Kann nicht größer als 10 sein")
          .required("Pflichtfeld"),
        category: Yup.string().required("Pflichtfeld"),
        difficulty: Yup.string().required("Pflichtfeld"),
        kind: Yup.string().required("Pflichtfeld"),
      })}
      onSubmit={(values, { resetForm }) => {
        //set Timemode
        props.mode(timeMode);
        //Parse Configuration to App Component
        props.onSubmit(values);
        //reset Form
        resetForm({});
      }}
    >
      {(formik) => (
        <Card className="col-lg-6">
          <div className="d-flex justify-content-center">
            <h2>Select your preferences</h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="container col-lg-12">
              <div className="search">
                <div className="box col-lg-12">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-9 element">
                      {/* Create Select Boxes and bind to formik */}

                      <Form.Select
                        aria-label="category"
                        onChange={(value) => formik.setFieldValue("category")}
                        value={formik.values.category}
                        {...formik.getFieldProps("category")}
                      >
                        <option>Select Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">
                          Entertainment: Musicals &amp; Theatres
                        </option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">
                          Entertainment: Japanese Anime &amp; Manga
                        </option>
                        <option value="32">
                          Entertainment: Cartoon &amp; Animations
                        </option>
                      </Form.Select>
                      {formik.touched.category && formik.errors.category ? (
                        <div className="error">{formik.errors.category}</div>
                      ) : null}
                    </div>
                    <div className="col-lg-9 element">
                      <Form.Select
                        aria-label="kind"
                        onChange={(value) => formik.setFieldValue("kind")}
                        {...formik.getFieldProps("kind")}
                        value={formik.values.kind}
                      >
                        <option>Select Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                      </Form.Select>
                      {formik.touched.kind && formik.errors.kind ? (
                        <div className="error">{formik.errors.kind}</div>
                      ) : null}
                    </div>
                    <div className="col-lg-9 element">
                      <div className="number-input">
                        <i className="bx bxs-map">Number of Questions:</i>{" "}
                        <input
                          min="1"
                          max="50"
                          name="number"
                          type="number"
                          className="form-control"
                          {...formik.getFieldProps("number")}
                        />
                        {formik.touched.number && formik.errors.number ? (
                          <div className="error">{formik.errors.number}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-9 element">
                      <Form.Select
                        aria-label="difficulty"
                        onChange={(value) => formik.setFieldValue("difficulty")}
                        {...formik.getFieldProps("difficulty")}
                        value={formik.values.difficulty}
                      >
                        <option>Select Difficutly</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </Form.Select>
                      {formik.touched.difficulty && formik.errors.difficulty ? (
                        <div className="error">{formik.errors.difficulty}</div>
                      ) : null}
                    </div>
                    <div className="col-lg-6 col-md-10 element-switch d-flex justify-content-between row mt-3">
                      <div className="col-md-7 mt-3 elemnt-switch-text">Time restricted mode</div>
                      <div className="col-md-3 my-2">
                        {/* Switch Button which is either "true" or "false" */}
                        <BootstrapSwitchButton
                          checked={timeMode}
                          onChange={SetTimeMode}
                          onstyle="primary"
                          offstyle="info"
                        />
                      </div>
                    </div>
                    <div className="col-lg-8 element d-flex justify-content-center">
                      {/* Submit Configuration, only possible when every box is selected */}
                      <Button type="submit">Generate Quiz</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Card>
      )}
    </Formik>
  );
}

export default SelectCategory;
