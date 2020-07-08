const fs = require("fs");
const path = require("path");
const dir = process.cwd();

function getDirectoryContents(files, currentDir, query) {
  const data = [];

  files.forEach((file) => {
    const newObj = {
      name: file,
      isDirectory: false,
      path: path.join(query, file),
    };
    if (isDirectory(currentDir, file)) {
      newObj.isDirectory = true;
      data.push(newObj);
    } else {
      newObj.currentDir = currentDir;
      data.push(newObj);
    }
    return data;
  });
}

function isDirectory(currentDir, file) {
  const fileInfo = fs.statSync(path.join(currentDir, file));
  return fileInfo.isDirectory();
}

function readDir(currentDir, res, query) {
  fs.readdir(currentDir, (err, files) => {
    let directoryContents = [];

    if (!err) {
      directoryContents = getDirectoryContents(files, currentDir, query);
    }

    res.json(directoryContents);
  });
}

exports.get = (req, res) => {
  const query = req.query.path || "";
  let currentDir = dir;

  if (query) currentDir = path.join(currentDir, query);

  readDir(currentDir, res, query);
};
