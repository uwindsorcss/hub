import React, { useState } from "react";
import { Alert as BSAlert } from "react-bootstrap";
import PropTypes from 'prop-types';
 
const Alert = ({message, variant, isdismissible}) => {
  const [show, setShow] = useState(true);

  if (show){
    return (
      <BSAlert variant={variant} onClose={() => setShow(false)} dismissible={isdismissible}>
        {message}
      </BSAlert>
    );
  }

  return null;
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light']).isRequired,
  isdismissible: PropTypes.bool
};

export { Alert };
