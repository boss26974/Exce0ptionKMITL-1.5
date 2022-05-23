const express = require("express");
const pool = require("../config");
const bcrypt = require('bcrypt');
const Joi = require('joi');

router = express.Router();

// coding here !!

const passwordValidator = (value) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const forgotpasswordSchema = Joi.object({
    Newpassword: Joi.string().required().custom(passwordValidator),
    RepeatNewpassword: Joi.string().required().valid(Joi.ref('Newpassword')),
    currentPassword: Joi.string().required().min(8),
    acc_id: Joi.number().integer().required()
})

router.put("/changepassword", async function(req, res, next){
    try {
        forgotpasswordSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }
    console.log(req.body)
    const acc_id = req.body.acc_id
    const Newpassword = req.body.Newpassword
    const currentPassword = req.body.currentPassword
    // bcrypt NewPassword
    const salt = await bcrypt.genSalt(10)
    const hashedNewPassword = await bcrypt.hash(Newpassword, salt)
    // conn db
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const [oldPassword, _] = await conn.query("SELECT acc_password FROM account WHERE acc_id = ?", [acc_id])
        // compare password current
        const match = await bcrypt.compare(currentPassword, oldPassword[0].acc_password);
        if(match){
            await conn.query("UPDATE account SET acc_password = ? WHERE acc_id = ?", [hashedNewPassword, acc_id])
            res.json({message: 'เปลี่ยนรหัสผ่านสำเร็จ'})
            console.log('change password success')
            await conn.commit()
        }
        else{res.json({message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง'})}
    } catch (error) {
        await conn.rollback();
        return next(error)
    }
})

exports.router = router;
