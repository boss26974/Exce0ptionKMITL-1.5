const express = require("express");
const pool = require("../config");
const bcrypt = require ('bcrypt');
const Joi = require('joi');
const { generateToken } = require("../utils/token");

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

const StudentIDValidator = (value) => {
    if (value.toString().length != 8) {
        throw new Joi.ValidationError('StudentID Must be equal to 8 integers')
    }
    return value
}

//Joi Here 

const signupSchema = Joi.object({
    Firstname: Joi.string().required().max(255),
    Lastname: Joi.string().required().max(255),
    StudentID: Joi.number().integer().required().custom(StudentIDValidator),
    Status: Joi.required().valid('กำลังศึกษาอยู่','จบการศึกษาแล้ว'),
    Email: Joi.string().required().email(),
    Password: Joi.string().required().custom(passwordValidator),
    repeatPassword: Joi.string().required().valid(Joi.ref('Password'))
})

router.post("/register/submit", async function (req, res, next){
    try {
        signupSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }
    
    // User send form data to backend
    console.log(req.body)
    const Firstname = req.body.Firstname
    const Lastname = req.body.Lastname
    const StudentID = req.body.StudentID
    const Status = req.body.Status
    const Email = req.body.Email
    const Password = req.body.Password
    // bcrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(Password, salt)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [rows1, notuse1] = await conn.query("SELECT acc_email FROM account WHERE acc_email = ?", [Email])
        let [rows2, notuse2] = await conn.query("SELECT user_studentid FROM user WHERE user_studentid = ?", [StudentID])
        if(rows1.length > 0 && rows2.length > 0){
            res.json({message : "Email นี้ถูกใช้แล้ว และ Password นี้ถูกใช้แล้ว", errorEmail : 'error', errorStudentid : 'error'})
            console.log('Error', 'Email และ StudentID ซ้ำ')
        }
        else if(rows1.length > 0){
            res.json({message : "Email นี้ถูกใช้แล้ว", errorEmail : 'error'})
            console.log('Error','Email ซ้ำ')
        }
        else if(rows2.length > 0){
            res.json({message : "StudentID นี้ถูกใช้แล้ว", errorStudentid : 'error'})
            console.log('Error', 'StudentID ซ้ำ')
        }
        else{
            const [rows, fields] = await conn.query(
                "INSERT INTO account(acc_fname, acc_lname, acc_password, acc_email, create_date) VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP);",
                [Firstname, Lastname, hashedPassword, Email]
            ) // insert data in table_account
            await conn.query(
                "INSERT INTO user(user_studentid, user_status) VALUES(?, ?);",
                [StudentID, Status]
            ) //  insert data in table_user
            await conn.query(
                "INSERT INTO admin(rule_manage_acc, rule_standand_admin, access_key) VALUES(0, 0, null);"
            ) //  insert data in table_admin
            let token = generateToken() // create token
            await conn.query(
                "INSERT INTO tokens(token, acc_id) VALUES(?, ?);", [token, rows.insertId]
            ) //  insert data in tokens
            await conn.commit()
            var d = new Date();
            var n = d.toString();
            console.log('register success!', 'Time:', n.substring(16,21))
            res.json({message : "register success Let's Login!"});
        }
    } catch (error) {
        await conn.rollback();
        next(error);
    }
    finally{
        conn.release()
    }
})

exports.router = router;
