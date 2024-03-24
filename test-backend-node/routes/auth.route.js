const { Router } = require('express')
const User = require('../models/User')
const router = Router()
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'randomStringFromEnvButNowHereForTest'
const DEFAULT_CRYPT_SALT = 12

const newUserDataCheck = [
    check("email", "Incorrect Email").isEmail(),
    check("password", "Incorrect Password").isLength({min: 6, max: 20}).matches(/^(?=.*\d)(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
]

router.post('/register', newUserDataCheck,
    async (req, res) => {
        try{

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid Data!'
                })
            }

            const {email, password} = req.body
            const isUserExist = await User.findOne({email})
            if(isUserExist){
                return res.status(400).json({message: "Email is already taken!"})
            }

            const hashedPassword = await bcrypt.hash(password, DEFAULT_CRYPT_SALT)

            const user = new User({
                email, password: hashedPassword
            })
            await user.save()

            res.status(201).json({message: 'Created!'})
        }
        catch(err){
            console.log(err);
        }
    }
)

router.post('/login', 
    [
        check("email", "Incorrect Email").isEmail(),
        check("password", "Incorrect Password").exists()
    ],
    async (req, res) => {
        try{

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid Data!'
                })
            }

            const {email, password} = req.body
           
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: "This email is not registered"})
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if(!isPasswordMatch){
                return res.status(400).json({message: "Incorrect password!"})
            }

            const token = jwt.sign(
                {userId: user.id},
                JWT_SECRET,
                {expiresIn: '1h'}
            )

            res.json({token, user})

        }
        catch(err){
            console.log(err);
        }
    }
)

router.post('/update', newUserDataCheck, 
    async (req, res) => {
        try{

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid Data!'
                })
            }

            const {userEmail, oldPassword, email, password} = req.body
           
            const user = await User.findOne({email: userEmail})
            if(!user){
                return res.status(400).json({message: "Something went wrong, try later..."})
            }

            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
            if(!isPasswordMatch){
                return res.status(400).json({message: "Incorrect current password!"})
            }

            user.email = email
            user.password = await bcrypt.hash(password, DEFAULT_CRYPT_SALT)

            await user.save()

            res.status(200).json({message: 'User data updated!'})

        }
        catch(err){
            console.log(err);
        }
    }
)



module.exports = router