const express = require("express");
const pool = require("../config");
const Joi = require('joi');

router = express.Router();

// coding here !!

const feedbackSchema = Joi.object({
    acc_id: Joi.number().integer().required(),
    report_desciption: Joi.string().required()
})

router.post("/sendfeedback", async function(req, res, next){
    try {
        feedbackSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }
    const acc_id = req.body.acc_id
    const report_desciption = req.body.report_desciption
    // con db
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const [feedback, _] = await conn.query("INSERT INTO report(report_desciption, report_date_time, acc_id) VALUES(?,CURRENT_TIMESTAMP,?)", [report_desciption,acc_id])
        await conn.commit()
        console.log("User id: "+acc_id+" has sent New feedback!")
        return res.status(200).json({message: "send feedback success!"})
    } catch (error) {
        await conn.rollback();
        next(error);
    }
    finally{
        conn.release()
    }
})

exports.router = router;