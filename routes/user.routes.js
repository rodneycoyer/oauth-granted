const express =  require("express");
const userRouter = express.Router();

userRouter.route("/")
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plan");
  next();
})
.get((res, req) => {
  res.end(`Will send all users`)
})
.post((res, req) => {
  res.end(`Will add user: ${req.body.name}`);
})
.put((res, req) => {
  res.end(`PUT operation not supported on /users`)
})
.delete((res, req) => {
  res.end(`Deleting all users`)
});

module.exports = userRouter;