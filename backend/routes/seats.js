const Seat = require("../models/Seat");
const router = require("express").Router();
const axios = require("axios");

//get booking status of all seats
router.get("/", async (req, res) => {
  try {
    const seat = await Seat.find();

    res.status(200).json(seat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// book all seats

router.post("/", async (req, res) => {
  try {
    const noOfSeats = req.body.noOfSeats;

    // Check validation for number of seats entered by user

    if (noOfSeats > 7 || noOfSeats <= 0) {
      res.status(200).json({ alert: "Not valid" });
      return;
    }

    const seats = await Seat.find();
    let flag = true;

    let seatsUnbooked = 0;

    for (let i = 0; i <= 11; i++) {
      let cnt = 0;

      for (let j = 1; i < 11 ? j <= 7 : j <= 3; j++) {
        const id = 7 * i + j;
        const isBooked = seats[id - 1].isBooked;

        if (!isBooked) {
          cnt++;

          seatsUnbooked++;
        }
      }

      // If all seats can be booked in one row

      if (cnt >= noOfSeats) {
        flag = false;
        cnt = 0;
        let bookedSeats = [];

        for (let j = 1; i < 11 ? j <= 7 : j <= 3; j++) {
          const id = 7 * i + j;

          const isBooked = seats[id - 1].isBooked;

          if (!isBooked) {
            console.log(id);
            const id1 = id - 1;
            axios.put(`http://localhost:8800/api/seats/${id}`);
            cnt++;
            bookedSeats.push(id);
          }

          if (cnt == noOfSeats) {
            res.status(200).json(bookedSeats);
            return;
          }
        }
        break;
      }
    }

    // Check for number of seats available

    if (seatsUnbooked < noOfSeats) {
      res
        .status(200)
        .json({ alert: "Number of Seats you want to book are not available" });
      return;
    }

    // If all seats can't be booked in one row

    if (flag) {
      let cnt = 0;
      let bookedSeats = [];
      for (let i = 0; i <= 11; i++) {
        for (let j = 1; i < 11 ? j <= 7 : j <= 3; j++) {
          const id = 7 * i + j;
          const isBooked = seats[id - 1].isBooked;
          if (!isBooked) {
            const id1 = id - 1;
            axios.put(`http://localhost:8800/api/seats/${id}`);
            cnt++;
            bookedSeats.push(id);
          }

          if (cnt == noOfSeats) {
            res.status(200).json(bookedSeats);
            return;
          }
        }
        if (cnt == noOfSeats) {
          break;
        }
      }
    }

    res.status(200).json("hello");
  } catch (err) {
    res.status(500).json(err);
  }
});

// reset(unbook) all seats

router.put("/reset", async (req, res) => {
  try {
    await Seat.updateMany(
      {},
      {
        $set: {
          isBooked: false,
        },
      },
      function (err, res) {
        if (err) throw err;
        console.log("reset done");
      }
    );

    res.status(200).json("reset done");
  } catch (err) {
    res.status(500).json(err);
  }
});

// book one seat with a particular id

router.put("/:id", async (req, res) => {
  try {
    await Seat.updateOne(
      { seat_no: req.params.id },
      {
        $set: {
          isBooked: true,
        },
      },
      function (err, res) {
        if (err) throw err;
        console.log("1 seat booked");
      }
    );

    res.status(200).json("booked");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
