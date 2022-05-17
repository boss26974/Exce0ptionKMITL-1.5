const express = require("express");
const pool = require("../config");
const bcrypt = require ('bcrypt');
const Joi = require('joi');
// const { generateToken } = require("../utils/token");

router = express.Router();

// coding here !!

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
})

router.post("/checkingLogin", async function(req, res, next){
    try {
        loginSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        res.status(400).json(err)
    }
    // User send email and password to backend
    const email = req.body.email
    const password = req.body.password
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [rows, notuse] = await conn.query("SELECT acc_email, acc_password FROM account WHERE acc_email = ?", [email])
        if(rows.length > 0)
        {
            const match = await bcrypt.compare(password, rows[0].acc_password);
            if(match){
                let [userid, notuse] = await conn.query("SELECT a.acc_id,user_studentid FROM account a join user b ON a.acc_id=b.acc_id WHERE acc_email = ?", [email])
                let [role, notuse2] = await conn.query("SELECT acc_id,rule_manage_acc, rule_standand_admin FROM admin WHERE acc_id = ?", [userid[0].acc_id])
                if(role[0].rule_manage_acc == true || role[0].rule_standand_admin == true){
                    const [tokensAdmin, notuse3] = await conn.query(
                        'SELECT token FROM tokens WHERE acc_id=?', 
                        [userid[0].acc_id]
                    )
                    let tokenAdmin = tokensAdmin[0].token
                    res.status(200).json({message: 'log in success!',role: 'Admin', token: tokenAdmin, acc_id:role[0].acc_id})
                    await conn.query("UPDATE tokens SET time_login = CURRENT_TIMESTAMP WHERE token = ?;", [tokenAdmin])
                    await conn.commit()                
                }
                else{
                    const [tokensUser, notuse4] = await conn.query(
                        'SELECT token FROM tokens WHERE acc_id=?', 
                        [userid[0].acc_id]
                    )
                    let tokenUser = tokensUser[0].token
                    res.status(200).json({message: 'log in success!', role: 'User', token: tokenUser})
                    await conn.query("UPDATE tokens SET time_login = CURRENT_TIMESTAMP WHERE token = ?;", [tokenUser])
                    await conn.commit()
                    // console.log
                    console.log('student ID:', userid[0].user_studentid)
                    var d = new Date();
                    var n = d.toString();
                    console.log('user login success!', 'Time:', n.substring(16,21))
                }
            }
            if(!match){
                res.json({message: 'password ไม่ถูกต้อง', errorPassword: 'error'})
                console.log('password ไม่ถูกต้อง')
            }
        }else{
            res.json({message: 'email ไม่ถูกต้อง', errorEmail: 'error'})
            console.log('email ไม่ถูกต้อง')
        }
        await conn.commit()
    } catch (error) {
        await conn.rollback();
        next(error);
    }
    finally{
        conn.release()
    }
})

exports.router = router;
