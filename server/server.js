const http = require('http');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '123456',
    database: 'examination'
});
connection.connect();

let userGetSql = 'SELECT * FROM user WHERE account LIKE "13613787118"';

connection.query(userGetSql,function (err, result) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }

    console.log('---------------SELECT----------------');
    console.log(result);
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');

});
connection.end();

http.createServer(function (req, res) {
    req.on('data', function (e) {
        let data = JSON.parse(e.toString())
        switch (data.api) {
            case 'S001':
                console.log(data.signUpData)

                break;
        }

        req.on('end', function () {
            let sendData = {
                name: 'lisi'
            }
            res.end(JSON.stringify(sendData));
        });
    });

}).listen(8080);
