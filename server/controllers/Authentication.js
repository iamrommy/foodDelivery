const User = require('../models/User');
const OTP = require('../models/OTP');

const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

require('dotenv').config();

//send otp
exports.sendOTP = async(req, res) =>{
    try{
        //fetch email from req body
        const {email} = req.body;

        //check if user already exists
        const checkUserPresent = await User.findOne({email:email});
        //if user already exists then return 
        
        if(checkUserPresent?.googleId){
            return res.json({
                success:false,
                message:"User already exists with google signup"
            });
        }

        if(checkUserPresent){
            return res.json({
                success:false,
                message:"User already exists"
            });
        }

        //generate otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        let result = await OTP.findOne({otp: otp});

        while(result){ //this brute force approach of checking again and again that wether this otp exists in DB or not is not good. Must use something else 
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({otp: otp});

        }
        console.log('OTP generated : ',otp);
        
        const otpPayload = {email, otp};

        // create an entry for otp in DB
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response successfull
        return res.status(200).json({
            success: true,
            message: "OTP generated successfully",
            otp
        });
    }
    catch(error){
        console.log("Error in otp generation", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//SignUp controller for registering users
exports.signUp = async (req, res)=>{
    try{
        //data fetch from request's body
        const {
            email,
            username,
            password,
            otp
        } = req.body;

        //validate data
        if(!username || !email || !password || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are not present"
            });
        }

        //check user already exists or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User is already registered'
            });
        }

        //find most recent otp for the user
        const response = await OTP.find({email:email}).sort({createdAt:-1}).limit(1);
        console.log('this is response', response);

        //validate OTP
        if(response.length === 0){
            //OTP not found
            return res.json({
                success:false,
                message:"OTP not valid",
            });
        }
        else if(otp !== response[0].otp){
            //Invalid OTP
            return res.json({
                success:false,
                message:"Invalid OTP"
            });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create entry in DB

        let user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        user = await User.findById(user._id);
        
        return res.status(200).json({
            success:true,
            message:'User is registered successfully',
            user,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "User cannot be registered please try again",
        });
    }
};

//log in
exports.logIn = async (req, res)=>{
    try{
        //get data from user 
        const {email, password} = req.body;

        //validate data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: 'All fields are required, please try again'
            });
        }

        //user check exist or not
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"User is not registered, please try again"
            });
        }

        //if the user has a google signed up account then it will not have a password
        if(!user.password){
            return res.json({
                success:false,
                message:"User has a google account with no password, Log in with google"
            });
        }

        // console.log(password, user.password);
        //Match password and generate JWT 
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
            }
            const token = JWT.sign(payload, process.env.JWT_SECRET, {
                // expiresIn: "3h",            
            })

            user.token = token;
            user.password = undefined
            
            //create cookie
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            
            res.cookie('token', token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully'
            });
        }
        else{ //password not matched
            return res.json({
                success: false,
                message: 'Password is incorrect'
            });
        }

    }
    catch(error){
        console.log('Error in Log in ',error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again'
        });
    }
};

exports.myProfile = async(req, res)=>{
    res.status(200).json({
        success: true,
        user: req.user,
    });
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        res.json({
            success:false,
            message:"Error logging out"
        })
      }
  
      const isDevelopment = process.env.NODE_ENV === "development";
      
      res.clearCookie("connect.sid", {
        secure: !isDevelopment,
        httpOnly: !isDevelopment,
        sameSite: isDevelopment ? false : "none",
      });
      
      res.status(200).json({
        success:true,
        message: "Logged Out",
      });
    });
  };
  