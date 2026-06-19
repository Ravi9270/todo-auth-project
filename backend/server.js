const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "todo_project"
});

db.connect((err) => {
    if (err) {
        console.log("Connection Error:", err);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

// Register API
app.post("/register", (req, res) => {

    const { email, password, name, username, birthday } = req.body;

    const sql =
        "INSERT INTO users (email, password, name, username, birthday) VALUES (?, ?, ?, ?, ?)";

    db.query(
        sql,
        [email, password, name, username, birthday],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("Error");
            } else {
                res.send("User Registered Successfully");
            }

        }
    );

});

// Login API
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql =
        "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            console.log(err);
            res.json({
                success: false
            });
        }
        else if (result.length > 0) {

            res.json({
                success: true,
                userId: result[0].id,
                username: result[0].username
            });

        }
        else {

            res.json({
                success: false
            });

        }

    });

});

// Add Todo
app.post("/addTodo", (req, res) => {

    const { task, userId } = req.body;

    const sql =
    "INSERT INTO todos(task, user_id) VALUES (?, ?)";

    db.query(sql, [task, userId], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            res.send("Todo Added");
        }

    });

});

// Get Todos
app.get("/todos/:userId", (req, res) => {

    const userId = req.params.userId;

    const sql =
    "SELECT * FROM todos WHERE user_id = ?";

    db.query(sql, [userId], (err, result) => {

        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }

    });

});

// Delete Todo
app.delete("/deleteTodo/:id", (req, res) => {

    const id = req.params.id;

    const sql =
    "DELETE FROM todos WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            res.send(err);
        } else {
            res.send("Deleted");
        }

    });

});



app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});