const express = require("express");
const pool = require("../config");
const joi = require("joi");

router = express.Router();

router.get("/dataReport", async function (req, res, next) {
  try {
    const [sociality, notuse1] = await pool.query(`SELECT r.report_form_id, report_form_date_time, report_form_topic, type, acc_id, user_studentid, status,
      social_location, problem_description, condition_of_submission
      FROM report_form r JOIN user USING (acc_id)
      JOIN sociality_report_form USING (report_form_id)`);
    const [studying, notuse2] = await pool.query(`SELECT r.report_form_id, report_form_date_time, report_form_topic, type, acc_id, user_studentid, status,
      studying_subject_id, problem_description, condition_of_submission
      FROM report_form r JOIN user USING (acc_id)
      JOIN studying_report_form USING (report_form_id)`);
    const [scholarship, notuse3] = await pool.query(`SELECT r.report_form_id, report_form_date_time, report_form_topic, type, acc_id, user_studentid, status,
      scholarship_type, problem_description, condition_of_submission
      FROM report_form r JOIN user USING (acc_id)
      JOIN scholarship_report_form USING (report_form_id)`);
    const [register, notuse4] = await pool.query(`SELECT r.report_form_id, report_form_date_time, report_form_topic, type, acc_id, user_studentid, status,
      regis_subject, problem_description, condition_of_submission
      FROM report_form r JOIN user USING (acc_id)
      JOIN register_system_report_form USING (report_form_id)`);
    const [environment, notuse5] = await pool.query(`SELECT r.report_form_id, report_form_date_time, report_form_topic, type, acc_id, user_studentid, status,
      environment_location, problem_description, condition_of_submission
      FROM report_form r JOIN user USING (acc_id)
      JOIN environment_report_form USING (report_form_id)`);
    return res.json({
        report_sociality:sociality,
        report_studying:studying,
        report_scholarship:scholarship,
        report_register:register,
        report_environment:environment
    })
  } catch (err) {
    return next(err)
  }
});

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

const socialityschema = joi.object({

    reporttype: joi.string().required().valid('สภาพสังคม'),
    topic: joi.string().required().min(10).max(255),
    description: joi.string().required().min(50),
    send_status: joi.string().required().valid('ด่วน', 'ไม่ด่วน'),
    sociality_location: joi.string().required().min(5).max(255),
    acc_id: joi.number().integer().required().external(acc_idValidate),
    
})

const educationschema = joi.object({

  reporttype: joi.string().required().valid('การศึกษา'),
  topic: joi.string().required().min(10).max(255),
  description: joi.string().required().min(50),
  send_status: joi.string().required().valid('ด่วน', 'ไม่ด่วน'),
  education_subject_id: joi.string().length(8).regex(/^\d+$/).required(),
  acc_id: joi.number().integer().required().external(acc_idValidate),
  
})

const scholarshipschema = joi.object({

  reporttype: joi.string().required().valid('ทุนการศึกษา'),
  topic: joi.string().required().min(10).max(255),
  description: joi.string().required().min(50),
  send_status: joi.string().required().valid('ด่วน', 'ไม่ด่วน'),
  scholarship_type: joi.string().required().valid(
    "ทุนอุดหนุนการศึกษาประภท ก", "ทุนอุดหนุนการศึกษาประภท ข", "ทุนเรียนดี", "ทุนผู้ทำคุณประโยชน์ให้แก่สถาบัน",
    "ทุนผู้สร้างชื่อเสียงในนามสถาบัน", "ทุนให้ยืมเพื่อการศึกษาในกรณีฉุกเฉิน", "ทุนสนับสนุนนักศึกษาในภาวะวิกฤต", "ทุนสนับสนุนการนำเสนอผลงานทางวิชาการ",
    "ทุนสนับสนุนการแลกเปลี่ยนและฝึกงานต่างประเทศ", "ทุนช่วยเหลือนักศึกษาในสถานการณ์การแพร่ระบาดของโรค COVID 19", "อื่นๆ"
  ),
  acc_id: joi.number().integer().required().external(acc_idValidate),
  
})

const registerschema = joi.object({

  reporttype: joi.string().required().valid('การลงทะเบียนเรียน'),
  topic: joi.string().required().min(10).max(255),
  description: joi.string().required().min(50),
  send_status: joi.string().required().valid('ด่วน', 'ไม่ด่วน'),
  register_subject: joi.string().length(8).regex(/^\d+$/).required(),
  acc_id: joi.number().integer().required().external(acc_idValidate),
  
})

const environmentschema = joi.object({

  reporttype: joi.string().required().valid('สภาพแวดล้อม'),
  topic: joi.string().required().min(10).max(255),
  description: joi.string().required().min(50),
  send_status: joi.string().required().valid('ด่วน', 'ไม่ด่วน'),
  environment_location: joi.string().required().min(5).max(255),
  acc_id: joi.number().integer().required().external(acc_idValidate),
  
})

