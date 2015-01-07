var fs = require("fs");
var path = require("path");

var routes = {
  index: function (req, res) {
    res.render('index');
  },

  md: function (req, res) {
    console.log(req.params)
    var mdName = req.params.id || "index",
      fileName;
    if (!mdName.match(/\.md$/i)) {
      mdName += ".md";
    }
    res.status(404).send("Error");
  }
};


exports.route = function(app) {
  app.get('/', routes.index);
  app.get('/:id', routes.md);
  return app;
};

//exports.index = function(req, res){
//  res.render('index');
//};
//
//exports.partials = function (req, res) {
//  var name = req.params.name;
//  res.render('partials/' + name);
//};
//
//
//
////TODO....
//exports.show = function (req, res) {
//    var fileName = req.params.id || "index";
//    if (!fileName.match(/\.html$/i)) {
//        fileName += ".md";
//    }
//    var filename = path.resolve(path.join(__dirname, "../md", fileName));
//    var render = function (err, md) {
//        if (err || !md) {
//            res.status(404).send("Error");
//            return;
//        }
//        var html = markdown.toHTML(md);
//        res.render("md", {
//            title: "Markdown Content",
//            content: html
//        });
//    };
//    fs.readFile(filename, { encoding: "utf8" }, render);
//};