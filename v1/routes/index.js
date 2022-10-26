const express = require("express");
const userRoute = require("./routes");


const router = express();
router.use("/user", userRoute);


module.exports = router;