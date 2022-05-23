const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/accesskey/:key/:id", async function (req, res, next){
    
    const key = req.params.key
    const acc_id = req.params.id

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [accesskey, _] = await conn.query("SELECT acc_id FROM admin WHERE access_key = ?",[key])
        if(accesskey.length != 0 && acc_id == accesskey[0].acc_id){
            res.json({message: "pass", acc_id: accesskey[0].acc_id})
            var d = new Date();
            var n = d.toString();
             console.log('admin login success!', 'Time:', n.substring(16,21))
        }
        else(res.json({message: "not pass"}))
        await conn.commit()
    } catch (error) {
        await conn.rollback();
        return next(error)
    }finally{
        conn.release()
    }
})

exports.router = router;