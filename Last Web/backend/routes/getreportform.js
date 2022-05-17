const express = require('express');
const pool = require('../config')
router = express.Router();

router.get('/getreportform/type/:type', async function(req, res, next){
    const conn = await pool.getConnection();
    await conn.beginTransaction()

    try{
        let [rows, fields] = [[], []];
        let errormassege = "";
        let status = false;
        let title = "";
        if(req.params.type == "sociality"){
            [rows, fields] = await conn.query(
                "SELECT report_form_topic, problem_description, status, type" + 
                " FROM sociality_report_form, report_form" + 
                " WHERE sociality_report_form.report_form_id=report_form.report_form_id"
            )
            title = "สภาพสังคม"
        }
        else if(req.params.type == "studying"){
            [rows, fields] = await conn.query(
                "SELECT report_form_topic, problem_description, status, type" + 
                " FROM studying_report_form, report_form" + 
                " WHERE studying_report_form.report_form_id=report_form.report_form_id"
            )
            title = "การศึกษา"
        }
        else if(req.params.type == "scholarship"){
            [rows, fields] = await conn.query(
                "SELECT report_form_topic, problem_description, status, type" + 
                " FROM scholarship_report_form, report_form" + 
                " WHERE scholarship_report_form.report_form_id=report_form.report_form_id"
            )
            title = "ทุนการศึกษา"
        }
        else if(req.params.type == "register"){
            [rows, fields] = await conn.query(
                "SELECT report_form_topic, problem_description, status, type" + 
                " FROM register_system_report_form, report_form" + 
                " WHERE register_system_report_form.report_form_id=report_form.report_form_id"
            )
            title = "การลงทะเบียนเรียน"
        }
        else if(req.params.type == "environment"){
            [rows, fields] = await conn.query(
                "SELECT report_form_topic, problem_description, status, type" + 
                " FROM environment_report_form, report_form" + 
                " WHERE environment_report_form.report_form_id=report_form.report_form_id"
            )
            title = "สภาพแวดล้อม"
        }
        if(rows.length == 0){
            errormassege = "ไม่มีข้อมูลที่สามารถแสดงได้";
            status = false;
            title = "";
        }
        else{
            errormassege = "";
            status = true;
        }
        conn.commit();
        console.log(rows);
        return res.json({data: rows, status: status, error: errormassege, title: title});
    }catch(err){
        await conn.rollback();
        console.log(err);
    }finally{
        conn.release();
    }
});

router.get('/getreportform/searchbyid/:id', async function(req, res, next){
    const conn = await pool.getConnection();
    await conn.beginTransaction()

    try{
        let [rows, fields] = await conn.query(
            "SELECT type" + 
            " FROM report_form" + 
            " WHERE report_form_id=?",[req.params.id]
        )
        type = "";
        if(rows.length == 0){
            throw "ไม่พบข้อมูล กรุณาลองใหม่อีกครั้ง";
        }
        else{
            type = rows[0].type;
        }
        let [rows2, fields2] = [[],[]];
        if(type == "สภาพสังคม"){
            [rows2, fields2] = await conn.query(
                "SELECT report_form_topic, problem_description, status, type" + 
                " FROM sociality_report_form, report_form" + 
                " WHERE sociality_report_form.report_form_id=report_form.report_form_id"
                + " AND report_form.report_form_id=?",
                [req.params.id]
            )
        }
        else if(type == "การศึกษา"){
            [rows2, fields2] = await conn.query(
                "SELECT report_form_topic, problem_description, status, type" + 
                " FROM studying_report_form, report_form" + 
                " WHERE studying_report_form.report_form_id=report_form.report_form_id"
                + " AND report_form.report_form_id=?",
                [req.params.id]
            )
        }
        else if(type == "ทุนการศึกษา"){
            [rows2, fields2] = await conn.query(
                "SELECT report_form_topic, problem_description, status, type" + 
                " FROM scholarship_report_form, report_form" + 
                " WHERE scholarship_report_form.report_form_id=report_form.report_form_id"
                + " AND report_form.report_form_id=?",
                [req.params.id]
            )
        }
        else if(type == "การลงทะเบียนเรียน"){
            [rows2, fields2] = await conn.query(
            "SELECT report_form_topic, problem_description, status, type" + 
            " FROM register_system_report_form, report_form" + 
            " WHERE register_system_report_form.report_form_id=report_form.report_form_id"
            + " AND report_form.report_form_id=?",
            [req.params.id]
        )
        }
        else if(type == "สภาพแวดล้อม"){
            [rows2, fields2] = await conn.query(
                "SELECT report_form_topic, problem_description, status, type" + 
                " FROM environment_report_form, report_form" + 
                " WHERE environment_report_form.report_form_id=report_form.report_form_id"
                + " AND report_form.report_form_id=?",
                [req.params.id]
            )
        }
        conn.commit();
        console.log(rows2);
        return res.json({data: rows2, status: true, error: ""});
    }catch(err){
        await conn.rollback();
        console.log(err);
        return res.json({data: [], status: false, error: err});
    }finally{
        console.log('finally')
        conn.release();
    }
});

exports.router = router;