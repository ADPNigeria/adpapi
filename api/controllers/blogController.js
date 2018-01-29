const mongoose = require('mongoose');
const Blog = require('../models/Blog');


exports.createBlog =  (req, res) => {
    const blog = new Blog({
        userID: req.body.userID,
        subject: req.body.subject,
        body: req.body.body,
        tags: req.body.tags
        });

    blog
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

exports.readBlog =  (req, res) => {
  Blog.find({})
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
  
exports.deleteBlog = (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
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

  exports.updateBlog = (req, res) => {
  
    let options = req.body;
    const updates = {};
   
     for (const option of Object.keys(options)) {
       updates[option] = options[option]
     }
 
   console.log(updates)
   Blog.findByIdAndUpdate(
       req.params.id,
      {$set: updates},
      {new: true, contex: 'query'})
   .exec()
   .then( result  =>{
     console.log(member);
     if(result) {
       res.status(200).json(result)
     }else{
       res.status(404).json({message: "Invalid"})
     }
 
   })
   .catch(err => {
       res.status(500).json({error:{
         message: err
       }})
   }); 
 
 }