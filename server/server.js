const http = require('http');
const mysql = require('mysql');

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
                let queryUser = `SELECT * FROM user WHERE account LIKE ${data.signUpData.account}`;
                let registeredUser = `INSERT INTO user(account, password, department, role) VALUES ('${data.signUpData.account}', '${data.signUpData.password}', '${data.signUpData.department}', '${data.signUpData.role}')`;
                connection().query(queryUser, (err, result) => {
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
                            connection().query(registeredUser, (err, result) => {
                                if (err) {
                                    console.log('[SELECT ERROR] - ',err.message);
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

        }
    });
}).listen(8080);
