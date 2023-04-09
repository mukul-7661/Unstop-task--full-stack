import React, { useEffect, useState } from "react";
import Slot from "./Slot";

function SlotsRow(props) {
  return (
    <div className="slots__row">
      {props.arr.map((i) => {
        return (
          <Slot
            name={i}
            seats={props.seats}
            isBooked={
              Array.isArray(props.seats) && props.seats.length > 0
                ? props.seats[i - 1].isBooked
                : false
            }
          />
        );
      })}
    </div>
  );
}

export default SlotsRow;
