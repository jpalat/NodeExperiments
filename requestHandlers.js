var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var sys = require("sys");

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
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello from Upload! You sent:  "+ request);
  response.end();
}

function imageUpload(response, request){
  console.log("Request handler 'upload' was called.");

  var form= new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files){
     console.log("parsing done");
     fs.renameSync(files.upload.path, "/tmp/test.jpg");
     response.writeHead(200, {"Content-Type": "text/html"});
     response.write("Hello Upload.  Image received<br/>");
     response.write("<img src='/show' />");
     //response.end();
     response.end(sys.inspect({fields: fields, files: files}) );
     });
}

function show(response, request){
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.jpg", "binary", function(error, file){
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
