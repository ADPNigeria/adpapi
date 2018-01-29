const mongoose = require("mongoose");
const Contact = require("../models/Contact");

exports.createContact = (req, res) => {
 
  
  const contact = new Contact({
    adminInfo: req.body.adminInfo,
    officeNo: req.body.offficeNo,
    officeEmail: req.body.officeEmail,
    level: req.body.level,
    state: req.body.state,
    lga: req.body.lga,
    ward: req.body.ward,
    address: req.body.address
  
    });
    console.log(req.body);
  contact
    .save()
    .then(result => {
      console.log(result);  
      res.status(200).json({
        message: "successfully"
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

exports.getAllContact = (req, res) => {
  Contact.find({})
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

exports.getNationalContact = (req, res) => {
  Contact.find({})
    .where("level")
    .equals("National")
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

exports.getStateContact = (req, res) => {

  console.log(req.headers);
  
  const state = req.params.state;
  Contact.find({}) 
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

exports.getLgaContact = (req, res) => {
  Contact.find({})
    .where("level")
    .equals("lga")
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

exports.getWardContact = (req, res) => {
  Contact.find({})
    .where("level")
    .equals("ward")
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

exports.getPullingUnitContact = (req, res) => {
  Contact.find({})
    .where("level")
    .equals("pullingUnit")
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

exports.updateContact = (req, res) => {
  const updates = {
    adminInfo: req.body.adminInfo,
    offficeNo: req.body.offficeNo,
    officeEmail: req.body.officeEmail,
    socialMedia: req.body.sociaMedia,
    level: req.body.level,
    state: req.body.state,
    lga: req.body.lga,
    ward: req.body.ward,
    pollingUnit: req.body.pollingUnit
  };
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
