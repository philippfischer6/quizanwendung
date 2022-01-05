import React from "react";
import Loader from "react-loader-spinner";
import "./LoadingIndicator.css";

//when accessed with "true" value, Loader is being shown
const LoadingIndicator = (props) => {
  const loader = props.loading;

  //Loader config
  return (
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loader && <Loader type="TailSpin" color="blue" height="800" width="70" />}
    </div>
  );
};

export default LoadingIndicator;
