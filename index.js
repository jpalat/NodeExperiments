var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/img"] = requestHandlers.img;
handle["/upload"] = requestHandlers.formUpload;
handle["/iupload"] = requestHandlers.imageUpload;
handle["/show"] = requestHandlers.show;
server.start(router.route, handle);
