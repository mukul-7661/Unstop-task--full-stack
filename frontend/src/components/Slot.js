import React from "react";
import "./Slot.css";

function Slot(props) {
  return (
    <div className={props.isBooked == false ? "slot" : "slot__booked"}>
      {props.name}
    </div>
  );
}

export default Slot;
