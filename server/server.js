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
            setTimeout('handleConnection()', 2000);
        }
    });
    config.on('error', (err) => {
        // console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('db error执行重连:'+err.message);
            handleConnection();
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
                console.log(data.signUpData.account);

                let userGetSql = `SELECT * FROM user WHERE account LIKE ${data.signUpData.account}`;
                connection().query(userGetSql, (err, result) => {
                    if (err) {
                        console.log('[SELECT ERROR] - ',err.message);
                        return false;
                    } else {
                        if (result.length) {
                            let sendData = {
                                name: 'lisi'
                            };
                            res.end(JSON.stringify(sendData));
                        } else {
                            console.log(2)
                        }
                    }
                });
                break;

        }
    });
}).listen(8080);
