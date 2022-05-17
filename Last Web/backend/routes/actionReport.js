const express = require("express");
const path = require("path")
const pool = require("../config");

router = express.Router();

router.put("/actionReport/nextStatus/:id", async function (req, res, next){
    try{
        const [sociality, notuse1] = await pool.query("SELECT report_form_id,status FROM sociality_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [studying, notuse2] = await pool.query("SELECT report_form_id,status FROM studying_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [scholarship, notuse3] = await pool.query("SELECT report_form_id,status FROM scholarship_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [register, notuse4] = await pool.query("SELECT report_form_id,status FROM register_system_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [environment, notuse5] = await pool.query("SELECT report_form_id,status FROM environment_report_form WHERE report_form_id = ?" , [req.params.id]);
        if(sociality.length != 0){
            if(sociality[0].status == 4){
                await pool.query("UPDATE sociality_report_form SET status = 0 WHERE report_form_id = ?", [req.params.id])
                res.send('update report_id: '+ sociality[0].report_form_id +'success!')
            }
            else{
                await pool.query("UPDATE sociality_report_form SET status = ? WHERE report_form_id = ?", [sociality[0].status+1, req.params.id])
                res.send('update report_id: '+ sociality[0].report_form_id +'success!')
            }
        }
        if(studying.length != 0){
            if(studying[0].status  == 4){
                await pool.query("UPDATE studying_report_form SET status = 0 WHERE report_form_id = ?", [req.params.id])
                res.send('update report_id: '+ studying[0].report_form_id +'success!')
            }
            else{
                await pool.query("UPDATE studying_report_form SET status = ? WHERE report_form_id = ?", [studying[0].status+1, req.params.id])
                res.send('update report_id: '+ studying[0].report_form_id +'success!')
            }
        }
        if(scholarship.length != 0){
            if(scholarship[0].status  == 4){
                await pool.query("UPDATE scholarship_report_form SET status = 0 WHERE report_form_id = ?", [req.params.id])
                res.send('update report_id: '+ scholarship[0].report_form_id +'success!')
            }
            else{
                await pool.query("UPDATE scholarship_report_form SET status = ? WHERE report_form_id = ?", [scholarship[0].status+1, req.params.id])
                res.send('update report_id: '+ scholarship[0].report_form_id +'success!')
            }
        }
        if(register.length != 0){
            if(register[0].status  == 4){
                await pool.query("UPDATE register_system_report_form SET status = 0 WHERE report_form_id = ?", [req.params.id])
                res.send('update report_id: '+ register[0].report_form_id +'success!')
            }
            else{
                await pool.query("UPDATE register_system_report_form SET status = ? WHERE report_form_id = ?", [register[0].status+1, req.params.id])
                res.send('update report_id: '+ register[0].report_form_id +'success!')
            }
        }
        if(environment.length != 0){
            if(environment[0].status  == 4){
                await pool.query("UPDATE environment_report_form SET status = 0 WHERE report_form_id = ?", [req.params.id])
                res.send('update report_id: '+ environment[0].report_form_id +'success!')
            }
            else{
                await pool.query("UPDATE environment_report_form SET status = ? WHERE report_form_id = ?", [environment[0].status+1, req.params.id])
                res.send('update report_id: '+ environment[0].report_form_id +'success!')
            }
        }
    }catch (error) {
        return next(error)
    }
})

router.put("/actionReport/NotpassStatus/:id", async function (req, res, next){
    try {
        const [sociality, notuse1] = await pool.query("SELECT report_form_id,status FROM sociality_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [studying, notuse2] = await pool.query("SELECT report_form_id,status FROM studying_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [scholarship, notuse3] = await pool.query("SELECT report_form_id,status FROM scholarship_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [register, notuse4] = await pool.query("SELECT report_form_id,status FROM register_system_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [environment, notuse5] = await pool.query("SELECT report_form_id,status FROM environment_report_form WHERE report_form_id = ?" , [req.params.id]);
        if(sociality.length != 0){
            await pool.query("UPDATE sociality_report_form SET status = 4 WHERE report_form_id = ?", [req.params.id])
            res.send('update report id: '+ sociality[0].report_form_id +'success!')
        }
        if(studying.length != 0){
            await pool.query("UPDATE studying_report_form SET status = 4 WHERE report_form_id = ?", [req.params.id])
            res.send('update report id: '+ studying[0].report_form_id +'success!')
        }
        if(scholarship.length != 0){
            await pool.query("UPDATE scholarship_report_form SET status = 4 WHERE report_form_id = ?", [req.params.id])
            res.send('update report id: '+ scholarship[0].report_form_id +'success!')
        }
        if(register.length != 0){
            await pool.query("UPDATE register_system_report_form SET status = 4 WHERE report_form_id = ?", [req.params.id])
            res.send('update report id: '+ register[0].report_form_id +'success!')
        }
        if(environment.length != 0){
            await pool.query("UPDATE environment_report_form SET status = 4 WHERE report_form_id = ?", [req.params.id])
            res.send('update report id: '+ environment[0].report_form_id +'success!')
        }
        console.log('update report id: '+ req.params.id + ' success')
    } catch (error) {
        return next(error)
    }
})

router.delete("/actionReport/delete/:id", async function (req, res, next){
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [sociality, notuse1] = await conn.query("SELECT report_form_id FROM sociality_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [studying, notuse2] = await conn.query("SELECT report_form_id FROM studying_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [scholarship, notuse3] = await conn.query("SELECT report_form_id FROM scholarship_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [register, notuse4] = await conn.query("SELECT report_form_id FROM register_system_report_form WHERE report_form_id = ?" , [req.params.id]);
        const [environment, notuse5] = await conn.query("SELECT report_form_id FROM environment_report_form WHERE report_form_id = ?" , [req.params.id]);
       
        if(sociality.length != 0){
            await conn.query("DELETE FROM sociality_report_form WHERE report_form_id = ?", [req.params.id])
            await conn.query("DELETE FROM report_form WHERE report_form_id = ?", [req.params.id])
            res.json({message :'delete report id: '+ sociality[0].report_form_id +' success!'})
            await conn.commit()
        }
        if(studying.length != 0){
            await conn.query("DELETE FROM studying_report_form WHERE report_form_id = ?", [req.params.id])
            await conn.query("DELETE FROM report_form WHERE report_form_id = ?", [req.params.id])
            res.json({message :'delete report id: '+ studying[0].report_form_id +' success!'})
            await conn.commit()
        }
        if(scholarship.length != 0){
            await conn.query("DELETE FROM scholarship_report_form WHERE report_form_id = ?", [req.params.id])
            await conn.query("DELETE FROM report_form WHERE report_form_id = ?", [req.params.id])
            res.json({message :'delete report id: '+ scholarship[0].report_form_id +' success!'})
            await conn.commit()
        }
        if(register.length != 0){
            await conn.query("DELETE FROM register_system_report_form WHERE report_form_id = ?", [req.params.id])
            await conn.query("DELETE FROM report_form WHERE report_form_id = ?", [req.params.id])
            res.json({message :'delete report id: '+ register[0].report_form_id +' success!'})
            await conn.commit()
        }
        if(environment.length != 0){
            await conn.query("DELETE FROM environment_report_form WHERE report_form_id = ?", [req.params.id])
            await conn.query("DELETE FROM report_form WHERE report_form_id = ?", [req.params.id])
            res.json({message :'delete report id: '+ environment[0].report_form_id +' success!'})
            await conn.commit()
        }
        console.log('delete report id: '+ req.params.id +' success' )
    } catch (error) {
        await conn.rollback();
        return next(error)
    }finally{
        conn.release()
    }
})

exports.router = router;