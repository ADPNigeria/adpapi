const mongoose = require("mongoose");
const Vote = require("../models/Vote");

exports.vote = (req, res) => {
  const vote = new Vote({
    voterId:req.body.voterId,
    contestantId: req.body.constantId,
    position: req.body.position
  });
  console.log(req.body);
  
  vote
    .save()
    .then(result => {
      res.status(200).json({
        message: "Successfully"
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

exports.voteInfo = (req, res) => {
  Vote.find({})
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
