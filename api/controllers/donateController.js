const mongoose = require("mongoose");
const Donate = require("../models/Donate");

exports.donate = (req, res) => {
  const donate = new Donate({
    full_name: req.body.full_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    referance: req.body.referance,
    status: req.body.status,
    amount: req.body.amount,
    trsrf: req.body.trsrf,
    purpose: req.body.purpose
 
  });

  donate
    .save()
    .then(result => {
      res.status(200).json({
        message: "Success"
      });
    })
    .catch(err => {
      res.status(500).send({
        error: {
          message: err.message
        }
      });
    });
};

exports.donateInfo = (req, res) => {
  Donate.find({})
    .populate("userId", "full_name")
    .then(member => {
      res.status(200).json(member);
    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: err
        }
      });
    });
};
