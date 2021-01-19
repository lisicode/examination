const http = require('http');

http.createServer(function (req, res) {
    req.on('data', function (data) {
        var str = data.toString();
        console.log(JSON.parse(str))

        req.on('end', function () {
            let sendData = {
                name: 'lisi'
            }
            res.end(JSON.stringify(sendData));
        });
    });

}).listen(8080);
