const Promise = require('promise');
const fs = require('fs');
const folder = "data";
const concat = require('concat-files');

function addIdentifier(line, identifier) {
  let content = line;
  const boldIndex = line.indexOf('<b>');
  if (boldIndex > -1) {
    const prefix = line.substring(0, boldIndex+3);
    const suffix = line.substring(boldIndex+3, line.length);
    content = prefix + identifier + " - " + suffix;
  }
  return content;
}

function readFile(filename, identifier) {
  return new Promise(function (fulfill, reject) {
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(filename)
    });
 
    let inBody = false;
    let content = "";
    lineReader.on('line', function (line) {
      if (inBody) {
        if (line.indexOf("/body") === -1) {
          content = content + addIdentifier(line, identifier) + "\n"
        }
      } else {
        if (line.indexOf("body") > -1) {
          inBody = true;
        }
      }
    });
 
    lineReader.on('close', e => fulfill(content));
  });
}
 
function buildBody(folder, outputFile) {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }
  var stream = fs.createWriteStream(outputFile, { flags: 'a' });
 
  var promises = [];
  fs.readdirSync(folder).forEach(file => {
    if (file.indexOf('.htm') > -1 && file.indexOf('~') === -1) {
      console.log(file);
      let identifier = file.substring(0, file.indexOf(' -'));
      let readFilePromise = readFile(folder + '\\' + file, identifier);
 
      promises.push(readFilePromise.then(content => {
        stream.write(content);
      }));
    }
  });
 
  return Promise.all(promises)
    .then(function (data) {
      stream.end();
    });
}
 
function createFinalHtm() {
    concat([
      "output\\header.txt",
      "output\\append.txt",
      "output\\footer.txt",
    ], "output\\result.htm", function (err) {
      if (err) throw err
    });
}

exports.buildBody = buildBody;
exports.createFinalHtm = createFinalHtm;
