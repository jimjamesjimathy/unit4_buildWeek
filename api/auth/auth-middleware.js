const jwt = require('jsonwebtoken')
const {JWT_SECRET, TOKEN_SECRET, INSTRUCTOR_SECRET} = require('../../config')
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");

const restricted = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      next({ status: 401, message: 'not pass, You need token!' }) 
    } else {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            delete req.decodedJwt;
          next({ status: 401, message: `Your token sucks: ${err.message}` })
        } else {
          req.decodedJwt = decoded
          next()
        }
      })
    }
  }
  
  const validateRole = (req, res, next) => {
    try{
        if(!req.body.role_type || !req.body.role_type.trim()){
            next({ status: 422, message: "role type required" });
        } else if(req.body.role_type.trim()=== "client"){
            req.body.role_type = req.body.role_type.trim()
            next();
        } else if(req.body.role_type.trim() === 'instructor' && req.body.auth_code === INSTRUCTOR_SECRET){
            req.body.role_type = req.body.role_type.trim()
            next();
        } else if(req.body.role_type.trim() === 'instructor' && req.body.auth_code !== INSTRUCTOR_SECRET){
            next({status: 400, message: "Invalid instructor auth code"})
        } else if (req.body.role_type.trim() === "instructor" && !req.body.auth_code ){
            next({status: 400, message: "instructor auth code required"})
        } else {
            next({message: 'error'})
        }

    }catch(err){
        next(err)
    }
  }

  const checkUsernameTaken = async (req, res, next) => {
    try {
        const existing = await Users.findBy({ username: req.body.username });
        if (!existing ) {
          next();
        } else {
          next({ status: 400, message: "username taken" });
        }
      } catch (err) {
        next(err);
      }
  }

  const checkUserValid = async (req, res, next) => {
    const { username, password } = req.body; 
    try {
        const existingUser = await Users.findBy({ username });
        if (
          existingUser.length > 0 &&
          bcrypt.compareSync(password, existingUser[0].password)
        ) {
          req.userFromDb = existingUser[0];
          next();
        } else {
          next({ status: 401, message: "invalid credentials" });
        }
      } catch (err) {
        next(err);
      }
  }
  const validateCredentials = (req, res, next) => {
    const { username, password } = req.body;
    try{
        if(!username || !password || !username.trim() || !password.trim() ){
            next({status: 400, message: "username and password required" })
        } else {
            req.body.username = username.trim()
            req.body.password = password.trim()
            next()
        }

    }catch(err){
        next(err)
    }
  }
  
  module.exports = {
    validateCredentials,
    checkUserValid,
    checkUsernameTaken,
    restricted,
    validateRole
  };