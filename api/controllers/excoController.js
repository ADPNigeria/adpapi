const mongoose = require("mongoose");
const Exco = require("../models/Exco");
const Member = require("../models/Member");

exports.createExco = (req, res) => {
  const exco = new Exco({
    personalInfo: req.body.personalInfo,
    adminInfo: req.body.adminInfo,
    level: req.body.level,
    position: req.body.position,
    state: req.body.state,
    lga: req.body.lga,
    ward: req.body.ward,
    category: req.body.category,
    pollingUnit: req.body.pollingUnit
    
  });
  exco
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created Member successfully"
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

exports.getAllExco = (req, res) => {
  Exco.find({})
    .populate("personalInfo", "-password -__v")
    .populate("adminInfo", "-password -__v")
    .exec()
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

exports.getNationalExco = (req, res) => {
  Exco.find({})
    .where("level").equals("National")
    .populate("personalInfo", "-password -__v")
    .populate("adminInfo", "-password -__v")
    .exec()
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

exports.getStateExco = (req, res) => {
  const state = req.params.state;
  Exco.find({})
    .where("level").equals(state) 
    .where("state").equals(state)
    .populate("personalInfo", "-password -__v")
    .populate("adminInfo", "-password -__v")
    .exec()
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

exports.getLgaExco = (req, res) => {
  const state = req.params.state;
  const lga = req.body.lga;
  Exco.find({})
  .where("level").equals("lga") 
  .where("state").equals(state)
  .where("lga").equals(lga)
    .populate("personalInfo", "-password -__v")
    .exec()
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

exports.getWardExco = (req, res) => {
  const state = req.params.state;
  const lga = req.params.lga;
  const ward = req.params.ward;
  Exco.find({})
    .where("level").equals("ward")
    .where("state").equals(state)
    .where("lga").equals(lga)
    .where("ward").equals(ward)
    .populate("personalInfo", "-password -__v")
    .populate("adminInfo", "-password -__v")
    .exec()
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

exports.getPullingUnitExco = (req, res) => {
  const state = req.params.state;
  const lga = req.params.lga;
  const ward = req.params.ward;
  const pollingUnit = req.params.pollingUnit;
  Exco.find({})
    .where("level").equals("pollingUnit")
    .where("level").equals("ward")
    .where("state").equals(state)
    .where("lga").equals(lga)
    .where("ward").equals(ward)
    .where("pollingUnit").equals(pollingUnit)
    .populate("personalInfo", "-password -__v")
    .populate("adminInfo", "-password -__v")
    .exec()
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

exports.updateExco = (req, res) => {
  console.log(req.body);
  const updates = {
    adminInfo: req.body.adminInfo,
    position: req.body.position,
    level: req.body.level,
    state: req.body.state,
    lga: req.body.lga,
    ward: req.body.ward,
    pollingUnit: req.body.pollingUnit
    
  };
  console.log(updates.level);
  Exco.findByIdAndUpdate(
    req.params.id,

    { $set: updates },
    { new: true, contex: "query" }
  )
    .exec()
    .then(member => {
      if (member) {
        res.status(200).json(member);
      } else {
        res.status(404).json({ message: "Invalid Member" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: err
        }
      });
    });
};

exports.deleteExco = (req, res) => {
  Exco.findByIdAndRemove(req.params.id)
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
