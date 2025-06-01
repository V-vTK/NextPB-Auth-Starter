import React from "react";
import "@/components/css/loadingCircle.css";

// https://cssloaders.github.io/
function LoadingCircle() {
  return (
    <div className="mx-1 flex justify-center items-center">
      <div className="loading-circle"></div>
    </div>
  );
}

export default LoadingCircle;
