import React from "react";
import PropTypes from "prop-types";
import Title from "../Title/Title";
import Third from "./Third";

function Second({ email, phoneNumber, hobbies, married }) {
  return (
    <div>
      <Title text="Second Component" />

      <p>Email: {email}</p>
      <p>Telefon: {phoneNumber}</p>

      <Third hobbies={hobbies} married={married} />
    </div>
  );
}

Second.propTypes = {
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  hobbies: PropTypes.array.isRequired,
  married: PropTypes.bool.isRequired,
};

export default Second;