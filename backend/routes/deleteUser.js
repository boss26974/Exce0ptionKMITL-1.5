const express = require("express");
const pool = require("../config");

router = express.Router();

router.delete('/deleteUser/:id', async function (req, res, next){
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [reportid, notuse] = await conn.query("SELECT report_form_id FROM report_form WHERE acc_id = ?" , [req.params.id]);

        const [forum, notuse6] = await conn.query("SELECT forum_id FROM forum WHERE acc_id = ?", [req.params.id]);

        const [report, notuse7] = await conn.query("SELECT report_id FROM report WHERE acc_id = ?", [req.params.id]);

        const [tokens, notuse8] = await conn.query("SELECT acc_id FROM tokens WHERE acc_id = ?", [req.params.id]);

        for (i= 0;  i < reportid.length; i++){
            await conn.query("DELETE FROM sociality_report_form WHERE report_form_id = ?", [reportid[i].report_form_id])
            await conn.query("DELETE FROM studying_report_form WHERE report_form_id = ?", [reportid[i].report_form_id])
            await conn.query("DELETE FROM scholarship_report_form WHERE report_form_id = ?", [reportid[i].report_form_id])
            await conn.query("DELETE FROM register_system_report_form WHERE report_form_id = ?", [reportid[i].report_form_id])
            await conn.query("DELETE FROM environment_report_form WHERE report_form_id = ?", [reportid[i].report_form_id])
            await conn.query("DELETE FROM report_form WHERE report_form_id = ?", [reportid[i].report_form_id])
        }
                
        // forum
        if(forum.length != 0){
            for (i= 0;  i < forum.length; i++){
                await conn.query("DELETE FROM forum WHERE forum_id = ?", [forum[i].forum_id]);
            }
        }
        // report
        if(reportid.length != 0){
            for (i= 0;  i < report.length; i++){
                await conn.query("DELETE FROM report WHERE report_id = ?", [report[i].report_id]);
            }
        }

        // tokens
        if(tokens.length != 0){
            await conn.query("DELETE FROM tokens WHERE acc_id = ?", [req.params.id]);
        }

        // admin
        await conn.query("DELETE FROM admin WHERE acc_id = ?", [req.params.id]);

        // user
        await conn.query("DELETE FROM user WHERE acc_id = ?", [req.params.id])

        // account
        await conn.query("DELETE FROM account WHERE (acc_id = ?)", [req.params.id])

        conn.commit()
        return res.json({message : "DELETE COMPLETED !!!"});
    }catch(err){
        await conn.rollback();
        console.log(err)
    }finally{
        conn.release();
    }
})




exports.router = router;