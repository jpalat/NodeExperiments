var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var sys = require("sys");
var gm = require("gm");


function start(response, request) {
  console.log("Request handler 'start' was called.");
  exec("cat static/form.html", function (error, stdout, sterr) {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(stdout);
      response.end()
});
}

function img(response, request){
  console.log("Request handler 'img' was called.");
  exec("cat static/imagesubmit.html", function (error, stdout, sterr){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(stdout);
    response.end()
    });
}


function formUpload(response, request){
  console.log("Request handler 'upload' was called.");
  var form = new formidable.IncomingForm();
  console.log("about to parse new form");
  form.parse(request, function (error, fields, files){
     response.writeHead(200, {"Content-Type": "text/html"});
     response.write("Hello Form.  Registration received<br/>")
     response.end(sys.inspect({fields: fields, files: files}) );
     console.log(fields.username);
     console.log(fields.password);
    });
}

function imageUpload(response, request){
  console.log("Request handler 'upload' was called.");

  var form= new formidable.IncomingForm();
  var newfname = "/tmp/";
  console.log("about to parse image form");
  form.parse(request, function(error, fields, files){
     console.log("parsing done");
     newfname = newfname + files.upload.name;
     fs.renameSync(files.upload.path, newfname);
     response.writeHead(200, {"Content-Type": "text/html"});
     response.write("Hello Upload.  Image received<br/>");
     response.write("<img src='/show' />");
     //response.end();
     response.end(sys.inspect({fields: fields, files: files}) );

     gm(newfname).thumb(100, 100, "/tmp/t1.jpg", 50, function (err) {

       if (err) console.log('aaw, shucks');
       });
     });
}

function show(response, request){
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/t1.jpg", "binary", function(error, file){
    if (error) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error + "\n");
        response.end();
    } else {
        response.writeHead(200, {"Content-Type": "image/jpg"});
        response.write(file, "binary");
        response.end()
    }
});
}

exports.start = start;
exports.img = img;
exports.formUpload = formUpload;
exports.imageUpload = imageUpload;
exports.show = show;
