const express = require("express");
const pool = require("../config");

router = express.Router();

router.post('/checkadmin', async function (req, res, next) {
    const id = req.body.id
    const conn = await pool.getConnection()
    try{
        let [rows1, _] = await conn.query("SELECT rule_manage_acc, rule_standand_admin FROM account WHERE acc_id = ?", [id])
        if(rows1.length > 0){
            console.log(rows1)
            res.json({data: rows1})
        }else{
            console.log("empty")
        }
    }catch(err){
        if(err) throw err
    }finally{
        conn.release()
    }
});

exports.router = router;