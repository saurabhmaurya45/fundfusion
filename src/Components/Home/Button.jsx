import React from "react";
import { Link } from "react-router-dom";

const Button = ({ styles, content }) => (
  <Link to="/main/login">
    <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
      {content ?? "Get Started"}
    </button>
  </Link>
);

export default Button;