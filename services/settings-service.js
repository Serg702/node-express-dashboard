const fs = require("fs");
const path = require("path");
const settingsFilePath = path.join(__dirname, "json/settings.json");

function getSettings() {
  const settingsData = fs.readFileSync(settingsFilePath);

  return JSON.parse(settingsData);
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

function getDefaultDir() {}

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
