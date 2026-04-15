import React from "react";
import PropTypes from "prop-types";
import Title from "../Title/Title";

function Third({ hobbies, married }) {
  return (
    <div>
        <Title text="Third Component" />

      <p>Status: {married ? "Married" : "Single"}</p>

      <ul  className="list-group list-unstyled">
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}

Third.propTypes = {
  hobbies: PropTypes.array.isRequired,
  married: PropTypes.bool.isRequired,
};

export default Third;