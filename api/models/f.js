//DELETE Route
app.delete("/blogs/:id", function(req, res){
    //Destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
      if(err){
        res.send(err);
      } else {
        res.redirect("/blogs");
      }
    });
  });


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