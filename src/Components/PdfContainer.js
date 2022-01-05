import React from "react";
import Button from "react-bootstrap/Button";
import "./PdfContainer.css";

//Create pdf
export default (props) => {
  //return to the Result Screen Component
  function HandleClick() {
    props.back();
  }

  //create reference
  const bodyRef = React.createRef();
  //Get Reference on the current element and on click refer to the createPdf method
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <section className="pdf-container">
      <section className="pdf-toolbar d-flex justify-content-center">
        <Button className="mx-2" onClick={HandleClick}>
          Go back
        </Button>
        {/* When button is being clicked, the current component (the one referenced) is transformed to pdf */}
        <Button onClick={createPdf}>Create PDF</Button>
      </section>

      {/* Current referenced Component */}
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  );
};
