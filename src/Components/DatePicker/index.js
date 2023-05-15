import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

const CustomDatePicker = (props) => {
  return (
    <div>
      <DatePicker
        selected={props.selected}
        placeholderText={props.placeholderText}
        onChange={props.onChange}
        minDate={new Date()}
        dateFormat="dd MMM yyyy"
        className="date-picker-container"
      />
    </div>
  );
};
export default CustomDatePicker;
