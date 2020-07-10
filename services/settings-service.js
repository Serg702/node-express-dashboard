const fs = require("fs");
const path = require("path");
const settingsFilePath = path.join(
  __dirname.replace("services", ""),
  "json/settings.json"
);

function getSettings() {
  try {
    const settingsData = fs.readFileSync(settingsFilePath);

    return JSON.parse(settingsData);
  } catch (e) {
    console.log(e);
  }
}

function writeSettings(newSettings) {
  const settingsJSON = JSON.stringify(newSettings, null, 2);

  try {
    fs.writeFileSync(settingsFilePath, settingsJSON);
    return true;
  } catch (e) {
    return false;
  }
}

function getDefaultDir() {
  const defaultDir = getSettings().defaultDir;

  if (!defaultDir || !isValidDir(defaultDir)) return process.cwd;

  return defaultDir;
}

function isValidDir(dirPath) {
  try {
    if (fs.readdirSync(dirPath)) return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  getSettings,
  writeSettings,
  getDefaultDir,
  isValidDir,
};
