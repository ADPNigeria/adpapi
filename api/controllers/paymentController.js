const mongoose = require("mongoose");
const Payment = require("../models/Payment");

exports.payment = (req, res) => {
  
  // console.log(req.body);

  
  const pay = new Payment({
  
    reference: req.body.reference,
    trxref: req.body.trxref,
    full_name: req.body.full_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    userId:req.body.userId,
    amount: req.body.amount,
    purpose: req.body.purpose,
    status: req.body.status

  })
  

  pay
    .save()
    .then(result => {
      console.log(result);
      
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

exports.paymentInfo = (req, res) => {
  Payment.find({})
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
