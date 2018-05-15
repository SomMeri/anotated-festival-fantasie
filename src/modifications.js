const Promise = require('promise');
const fs = require('fs');
const folder = "data";
const concat = require('concat-files');

let addProgramAnnotationToNext = false;
let requestId = null;
function addProgramAnnotationBlock(line) {
  let content = line;

  if (addProgramAnnotationToNext) {
    content = line + '\n<tr>\n    <td class="program_annotation" requestId=' + requestId + '>&nbsp;</td>\n</tr>';
    addProgramAnnotationToNext = false;
  }
  if (line.indexOf('td class="program_typ"') > -1) {
    addProgramAnnotationToNext = true;
  }
  return content;
}

function figureRequestId(line) {
  const index = line.indexOf('sent_request(');
  if (index > -1) {
    requestId = line.substring(index + 13, line.indexOf(', this'));
  }
}

let needsToCloseBlock = false;
function addBlocksAroundDays(line) {
  let content = line;
  const boldIndex = line.indexOf('<b>');
  if (boldIndex > -1) {
    const linie = line.substring(3, line.indexOf(" -"));
    const rest = line.substring(line.indexOf(" -") + 3, line.indexOf("</b>"));
    const datum = rest.substring(rest.indexOf(" ") + 1, rest.length);

    content = needsToCloseBlock ? "</div>" : "";
    content = content + '<div class="day-linie-block" linie="' + linie + '" datum="' + datum + '">\n';
    content = content + line;
    needsToCloseBlock = true;
  }
  return content;
}

function modifyLine(line) {
  figureRequestId(line);
  let result = addProgramAnnotationBlock(line);
  result = addBlocksAroundDays(result);
  return result;
}

function processBody(filename) {
  return new Promise(function (fulfill, reject) {
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(filename)
    });

    let content = "";
    lineReader.on('line', function (line) {
      content = content + modifyLine(line) + "\n"
    });

    lineReader.on('close', e => fulfill(content));
  });
}

function writeFile(outputFile, content) {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }
  var stream = fs.createWriteStream(outputFile);
  stream.write(content);
  stream.end();
}

exports.processBody = function (inputFile, outputFile) {
  return processBody(inputFile)
    .then(content => writeFile(outputFile, content));
};
