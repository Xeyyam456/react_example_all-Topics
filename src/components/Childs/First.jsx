import React from "react";
import Title from "../Title/Title";
import Second from "./Second";

function First() {
  const personInfo = {
    fullName: "Xeyyam Elizade",
    age: 31,
    email: "xeyyamelizade5@gmail.com",
    phoneNumber: "+994702564317",
    married: true,
    hobbies: ["Write code", "Read books", "Travel"],
  };

  return (
    <div>
      <Title text="First Component" />

      <p>Ad Soyad: {personInfo.fullName}</p>
      <p>Yaş: {personInfo.age}</p>

      <Second
        email={personInfo.email}
        phoneNumber={personInfo.phoneNumber}
        hobbies={personInfo.hobbies}
        married={personInfo.married}
      />
    </div>
  );
}

export default First;