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
      currentDir,
    };
    if (isDirectory(currentDir, file)) {
      newObj.isDirectory = true;
      data.push(newObj);
    } else {
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
    const directoryContents = [];

    if (!err) {
      directoryContents = getDirectoryContents(files, currentDir, query);
    }

    res.json(directoryContents);
  });
}

exports.get = (req, res) => {
  let query = req.query.path;

  if (!query) query = "";

  readDir(dir, res, query);
};
