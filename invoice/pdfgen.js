/**
 * Created by apple on 18/04/16.
 */
var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('invoice.html', 'utf8');
var options = {
    phantomPath: "./node_modules/phantomjs-prebuilt/bin/phantomjs",
    format: 'A4',
    width: "8in",
    height: "10.5in",
    header: {
        "height": "10mm",
        "contents": '<div></div>'
    },
    footer: {
        "height": "10mm",
        "contents": '<span></span>'
    },
};

pdf.create(html, options).toFile('./invoice.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
});