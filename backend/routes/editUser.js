const express = require("express");
const pool = require("../config");
const joi = require('joi');
const Joi = require("joi");

router = express.Router();

router.get('/checkrole/:id', async function (req, res, next){
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [role, notuse] = await conn.query("SELECT rule_manage_acc, rule_standand_admin FROM admin WHERE acc_id = ?" , [req.params.id]);
        return res.json(role);
    } catch (err) {
        await conn.rollback();
        console.log(err)
    }finally{
        conn.release();
    }
})

const updateuserschema = joi.object({
    acc_id: Joi.number().integer().required(),
    acc_fname: Joi.string().required(),
    acc_lname: Joi.string().required(),
    acc_email: Joi.string().email().required(),
    rule_manage_acc: Joi.number().integer().required(),
    rule_standand_admin: Joi.number().integer().required()
})

router.put('/saveEdit', async function (req, res, next){
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        await updateuserschema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }

    const id = req.body.acc_id
    const fname = req.body.acc_fname
    const lname = req.body.acc_lname
    const email = req.body.acc_email
    const rule_acc = req.body.rule_manage_acc
    const rule_admin = req.body.rule_standand_admin

    try {
        await conn.query('UPDATE account SET acc_fname = ?, acc_lname = ?, acc_email = ? WHERE acc_id = ?', [fname, lname, email, id])
        await conn.query('UPDATE admin SET rule_manage_acc = ?, rule_standand_admin = ? WHERE acc_id = ?', [rule_acc, rule_admin, id])
        conn.commit();
        return res.json({message: 'EDIT COMPLETED !!!'})
    } catch (err) {
        await conn.rollback();
        console.log(err)
    }finally{
        conn.release();
    }
})



exports.router = router;