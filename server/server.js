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
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            connection();
        } else {
            throw err;
        }
    });
    return config
};

http.createServer((req, res) => {
    req.on('data', (e) => {
        let data = JSON.parse(e.toString());
        switch (data.api) {
            case 'S001':
                let querySignUpAccount = `SELECT * FROM user WHERE account LIKE ${data.signUpData.account}`;
                let signUpAccount = `INSERT INTO user(name, account, password, department, role) VALUES ('${data.signUpData.name}', '${data.signUpData.account}', '${md5(data.signUpData.password)}', '${data.signUpData.department}', '${data.signUpData.role}')`;
                connection().query(querySignUpAccount, (err, result) => {
                    if (err) {
                        console.log('[SELECT ERROR] - ',err.message);
                        return false;
                    } else {
                        if (result.length) {
                            let sendData = {
                                msg: '此用户已注册，请直接登录'
                            };
                            res.end(JSON.stringify(sendData));
                        } else {
                            connection().query(signUpAccount, (err, result) => {
                                if (err) {
                                    console.log('[SELECT ERROR] - ',err.message);
                                    let sendData = {
                                        msg: '注册失败'
                                    };
                                    res.end(JSON.stringify(sendData));
                                    return false;
                                } else {
                                    let sendData = {
                                        msg: '注册成功'
                                    };
                                    res.end(JSON.stringify(sendData));
                                }
                            });

                        }
                    }
                });
                break;
            case 'S002':
                let querySignInAccount = `SELECT * FROM user WHERE account LIKE ${data.signInData.account}`;
                connection().query(querySignInAccount, (err, result) => {
                    if (err) {
                        console.log('[SELECT ERROR] - ',err.message);
                        return false;
                    } else {
                        if (result.length) {
                            if (result[0].password === md5(data.signInData.password)) {
                                let sendData = {
                                    msg: '登录成功'
                                };
                                res.end(JSON.stringify(sendData));
                            } else {
                                let sendData = {
                                    msg: '密码错误'
                                };
                                res.end(JSON.stringify(sendData));
                            }
                        } else {
                            let sendData = {
                                msg: '此用户还没有注册'
                            };
                            res.end(JSON.stringify(sendData));
                        }
                    }
                });
                break

        }
    });
}).listen(8080);
