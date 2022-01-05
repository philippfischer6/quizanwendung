import React from "react";
import "./Home.css"
import Card from "./UI/Card";
import logo from "./Pictures/quizapplication.png";
import Button from "react-bootstrap/Button";

//Home screen, with button to start the Quiz
function Home(props) {

    //when clicked, quiz configuration begins
    const HandleClick =()=>{
        props.onClick(true);
    }

  return (
    <Card className="col-lg-5">    
        <div className="d-flex justify-content-center">
            <img src={logo} alt="logo"/>
        </div>
        <div className="ml-1">
            <p>With this application it is possible to create your own quiz! Pick your preference and start answering the questions</p>  
        </div>
        <div className="d-flex justify-content-center">
            {/* Button to start Quiz Configuration */}
            <Button type="submit" onClick={HandleClick}>
                Start your Quiz!
            </Button>
            
        </div>
    </Card>
  );
}

export default Home;
