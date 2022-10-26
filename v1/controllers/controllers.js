const services = require('../services/index')


async function getfollwers(req, res, next) {
    try {
      let user = await services.User.profilefollwers(req, res, next);
      return res.json({
        user
    });
    } catch (error) {
      next(error);
    }
  }
  async function taggingProfile(req, res, next) {
    try {
      let user = await services.User.taggingProfile(req, res, next);
      return res.json({
        user
    });
    } catch (error) {
      next(error);
    }
  }
  
  async function profileView(req, res, next) {
    try {
      let user = await services.User.profileView(req, res, next);
      return res.json({
        user
    });
    } catch (error) {
      next(error);
    }
  }
  async function posts(req, res, next) {
    try {
      let user = await services.User.posts(req, res, next);
      return res.json({
        user
    });
    } catch (error) {
      next(error);
    }
  }
  async function email_contact(req, res, next) {
    try {
      let user = await services.User.email_contact(req, res, next);
      return res.json({
        user
    });
    } catch (error) {
      next(error);
    }
  }
  module.exports = {
    getfollwers,
    taggingProfile,
    profileView,
    posts,
    email_contact
  }