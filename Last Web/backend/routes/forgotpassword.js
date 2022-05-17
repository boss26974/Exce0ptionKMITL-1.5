const express = require("express");
const pool = require("../config");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const Joi = require('joi');
// const { getMaxListeners } = require("process");

router = express.Router();

// coding here !!

router.post("/forgotpassword/sendmail", async function(req, res, next){
    // make random code
    let random_code = String(Math.floor(Math.random()*999999));
    for(i = 0; i < 6; i++){
        if(random_code.length !== 6)
            random_code = '0'+random_code;
    }
    // bcrypt code
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(random_code, salt)
    // emailSend mar
    const emailSend = req.body.email.emailSend
    // conn db
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [rows1, notuse1] = await conn.query("SELECT acc_email FROM account WHERE acc_email = ?", [emailSend])
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'exceptionkmitl.service@gmail.com',
                pass: 'exceptionkmitl.1',
            }
        })
    
        var mailOptions = {
            from: 'exceptionkmitl.service@gmail.com',
            to: emailSend,
            subject: 'Change your password',
            text: 'รหัสยืนยันเปลี่ยนพาสเวิร์ด : ' +  random_code
        }
        
        if(rows1.length > 0){
            transporter.sendMail(mailOptions, function(err, info){
                if(err){
                    console.log(err)
                }
                else{
                    console.log('Email sent:' + info.response)
                    res.json({message: 'send success!', code: hashedPassword})
                }
            })
        }
        else{
            res.json({message: 'ไม่พบ Email ในระบบ'})
        }
    } catch (error) {
        await conn.rollback();
        return next(error)
    }

})

const passwordValidator = (value) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const codeValidator = (value) => {
    if (value.length != 6) {
        throw new Joi.ValidationError('code Must be equal to 6 integers')
    }
    return value
}

const forgotpasswordSchema = Joi.object({
    emailSend: Joi.string().required().email(),
    Newpassword: Joi.string().required().custom(passwordValidator),
    RepeatNewpassword: Joi.string().required().valid(Joi.ref('Newpassword')),
    code: Joi.string().required().custom(codeValidator),
    codeCheck: Joi.string().required()
})

router.put("/forgotpassword/checking", async function(req, res, next){
    try {
        forgotpasswordSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }
    console.log(req.body)
    const emailSend = req.body.emailSend
    const Newpassword = req.body.Newpassword
    const code = req.body.code
    const codeCheck = req.body.codeCheck
    // compare code access
    const match = await bcrypt.compare(code, codeCheck);
    // bcrypt NewPassword
    const salt = await bcrypt.genSalt(10)
    const hashedNewPassword = await bcrypt.hash(Newpassword, salt)
    // conn db
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        if(match){
            await conn.query("UPDATE account SET acc_password = ? WHERE acc_email = ?", [hashedNewPassword,emailSend])
            res.json({message: 'เปลี่ยนรหัสผ่านสำเร็จ'})
            console.log('change password success')
            await conn.commit()
        }
        if(!match){
            res.json({message: 'รหัสยืนยันไม่ถูกต้อง'})
        }
    } catch (error) {
        await conn.rollback();
        return next(error)
    }
    finally{
        conn.release()
    }
})

exports.router = router;
