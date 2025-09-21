const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = []; // จำลองฐานข้อมูล (เก็บใน memory)

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  // ตรวจว่ามี email นี้อยู่แล้วหรือยัง
  const exist = users.find((u) => u.email === email);
  if (exist) {
    return res.status(400).json({ message: "Email นี้ถูกใช้แล้ว" });
  }

  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);

  return res.json({ user: newUser });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }

  return res.json({ user });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is running at /api");
});
