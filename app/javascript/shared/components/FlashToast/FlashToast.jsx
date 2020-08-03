import React from "react";
import { Toast } from "react-bootstrap";
 
const FlashToast = ({message, show, autohide}) => {
  return (
    <Toast show={show} autohide={autohide}>
      <Toast.Header>
        <strong className="mr-auto">Header</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export { FlashToast };
