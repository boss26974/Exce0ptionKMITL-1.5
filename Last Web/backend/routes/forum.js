const express = require('express');
const pool = require('../config');
const joi = require('joi');
const router = express.Router();

router.get('/forum', async function(req, res, next){
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try{
        let [rows, fields] = await conn.query(
            'SELECT forum_id, forum_topic, forum_description, forum_type, image_address FROM forum'
        );
        conn.commit()
        console.log(rows);
        return res.json(rows);
    }catch(err){
        await conn.rollback();
        console.log(err);
    }finally{
        console.log('finally')
        conn.release();
    }
});

router.get('/forum/:id', async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try{
        let [rows, fields] = await conn.query(
            'SELECT forum_topic, forum_description, forum_type, forum_release_date, image_address FROM forum WHERE forum_id=?'
            , [req.params.id]
        );
        conn.commit()
        return res.json(rows);
    }catch(err){
        await conn.rollback();
        console.log(err);
    }finally{
        console.log('finally')
        conn.release();
    }
})

const acc_idValidate = async (value, helper) => {
    const [rows, so] = await pool.query(
      "SELECT acc_id FROM account WHERE acc_id=?"
      , [value]
    )
    if(rows.length != 0){
        return value;
    }
    throw new joi.ValidationError('ไม่มีผู้ใช้รายนี้อยู่ในระบบ')
}

const createforumschema = joi.object({
    forum_topic: joi.string().required().min(10).max(255),
    forum_description: joi.string().required().min(50),
    forum_type: joi.string().required().valid('การศึกษา', 'งานพาร์ทไทน์', 'สภาพแวดล้อม', 'การลงทะเบียน', 'ทุนการศึกษา'),
    acc_id: joi.number().integer().required().external(acc_idValidate),
    image_address: joi.string().uri().required()
})

router.post('/forum/createforum', async (req, res, next) => {
    try {
        await createforumschema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    const forum_topic = req.body.forum_topic;
    const forum_description = req.body.forum_description;
    const forum_type = req.body.forum_type;
    const acc_id = req.body.acc_id;
    const image_address = req.body.image_address

    try{
        let [rows, fields] = await conn.query(
            "SELECT max(forum_id) 'max', count(forum_id) 'count' FROM forum"
        );

        let forum_id = 0;
        if(rows[0].count == 0){forum_id = 1}
        else{forum_id = rows[0].max + 1;}
        
        await conn.query(
            "INSERT INTO forum VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?)"
            ,[forum_id, forum_topic, forum_description, forum_type, acc_id, image_address]
        );

        conn.commit()
        console.log(forum_id)
        return res.send(forum_id + "")
    }catch(err){
        await conn.rollback();
        console.log(err);
    }finally{
        console.log('finally')
        conn.release();
    }
})

const updateforumschema = joi.object({
    forum_topic: joi.string().required().min(10).max(255),
    forum_description: joi.string().required().min(50),
    forum_type: joi.string().required().valid('การศึกษา', 'งานพาร์ทไทน์', 'สภาพแวดล้อม', 'การลงทะเบียน', 'ทุนการศึกษา'),
    image_address: joi.string().uri().required()
})

router.put('/forum/:id', async (req, res, next) => {
    try {
        await updateforumschema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    const forum_topic = req.body.forum_topic;
    const forum_description = req.body.forum_description;
    const forum_type = req.body.forum_type;
    const image_address = req.body.image_address

    try{
        await conn.query(
            'UPDATE forum SET forum_topic = ?, forum_description = ?, forum_type = ?, image_address = ? WHERE forum_id=?'
            , [forum_topic, forum_description, forum_type, image_address, req.params.id]
        );
        conn.commit()
        res.status(201).send()
    }catch(err){
        await conn.rollback();
        console.log(err);
    }finally{
        console.log('finally')
        conn.release();
    }
})

router.delete('/forum/:id', async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try{
        await conn.query(
            'DELETE FROM forum WHERE forum_id=?', [req.params.id]
        );
        conn.commit()
        res.status(201).send()
    }catch(err){
        await conn.rollback();
        console.log(err);
    }finally{
        console.log('finally')
        conn.release();
    }
})

exports.router = router;
