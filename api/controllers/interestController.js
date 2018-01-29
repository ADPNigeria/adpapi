const mongoose = require("mongoose");
const Interest = require("../models/Interest");

exports.interest = (req, res) => {

  const interst = new Interest({
    contestant: req.body.contestant,
    position: req.body.position,
    category: req.body.category,
    level: req.body.level,
    posterPic: req.body.posterPic,
    full_name: req.body.full_name,
    voterCard: req.body.voterCard,
    maritalStatus: req.body.maritalStatus,
    WithKids: req.body.WithKids,
    address: req.body.address,
    eduLevel: req.body.eduLevel,
    secondarySchL: req.body.secondarySchL,
    highInstitution: req.body.highInstitution,
    SechighInstitution: req.body.SechighInstitution,
    placeofwork: req.body.placeofwork,
    positionofwork: req.body.positionofwork
    
  });

  console.log(req.body);
  
  interst
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created  successfully"
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

exports.interestInfo = (req, res) => {
  Interest.find({})
    .populate("userId", "name")
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

exports.interestedmember = (req, res) => {
  let query= req.params.id
  Interest.findOne({contestant:req.params.id})
  .exec()
  .then( member =>{
    if(member) {
      res.status(200).json(member)
    }else{
      res.status(404).json({message: "Invalid Member"})
    }

  })
  .catch(err => {
      res.status(500).json({error:{
        message: err
      }})
  });    
}


exports.updateInterest = (req, res) => {
  console.log(req.body);
  let options = req.body;
  const updates = {};
 
   for (const option of Object.keys(options)) {
     updates[option] = options[option]
   }
   
  Interest.findByIdAndUpdate(
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

