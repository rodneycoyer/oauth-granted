const express =  require("express");
const userRouter = express.Router();

userRouter.route("/")
.get((res, req) => {
  res.end(`Will send all users`);
})
.post((res, req) => {
  res.end(`Will add user: ${req.body.name}`);
})
.put((res, req) => {
  res.end(`PUT operation not supported on /users`);
})
.delete((res, req) => {
  res.end(`Deleting all users`);
});

userRouter.route("/:userId")
.get((res, req) => {
  res.end(`Will send user: ${req.params.userId}`);
})
.post((res, req) => {
  res.end(`POST not supported on /users/${req.params.userId}`);
})
.put((res, req) => {
  res.end(`Will update user ${req.params.userId} info`);
})
.delete((res, req) => {
  res.end(`user ${req.params.userId}`);
});

module.exports = userRouter;