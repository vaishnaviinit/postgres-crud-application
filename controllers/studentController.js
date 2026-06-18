const pool = require("../config/db");


//create student 
const createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const result = await pool.query(
      `INSERT INTO students(name,email,age)
       VALUES($1,$2,$3)
       RETURNING *`,
      [name, email, age]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  createStudent
};