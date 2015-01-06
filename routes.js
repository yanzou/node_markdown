var fs = require("fs");
var path = require("path");
//TODO....
exports.show = function (req, res) {
    var fileName = req.params.id || "index";
    if (!fileName.match(/\.html$/i)) {
        fileName += ".md";
    }
    var filename = path.resolve(path.join(__dirname, "../md", fileName));
    var render = function (err, md) {
        if (err || !md) {
            res.status(404).send("Error");
            return;
        }
        var html = markdown.toHTML(md);
        res.render("md", {
            title: "Markdown Content",
            content: html
        });
    };
    fs.readFile(filename, { encoding: "utf8" }, render);
};
