const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const compression = require("compression");
const { readFile } = require("fs/promises");
const { appConfig } = require("../public/config");
const { createPassword } = require("./src/utils/utils");
const app = express();
// app.use((req, res, next) => {
//   if (req.url.includes("/find")) {
//     req.url = req.url.replace("/find", "");
//   }
//   if (req.url.includes("/api")) {
//     req.url = req.url.replace("/api", "");
//   }
//   next();
// });
// app.use(express.static("./dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
const pool = mysql.createPool(appConfig.dataBase);
// 响应统一格式化
function responseFormat(code = 200, data = [], msg = "ok") {
  const response = {
    code,
    data,
    msg,
  };
  return response;
}

function maskPhoneNumber(phoneNumber) {
  // 使用正则表达式匹配手机号的中间四位数字
  return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}
// token生成
function generateAccessToken(user, key) {
  return jwt.sign(user, key, {
    expiresIn: "8h",
  });
}

// 返回10位格式时间戳
function getTimeSpan() {
  return String(parseInt(new Date().getTime() / 1000));
}

//
async function readUser() {
  const data = await readFile("./user.json");
  const res = JSON.parse(data);
  return res;
}

// 登录
app.post("/admin/login", async (req, res) => {
  pool.getConnection((err, connection) => {
    const data = req.body;
    let sql = `SELECT * FROM bs_user WHERE user_name = '${data.uname}' AND is_del=0`;
    connection.query(sql, (err, result) => {
      if (!err) {
        //若存在结果则表示登陆成功
        if (result[0]) {
          const user = result[0];
          const salt = user.salt;
          const password = createPassword(data.password.trim() + salt);
          if (user.password !== password) {
            res.send(responseFormat(409, [], "用户名或密码错误"));
            return;
          }
          const key = data.uname + getTimeSpan();
          const token = generateAccessToken({ uname: data.uname }, key);
          sql = `UPDATE bs_user SET token_key = '${key}', token='${token}' WHERE user_name = '${data.uname}'`;
          connection.query(sql, (err, result) => {
            if (!err) {
              const userInfo = {
                token,
                userName: user.user_name,
                name: user.name,
                admin: 0,
                id: user.id,
              };
              res.send(responseFormat(200, userInfo));
            } else {
              res.send(responseFormat(409, [], err.sqlMessage));
            }
          });
        } else {
          res.send(responseFormat(409, [], "用户名不存在"));
        }
      } else {
        res.send(responseFormat(409, [], err.sqlMessage));
      }
    });
  });
});
// token验证
function authenticateToken(req, res, next) {
  const token = req.headers["token"];
  if (!token) {
    return res.send(responseFormat(409, null, "需要登录,才能操作"));
  }
  pool.getConnection((err, connection) => {
    const sql = `select token_key from bs_user WHERE token = '${token}'`;
    connection.query(sql, (err, result) => {
      if (!err && result.length) {
        const key = result[0].token_key;
        jwt.verify(token, key, (err, decoded) => {
          if (!err) {
            const time = getTimeSpan();
            if (time < decoded.exp) {
              next();
            } else {
              return res.send(responseFormat(401, null, "token过期"));
            }
          } else {
            return res.send(responseFormat(401, null, "token过期"));
          }
        });
      } else {
        return res.send(responseFormat(401, null, "token无效"));
      }
    });
  });
}
// 获取菜单
app.get("/getMenus", authenticateToken, async (req, res) => {
  pool.getConnection((err, connection) => {
    const query = req.query;
    let sql = `select b.* from bs_menu_role a left join bs_menu b on a.menu_id = b.menu_id  left join bs_user_role c on a.role_id = c.role_id where c.user_id = ${query.userId}`;
    connection.query(sql, (err, result) => {
      if (!err) {
        //若存在结果则表示登陆成功
        if (result) {
          res.send(responseFormat(200, result));
        }
      } else {
        res.send(responseFormat(409, [], err.sqlMessage));
      }
    });
  });
});

app.listen(9082, () => {
  console.log("9082 is running");
});

// 服务器写法
// app.listen(process.env.PORT,function() {
//   console.log(process.env.PORT ,"is running");
// })