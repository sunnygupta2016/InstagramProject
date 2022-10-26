const router = require("express").Router();
const Controllers = require('../controllers/controllers')



router.get("/follower", Controllers.getfollwers);
router.get("/taggingProfile", Controllers.taggingProfile);
router.get("/profileView", Controllers.profileView);
router.get("/lastposts", Controllers.posts);
router.get("/email_contact", Controllers.email_contact);

module.exports = router