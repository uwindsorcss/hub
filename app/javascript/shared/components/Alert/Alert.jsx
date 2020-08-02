import React from "react";
import { Alert as BSAlert } from "react-bootstrap";
 
const Alert = ({message, variant}) => {
  return (
    <BSAlert variant={variant}>
      {message}
    </BSAlert>
  );
};

export { Alert };
