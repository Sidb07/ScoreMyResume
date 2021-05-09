var express = require("express");
var fs = require("fs");
var app = express();
var pdfUtil = require('pdf-to-text');
var formidable = require('formidable');
var spawn = require('child_process').spawn

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/upload', function (req, res) {
    res.render('upload', {error: ''});
});

app.post('/upload', function (req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, file) {
        var oldpath = file.filetoupload.path;
        var newpath = 'pdffiles/' + file.filetoupload.name;
        fs.rename(oldpath, newpath, function(err) {} );
        if(newpath == 'pdffiles/') {
            console.log('No file Selected');
            res.render('upload', {error: "Please Select a File"});
        } 
        else {
            console.log("File Uploaded")
            pdfUtil.pdfToText(newpath, function(err, data) {
                if (err) console.log(err);
                //console.log(data);
                py = spawn('python', ['process_inp.py', data]);
                py.stdout.on('data', function(result) {
                    //console.log(result.toString());
                    var ret = Number(result.slice(-2));
                    //console.log(ret);
                    var n = Number(result.slice(result.length - ret - 2, result.length - 2));
                    //console.log(n);
                    res.render('rating', {result: n, skills: result.slice(0, result.length - ret - 2)});
                });
            });
        }
    });
    
});

app.listen(8080);
console.log('Server is listening on port 8080');