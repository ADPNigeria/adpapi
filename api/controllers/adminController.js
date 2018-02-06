const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Member = require('../models/Member');


exports.createAdmin =  (req, res) => {
    const admin = new Admin({
        phone: req.body.phone,
        personalInfo: req.body.personalInfo,
        level: req.body.level,
        position: req.body.position,
        nameOfLocation: req.body.nameOfLocation

        });

    admin
    .save()
    .then(result => {

      res.status(201).json({
        message: "Created Admin successfully",
      });
    })
    .catch(err => {
      res.status(500).send({
        error:{
          message: err.message
        }
      });
    });

};

exports.getadmin =  (req, res) => {
  let query= req.params.id
  Admin.findOne({personalInfo: req.params.id})
  .populate("personalInfo", "-password -__v")
  .exec()
  .then( member =>{
    if(member) {
      res.status(200).json(member)
    }else{
      res.status(404).json({message: "Error"})
    }

  })
  .catch(err => {
      res.status(500).json({error:{
        message: err
      }})
  });
};

exports.getAllMember = (req, res) =>{
  Member.find({})
  .exec()
  .then( member =>{
      res.status(200).json(member)
  })
  .catch (err=>{
    res.status(500).json({error:{
      message: err
    }});
  });
}

exports.getAllAdmin = (req, res) =>{
  Admin.find({})
  .populate("personalInfo", "-__v")
  .exec()
  .then( member =>{
      res.status(200).json(member)
  })
  .catch (err=>{
    res.status(500).json({error:{
      message: err
    }});
  });
}

exports.updateAdmin = (req, res) => {
  let options = req.body;
  const updates = {};

   for (const option of Object.keys(options)) {
     updates[option] = options[option]
   }

 console.log(updates)
 Admin.findByIdAndUpdate(
     req.params.id,
    {$set: updates},
    {new: true, contex: 'query'})
 .exec()
 .then( member =>{
   console.log(member);
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

exports.deleteAdmin = (req, res) => {
  Admin.findByIdAndRemove(req.params.id)
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
