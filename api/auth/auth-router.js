const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../users/users-model.js')
const { BCRYPT_ROUNDS } = require('../../config')
const makeToken = require('./auth-token-builder')
const { validateCredentials, checkUserValid, checkUsernameTaken, validateRole } = require("./auth-middleware")


router.post('/register', 
    validateCredentials,
    checkUsernameTaken,
    validateRole,    
    async(req, res, next)=>{
    let user = req.body
    const hash = bcrypt.hashSync(user.password , BCRYPT_ROUNDS)
    user.password = hash
    User.add(user)
     .then( saved => {
        res.status(201).json({massage: `Account successfully created. Please login: ${saved.username}`  })
     })
     .catch(next)
})


router.post('/login',
    validateCredentials, async (req, res, next) => {
    let { username, password } = req.body;
        try {
            const user = await User.findBy({username})
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
            return next({ status: 401, message: "Invalid credentials"})
            }
            req.user = user
            // console.log(user)
            const token = makeToken(user)
            res.status(200).json({ message: `Welcome ${user.username}!`, token})
        } catch (err) {
            next(err)
        }
  })

// logout to be added in front end //

module.exports = router;