const mongoose = require('mongoose');
const Complain = require('../models/Complain');


exports.summitcomplain =  (req, res) => {
    const complain = new Complain({
        name: req.body.name,
        subject: req.body.subject,
        message: req.body.message,
        tags: req.body.tags
        });

    complain
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created Member successfully",  
      });
    })
    .catch(err => {
      res.status(500).send({
        error:{
          message: err.message
        }
      });
    });  
}

exports.showcomplain =  (req, res) => {
  Complain.find({})
  .exec()
  .then( result =>{
      res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).send({
      error:{
        message: err.message
      }
    });
  });
}
  
exports.deleteComplain = (req, res) => {
    Complain.findByIdAndRemove(req.params.id)
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Deleted"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

