const http = require('http');

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
