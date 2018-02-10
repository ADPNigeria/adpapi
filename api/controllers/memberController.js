const mongoose = require('mongoose');
const Member = require('../models/Member');


exports.validateRegister = (req, res, next) => {

    const phone_number = req.body.phone_number;
    const full_name = req.body.full_name;
    const email = req.body.email;

    req.checkBody('phone_number', 'Phone is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('full_name', 'Name is required').notEmpty( );


    req.sanitize(req.body);

    let errors = req.validationErrors();

    if(errors) return console.log(errors);

    next(); // there were no errors!
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

exports.createMember =  (req, res) => {

    const member = new Member({
        passport: req.body.passport,
        full_name: req.body.full_name,
        phone_number: req.body.phone_number,
        pvc: req.body.pvc,
        email: req.body.email || 'contact@adp.ng',
        gender: req.body.gender,
        dateofBirth: req.body.dateofBirth,
        MemberAuth: {
          mobileCode: req.body.mobileCode,
          TempID: req.body.TempID,
        },
        stName: req.body.stName,
        lgaName: req.body.lgaName,
        wardName: req.body.wardName,
        pollingUnit: req.body.pollingUnit,
        residenceAdd: req.body.residenceAdd,
        resCountry: req.body.resCountry,
        hashUser: req.body.hashUser,
        Senatorial: req.body.Senatorial,
        FedConstituency: req.body.FedConstituency,
        StateConstituency: req.body.StateConstituency
        });

    member
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        body: result,
        message: "Member Registered successfully",
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

exports.getMember = (req, res) => {
  let query= req.params.id
  Member.findById(req.params.id)
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

exports.getExist = (req, res) => {
  Member.findOne({phone_number: req.params.phone})
  .exec()
  .then( member => {
    if (member) {
      res.status(200).json({success: true})
    } else {
      res.status(200).json({success: false})
    }
  })
  .catch(err => {
    res.status(500).json({error:{
      message: err
    }})
  })
}

exports.getwithpvc= (req, res) => {
  Member.findOne({pvc: req.params.pvc})
  .exec()
  .then( member => {
    if (member) {
      res.status(200).json({success: true})
    } else {
      res.status(200).json({success: false})
    }
  })
  .catch(err => {
    res.status(500).json({error:{
      message: err
    }})
  })
}

exports.getMemberWithPhone = (req, res) => {
  Member.findOne({phone_number: req.params.phone})
  .exec()
  .then( member =>{
    if(member) {
      res.status(200).json(member)
    }else{
      res.status(404).json({message: "Number Does Not Exit"})
    }
  })
  .catch(err => {
      res.status(500).json({error:{
        message: err
      }})
  });
}

exports.updateMember = (req, res) => {

   let options = req.body;
   const updates = {};

    for (const option of Object.keys(options)) {
      updates[option] = options[option]
    }

  console.log(updates)
  Member.findByIdAndUpdate(
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
