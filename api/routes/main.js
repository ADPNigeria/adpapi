const express = require("express");
const router = express.Router();

// require modules
const interestController = require("../controllers/interestController");
const complainController = require("../controllers/complainController");
const contactController = require("../controllers/contactController");
const paymentController = require("../controllers/paymentController");
const memberController = require("../controllers/memberController");
const adminController = require("../controllers/adminController");
const voteController = require("../controllers/voteController");
const authController = require("../controllers/authController");
const blogController = require("../controllers/blogController");
const excoController = require("../controllers/excoController");
const auth = require("../config/authRoute");

router.get("/", auth, (req, res) => {
  res.status(200).json({
    message: "Good to go"
  });
});

// member controllers
router.post(
  "/register",   memberController.validateRegister, memberController.createMember
);

router.get("/memberphone/:phone", auth,  memberController.getMemberWithPhone);
router.get("/member/:id", auth,  memberController.getMember);
router.get("/checkexist/:phone", auth, memberController.getExist)
router.get("/checkpvc/:pvc", auth, memberController.getwithpvc)
router.patch("/member/:id", auth,  memberController.updateMember);

//admin controllers
router.post("/admin/register", adminController.createAdmin);
router.get("/admin/members", auth, adminController.getAllMember);
router.get("/admin", auth, adminController.getAllAdmin);
router.get("/admin/:id", auth, adminController.getadmin)
router.patch("/admin/:id", auth, adminController.updateAdmin)
router.delete("/admin/:id", auth, adminController.deleteAdmin)

//exco controller
router.get("/exco", auth, excoController.getAllExco);
router.post("/exco",   excoController.createExco);
router.get("/exco/national", auth,   excoController.getNationalExco);
router.get("/exco/:state", auth, excoController.getStateExco);
router.get("/exco/:state/:lga", auth, excoController.getLgaExco);
router.get("/exco/ward", auth,  excoController.getWardExco);
router.get("/exco/pullingunit", auth,  excoController.getPullingUnitExco);
router.patch("/exco/:id", auth,  excoController.updateExco);
router.delete("/exco/:id", auth,  excoController.deleteExco);

//contact controller
router.post("/contact",   contactController.createContact);
router.get("/contact/national", auth,  contactController.getNationalContact);
router.get("/contact/:state", auth, contactController.getStateContact);
router.get("/contact/lga", auth,   contactController.getLgaContact);
router.get("/contact/ward", auth,  contactController.getWardContact);
router.get("/contact/pullingunit", auth,  contactController.getPullingUnitContact);
router.patch("/contact/:id", auth,   contactController.updateContact);

//auth controllers
router.post("/auth/register",  authController.auth);
router.post("/auth/login",  authController.authlogin);

//payment controllers
router.get("/payment", auth,  paymentController.paymentInfo);
router.post("/payment",   paymentController.payment);

//vote controllers
router.get("/vote", auth,  voteController.voteInfo);
router.post("/vote", auth,  voteController.vote);

//interest controllers
router.get("/interest",auth, interestController.interestInfo);
router.post("/interest",   interestController.interest);
router.get("/interestedmember/:id", auth,  interestController.interestedmember);
router.patch("/interest/:id", auth,  interestController.updateInterest);

//complain route
router.post("/complain",  complainController.summitcomplain);
router.get("/complain", auth, complainController.showcomplain);
router.delete("/complain", auth, complainController.deleteComplain);

//blog route
router.post("/blog",  blogController.createBlog);
router.get("/blog", auth, blogController.readBlog);
router.delete("/blog/:id", auth, blogController.deleteBlog);
router.patch("/blog/:id", auth, blogController.updateBlog);


module.exports = router;
