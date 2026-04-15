import React from "react";
import PropTypes from "prop-types";

function Title({ text }) {
  return <h3>{text}</h3>;
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;