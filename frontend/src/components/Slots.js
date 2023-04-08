import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Slots.css";
import SlotsRow from "./SlotsRow";

function Slots() {
  const [seats, setSeats] = useState([]);

  var j = 0;

  let arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10, arr11;

  let createArr = () => {
    const tempArr = [];
    let i = 1;
    while (i < 8) {
      i++;
      j++;

      tempArr.push(j);
    }

    return tempArr;
  };
  arr1 = createArr();
  arr2 = createArr();
  arr3 = createArr();
  arr4 = createArr();
  arr5 = createArr();
  arr6 = createArr();
  arr7 = createArr();
  arr8 = createArr();
  arr9 = createArr();
  arr10 = createArr();
  arr11 = createArr();

  let arr12 = [];
  arr12.push(78);
  arr12.push(79);
  arr12.push(80);

  // Fetch status of all seats

  const fun1 = async () => {
    const seatsTemp = await axios.get("http://localhost:8800/api/seats");

    setSeats(seatsTemp.data);
  };

  useEffect(() => {
    fun1();
  }, [seats]);

  return (
    <div>
      <SlotsRow arr={arr1} seats={seats} />
      <SlotsRow arr={arr2} seats={seats} />
      <SlotsRow arr={arr3} seats={seats} />
      <SlotsRow arr={arr4} seats={seats} />
      <SlotsRow arr={arr5} seats={seats} />
      <SlotsRow arr={arr6} seats={seats} />
      <SlotsRow arr={arr7} seats={seats} />
      <SlotsRow arr={arr8} seats={seats} />
      <SlotsRow arr={arr9} seats={seats} />
      <SlotsRow arr={arr10} seats={seats} />
      <SlotsRow arr={arr11} seats={seats} />
      <SlotsRow arr={arr12} seats={seats} />
    </div>
  );
}

export default Slots;
