const http = require('http');
const mysql = require('mysql');
const md5 = require('md5-node');

const connection = () => {
  let config = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '123456',
    database: 'examination'
  });
  config.connect((err) => {
    if (err) {
      setTimeout('connection()', 2000);
    }
  });
  config.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connection();
    } else {
      throw err;
    }
  });
  return config
};

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  req.on('data', (e) => {
    let data = JSON.parse(e.toString());
    switch (data.api) {
      case 'T001':
        let querySignUpAccount = `SELECT * FROM user WHERE account LIKE ${data.signUpData.account}`;
        let signUpAccount = `INSERT INTO user(name, account, password, department) VALUES ('${data.signUpData.name}', '${data.signUpData.account}', '${md5(data.signUpData.password)}', '${data.signUpData.department}')`;
        connection().query(querySignUpAccount, (err, result) => {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return false;
          } else {
            if (result.length) {
              let sendData = {
                status: '0002',
                msg: '此用户已注册，请直接登录'
              };
              res.end(JSON.stringify(sendData));
            } else {
              connection().query(signUpAccount, (err, result) => {
                if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  let sendData = {
                    status: '0001',
                    msg: '注册失败'
                  };
                  res.end(JSON.stringify(sendData));
                  return false;
                } else {
                  let sendData = {
                    status: '0000',
                    msg: '注册成功',
                    userData: {
                      name: data.signUpData.name,
                      account: data.signUpData.account,
                      department: data.signUpData.department
                    }
                  };
                  res.end(JSON.stringify(sendData));
                }
              });
            }
          }
        });
        break;
      case 'T002':
        let querySignInAccount = `SELECT * FROM user WHERE account LIKE ${data.signInData.account}`;
        connection().query(querySignInAccount, (err, result) => {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return false;
          } else {
            if (result.length) {
              if (result[0].password === md5(data.signInData.password)) {
                let sendData = {
                  status: '0000',
                  msg: '登录成功',
                  userData: {
                    name: result[0].name,
                    account: result[0].account,
                    department: result[0].department
                  }
                };
                res.end(JSON.stringify(sendData));
              } else {
                let sendData = {
                  status: '0001',
                  msg: '密码错误'
                };
                res.end(JSON.stringify(sendData));
              }
            } else {
              let sendData = {
                status: '0002',
                msg: '此用户还没有注册'
              };
              res.end(JSON.stringify(sendData));
            }
          }
        });
        break;
      case 'T003':
        let examination = `INSERT INTO question(account, department, title, questions) VALUES ('${data.account}','${data.department}', '${data.title}', '${JSON.stringify(data.examination)}')`;
        connection().query(examination, (err, result) => {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            let sendData = {
              status: '0001',
              msg: '考卷生成失败'
            };
            res.end(JSON.stringify(sendData));
            return false;
          } else {
            let sendData = {
              status: '0000',
              msg: '考卷已生成'
            };
            res.end(JSON.stringify(sendData));
          }
        });
        break;
      case 'T004':
        let queryExaminationPaper = `SELECT * FROM question WHERE account LIKE ${data.account}`;
        connection().query(queryExaminationPaper, (err, result) => {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return false;
          } else {
            let sendData = {
              status: '0000',
              examinationPaperData: result
            };
            res.end(JSON.stringify(sendData));
          }
        });
        break;
      case "T005":
        let editTheAnswer = `UPDATE answer SET answer = '${JSON.stringify(data.answer)}' WHERE id = ${data.id}`;
        connection().query(editTheAnswer, (err, result) => {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return false;
          } else {
            if (result.changedRows) {
              let sendData = {
                status: '0000',
                msg: '发布成功'
              };
              res.end(JSON.stringify(sendData));
            } else {
              let insertAnswer = `INSERT INTO answer(id, answer) VALUES ('${data.id}', '${JSON.stringify(data.answer)}')`;
              connection().query(insertAnswer, (err, result) => {
                if (err) {
                  console.log('[SELECT ERROR] - ', err.message);
                  return false;
                } else {
                  let sendData = {
                    status: '0000',
                    msg: '发布成功'
                  };
                  res.end(JSON.stringify(sendData));
                }
              });
            }
          }
        });
        break
    }
  });
}).listen(8080);
