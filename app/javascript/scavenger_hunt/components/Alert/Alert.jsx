import React from "react";
import { Alert as BSAlert } from "react-bootstrap";
import PropTypes from 'prop-types';
 
const Alert = ({message, variant}) => {
  return (
    <BSAlert variant={variant}>
      {message}
    </BSAlert>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'seccess', 'danger', 'warning', 'info', 'dark', 'light']).isRequired,
};

export { Alert };
