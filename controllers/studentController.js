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

//read all students
const getStudents = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM students"
    );

    res.status(200).json(result.rows);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


//get student by id
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM students WHERE id = $1",    //safe from SQL injection used "$1" instead of "${id}"
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }
    res.status(200).json(result.rows[0]);
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

//update students 
const updateStudent = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, email, age } = req.body;

    const result = await pool.query(
      `UPDATE students
       SET name = $1,
           email = $2,
           age = $3
       WHERE id = $4
       RETURNING *`,
      [name, email, age, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

//exports
module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent
};