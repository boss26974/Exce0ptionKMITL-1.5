const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try {
    const [rows, fields] = await conn.query('SELECT * FROM account JOIN admin USING (acc_id)');
    return res.json(rows);
  } catch (err) {
    await conn.rollback();
    console.log(err)
  } finally {
    conn.release();
  }
});

exports.router = router;