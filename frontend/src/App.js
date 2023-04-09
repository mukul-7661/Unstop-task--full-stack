import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Slots from "./components/Slots";

function App() {
  const [noOfSeats, setNoOfSeats] = useState();
  const [bookedSeats, setBookedSeats] = useState();

  // Book the seats by sending post request and handling the response

  const submitHandler = async (e) => {
    e.preventDefault();
    // let seats;

    const seats = await axios.post(
      "https://unstop-fullstack-api.onrender.com/api/seats",
      {
        noOfSeats: noOfSeats,
      }
    );
    // .then((res) => {
    //   setBookedSeats(res.data);
    //   console.log(res.data);
    //   // seats = res.data;
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    // console.log("post");
    // console.log(bookedSeats);

    if (Array.isArray(seats.data)) {
      console.log("post");
      let message = seats.data[0];
      for (let i = 1; i < seats.data.length; i++) {
        message += ",";
        message += seats.data[i];
      }
      alert("Seats Booked are " + message);
    } else if (seats.data.alert == "Not valid") {
      alert("Please enter a number between 1 and 7");
    } else if (
      seats.data.alert == "Number of Seats you want to book are not available"
    ) {
      alert("Number of Seats you want to book are not available");
    }
    setNoOfSeats("");
  };

  // Reset all the seat bookings

  const clickHandler = async () => {
    await axios.put(
      "https://unstop-fullstack-api.onrender.com/api/seats/reset"
    );
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
