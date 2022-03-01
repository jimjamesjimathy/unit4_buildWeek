const router = require("express").Router()

const User = require("./users-model.js")

const { restricted } = require('../auth/auth-middleware')

router.get("/", 
  (req, res, next) => {
    User.findAll()
    .then(users => {
      res.json(users)
    })
    .catch(next) 
})

router.get("/:id", 
  (req, res, next) => {
    User.findById(req.params.id)
    .then(users => {
      res.json(users)
    })
    .catch(next) 
  })

module.exports = router;