router.post("/createreport/sociality", async function(req, res, next) {
  try {
    await socialityschema.validateAsync(req.body,  { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err)
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction()

  const type = req.body.reporttype
  const  acc_id = req.body.acc_id
  const  topic = req.body.topic
  const  description = req.body.description
  const  send_status = req.body.send_status
  const  sociality_location = req.body.sociality_location
  
  try{
    const [rows, fields] = await conn.query(
      "SELECT max(report_form_id) 'max', count(report_form_id) 'count' FROM report_form"
    )
    
    let id_sociality = 0;
    if(rows[0].count == 0){id_sociality = 1}
    else{id_sociality = rows[0].max + 1}

    await conn.query(
      "INSERT INTO report_form VALUES (?, CURRENT_TIMESTAMP, ?, ?, ?)", [id_sociality, topic, type, acc_id]
    )

    await conn.query(
      "INSERT INTO sociality_report_form VALUES (?, ?, ?, ?, 0)", [id_sociality, sociality_location, description, send_status]
    )

    conn.commit()
    return res.send("ส่งคำร้องเรียนเรียบร้อยแล้ว");

  }catch(err){
    conn.rollback();
    return res.send("ไม่สามารถส่งคำร้องเรียนได้");
  }finally{
    console.log("เสร็จ")
    conn.release();
  }
  

})

router.post("/createreport/education", async function(req, res, next) {
  try {
    await educationschema.validateAsync(req.body,  { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err)
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction()

  const type = req.body.reporttype
  const  acc_id = req.body.acc_id
  const  topic = req.body.topic
  const  description = req.body.description
  const  send_status = req.body.send_status
  const  education_subject_id = req.body.education_subject_id;
  
  try{
    const [rows, fields] = await conn.query(
      "SELECT max(report_form_id) 'max', count(report_form_id) 'count' FROM report_form"
    )
      
    let id_education = 0;
    if(rows[0].count == 0){id_education = 1}
    else{id_education = rows[0].max + 1}

    await conn.query(
      "INSERT INTO report_form VALUES (?, CURRENT_TIMESTAMP, ?, ?, ?)", [id_education, topic, type, acc_id]
    )

    await conn.query(
      "INSERT INTO studying_report_form VALUES (?, ?, ?, ?, 0)", [id_education, education_subject_id, description, send_status]
    )

    conn.commit()
    return res.send("ส่งคำร้องเรียนเรียบร้อยแล้ว");

  }catch(err){
    conn.rollback();
    return res.send("ไม่สามารถส่งคำร้องเรียนได้");
  }finally{
    console.log("เสร็จ")
    conn.release();
  }
  

})

router.post("/createreport/scholarship", async function(req, res, next) {
  try {
    await scholarshipschema.validateAsync(req.body,  { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err)
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction()

  const type = req.body.reporttype
  const  acc_id = req.body.acc_id
  const  topic = req.body.topic
  const  description = req.body.description
  const  send_status = req.body.send_status
  const  scholarship_type = req.body.scholarship_type;
  
  try{
    const [rows, fields] = await conn.query(
      "SELECT max(report_form_id) 'max', count(report_form_id) 'count' FROM report_form"
    )

    let id = 0;
    if(rows[0].count == 0){id = 1}
    else{id = rows[0].max + 1}

    await conn.query(
      "INSERT INTO report_form VALUES (?, CURRENT_TIMESTAMP, ?, ?, ?)", [id, topic, type, acc_id]
    )

    await conn.query(
      "INSERT INTO scholarship_report_form VALUES (?, ?, ?, ?, 0)", [id, scholarship_type, description, send_status]
    )

    conn.commit()
    return res.send("ส่งคำร้องเรียนเรียบร้อยแล้ว");

  }catch(err){
    conn.rollback();
    return res.send("ไม่สามารถส่งคำร้องเรียนได้");
  }finally{
    console.log("เสร็จ")
    conn.release();
  }
  

})

router.post("/createreport/register", async function(req, res, next) {
  try {
    await registerschema.validateAsync(req.body,  { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err)
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction()

  const type = req.body.reporttype
  const  acc_id = req.body.acc_id
  const  topic = req.body.topic
  const  description = req.body.description
  const  send_status = req.body.send_status
  const  register_subject = req.body.register_subject;
  
  try{
    const [rows, fields] = await conn.query(
      "SELECT max(report_form_id) 'max', count(report_form_id) 'count' FROM report_form"
    )

    let id = 0;
    if(rows[0].count == 0){id = 1}
    else{id = rows[0].max + 1}

    await conn.query(
      "INSERT INTO report_form VALUES (?, CURRENT_TIMESTAMP, ?, ?, ?)", [id, topic, type, acc_id]
    )

    await conn.query(
      "INSERT INTO register_system_report_form VALUES (?, ?, ?, ?, 0)", [id, register_subject, description, send_status]
    )

    conn.commit()
    return res.send("ส่งคำร้องเรียนเรียบร้อยแล้ว");

  }catch(err){
    conn.rollback();
    return res.send("ไม่สามารถส่งคำร้องเรียนได้");
  }finally{
    console.log("เสร็จ")
    conn.release();
  }
  

})

router.post("/createreport/environment", async function(req, res, next) {
  try {
    await environmentschema.validateAsync(req.body,  { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err)
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction()

  const type = req.body.reporttype
  const  acc_id = req.body.acc_id
  const  topic = req.body.topic
  const  description = req.body.description
  const  send_status = req.body.send_status
  const  environment_location = req.body.environment_location;
  
  try{
    const [rows, fields] = await conn.query(
      "SELECT max(report_form_id) 'max', count(report_form_id) 'count' FROM report_form"
    )

    let id = 0;
    if(rows[0].count == 0){id = 1}
    else{id = rows[0].max + 1}

    await conn.query(
      "INSERT INTO report_form VALUES (?, CURRENT_TIMESTAMP, ?, ?, ?)", [id, topic, type, acc_id]
    )

    await conn.query(
      "INSERT INTO environment_report_form VALUES (?, ?, ?, ?, 0)", [id, environment_location, description, send_status]
    )

    conn.commit()
    return res.send("ส่งคำร้องเรียนเรียบร้อยแล้ว");

  }catch(err){
    conn.rollback();
    return res.send("ไม่สามารถส่งคำร้องเรียนได้");
  }finally{
    console.log("เสร็จ")
    conn.release();
  }
  

})

exports.router = router;