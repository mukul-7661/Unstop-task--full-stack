import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Slots from "./components/Slots";

function App() {
  const [noOfSeats, setNoOfSeats] = useState();
  const [bookedSeats, setBookedSeats] = useState([]);

  // Book the seats by sending post request and handling the response

  const submitHandler = async (e) => {
    e.preventDefault();

    const seatBooked = await axios.post("http://localhost:8800/api/seats", {
      noOfSeats: noOfSeats,
    });

    if (seatBooked.data.alert == "Not valid") {
      alert("Please enter a number between 1 and 7");
    }
    if (
      seatBooked.data.alert ==
      "Number of Seats you want to book are not available"
    ) {
      alert("Number of Seats you want to book are not available");
    }
    if (Array.isArray(seatBooked.data)) {
      let message = seatBooked.data[0];
      for (let i = 1; i < seatBooked.data.length; i++) {
        message += ",";
        message += seatBooked.data[i];
      }
      alert("Seats Booked are " + message);
    }
    setNoOfSeats("");
  };

  // Reset all the seat bookings

  const clickHandler = async () => {
    await axios.put("http://localhost:8800/api/seats/reset");
    alert("All bookings have been reset");
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={submitHandler}>
          <label>Enter the number of seats </label>
          <input
            value={noOfSeats}
            onChange={(e) => {
              setNoOfSeats(e.target.value);
            }}
          ></input>
          <button type="submit">Book</button>
        </form>
        <button className="reset__button" onClick={clickHandler}>
          Reset (Testing purpose)
        </button>
        <div className="demonstration__div">
          <p>Please click to see demonstration - </p>
          <a href="https://www.youtube.com/watch?v=hV37fPOlP3w">
            See demonstration
          </a>
        </div>
      </div>
      <div>
        <Slots />
        <div>
          <div className="slots__label__div">
            <div className="slot__label"></div>
            <p>- Not booked</p>
          </div>
          <div className="slots__label__div">
            <div className="slot__booked__label"></div>
            <p>- booked</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
