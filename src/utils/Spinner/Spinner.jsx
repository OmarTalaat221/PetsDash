import React from "react";

import "./style.css";
import { Loader } from "rsuite";
import { ClipLoader } from "react-spinners";

const Spinner = ({ ...props }) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <ClipLoader {...props} />
    </div>
  );
};

export default Spinner;
